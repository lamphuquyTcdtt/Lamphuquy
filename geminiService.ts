
import { GoogleGenAI, Modality, Type, Chat } from '@google/genai';
import { DetectedItem } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Vision Engine v6.0 Constants
const ENGINE_V6_PROMPT_SUFFIX = " Render in 8K Ultra-HD resolution. Enhance fabric textures to be hyper-realistic. Apply soft studio lighting or natural 'Tokyo sunlight'. Clean Mode: remove image noise and artifacts. FACE STABILIZATION: Preserve the original facial features, expression, and identity with 100% accuracy.";

export function startChatSession(): Chat {
  const chat = ai.chats.create({
    model: 'gemini-2.5-pro',
    config: {
        systemInstruction: "You are 'Airi', a friendly and helpful AI assistant from Japan, specializing in image generation and Japanese OL fashion. Your goal is to help users create beautiful, artistic, and effective prompts. When a user gives you an idea, expand it into a rich, descriptive prompt suitable for AI image models. If a user asks for a style, provide a prompt in that style. You can also translate prompts to Japanese or Vietnamese if the user asks. Always format the final, usable prompt inside triple backticks (```). You can also chat normally to help them brainstorm. Communicate with a gentle, encouraging, and slightly formal tone, similar to a helpful anime character.",
    }
  });
  return chat;
}

export async function sendMessageToChat(chat: Chat, message: string): Promise<string> {
    const response = await chat.sendMessage({ message });
    return response.text;
}


export async function analyzeImageAndGeneratePrompt(
  base64ImageData: string,
  mimeType: string
): Promise<{ analysis: string; prompt: string; japanesePrompt: string; detectedStyle: string; }> {
  try {
    const analysisPrompt = `Thoroughly describe this image in Vietnamese. Crucially, identify and start your response with the primary style of the image from one of these Japanese-inspired categories: [Anime], [Cosplay Photography], [Idol Photography], [Japanese OL Fashion], [Realistic Tokyo Style], [Japanese Street Fashion], [Kimono Style]. If it doesn't fit, use [General Photography]. Then, continue with the detailed description covering the main subject, background, lighting, color palette, mood, and composition.`;
    
    const analysisResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: {
        parts: [
          { inlineData: { data: base64ImageData, mimeType: mimeType } },
          { text: analysisPrompt }
        ]
      },
    });
    
    const analysisText = analysisResponse.text;
    if (!analysisText) {
      throw new Error("AI failed to analyze the image.");
    }

    let detectedStyle = 'Unknown';
    const styleMatch = analysisText.match(/^\[(.*?)\]/);
    if (styleMatch) {
      detectedStyle = styleMatch[1];
    }
    const analysis = analysisText.replace(/^\[.*?\]\s*/, '');

    const promptGenerationResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Based on the following image description (style: ${detectedStyle}), create a detailed, professional, and artistic prompt in English, suitable for AI image generation tools like Midjourney or Stable Diffusion. The prompt should be a single block of comma-separated keywords and phrases, strongly reflecting the identified '${detectedStyle}' style. Enhance the description with artistic details, camera settings (like lens type, aperture), lighting techniques (like volumetric lighting, rim lighting), and stylistic keywords. \n\nDescription: "${analysis}"`
    });
    const prompt = promptGenerationResponse.text;

     if (!prompt) {
      throw new Error("AI failed to generate a prompt.");
    }
    
    const translationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Translate the following English AI image generation prompt into Japanese. Keep technical terms and keywords in English if there is no direct, common translation. Just provide the translated text, without any introductory phrases. \n\nEnglish Prompt: "${prompt}"`
    });
    const japanesePrompt = translationResponse.text;


    return { analysis, prompt, japanesePrompt, detectedStyle };
  } catch (error) {
    console.error("Error in analyzeImageAndGeneratePrompt:", error);
    throw new Error("Failed to analyze image and generate prompt. Please check the console for more details.");
  }
}

export async function generateImageFromPrompt(
  prompt: string,
  numberOfImages: number,
  aspectRatio: string
): Promise<string[]> {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt + ENGINE_V6_PROMPT_SUFFIX,
      config: {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map(img => img.image.imageBytes);
    } else {
      throw new Error("AI model did not return any images.");
    }
  } catch (error) {
    console.error("Error calling Gemini API for image generation:", error);
    throw new Error("Failed to generate image with AI. Please check the console for more details.");
  }
}

export async function recognizeClothing(base64ImageData: string, mimeType: string): Promise<DetectedItem[] | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze the image and identify the main clothing items and accessories worn by the person. Pay close attention to accessories like watches, bracelets, and rings, categorizing them as 'Accessory'. Respond with only a JSON array where each object has a 'category' and a 'description'. Valid categories are: 'Top', 'Bottom', 'Shoes', 'Accessory', 'Outerwear', 'Full Body'. Be specific in the description. Example: [{'category': 'Accessory', 'description': 'silver watch'}]",
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: "The category of the clothing item. Valid values: 'Top', 'Bottom', 'Shoes', 'Accessory' (e.g., watch, bracelet, ring), 'Outerwear', 'Full Body'."
              },
              description: {
                type: Type.STRING,
                description: 'A brief description of the clothing item, e.g., "blue t-shirt".'
              }
            }
          }
        }
      }
    });

    const jsonString = response.text.trim();
     if (!jsonString) {
        return null;
    }
    const detectedItems = JSON.parse(jsonString);
    return detectedItems;

  } catch (error) {
    console.error("Error calling Gemini API for clothing recognition:", error);
    return null;
  }
}

export async function extractClothingItem(base64ImageData: string, mimeType: string, clothingType: string): Promise<string | null> {
  try {
    const prompt = `From the person in the image, accurately isolate their ${clothingType}. The output should be only the ${clothingType} with a plain white background. Do not include any body parts or other clothing. The item should be centered in the output image. Ensure high resolution extraction.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      if (textPart && textPart.text) {
          throw new Error(`AI model responded with text: "${textPart.text}" instead of an image.`);
      }
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API for clothing extraction:", error);
    throw new Error("Failed to extract clothing item with AI. Please check the console for more details.");
  }
}

export async function editImageWithPrompt(base64ImageData: string, mimeType: string, prompt: string, extraImageBase64?: string): Promise<string | null> {
  try {
    const parts: ({ text: string } | { inlineData: { data: string; mimeType: string; } })[] = [
      {
        inlineData: {
          data: base64ImageData,
          mimeType: mimeType,
        },
      },
    ];

    if (extraImageBase64) {
      parts.push({
        inlineData: {
          data: extraImageBase64,
          mimeType: 'image/png', // Assume extracted items are PNGs with transparency
        },
      });
    }

    // Vision Engine v6.0 optimization for face stability and quality
    const enhancedPrompt = `${prompt} ${ENGINE_V6_PROMPT_SUFFIX}`;

    parts.push({ text: enhancedPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      if (textPart && textPart.text) {
          throw new Error(`AI model responded with text: "${textPart.text}" instead of an image.`);
      }
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image with AI. Please check the console for more details.");
  }
}

export async function generateModelImage(
  modelImg: { data: string, mimeType: string },
  clothingImg: { data: string, mimeType: string },
  backgroundImg: { data: string, mimeType: string },
  prompt: string,
  aspectRatio: string
): Promise<string | null> {
    try {
        const fullPrompt = `Create a photorealistic, high-resolution 8K image with a ${aspectRatio} aspect ratio. 
        The person in the final image must look exactly like the person in the first input image (the model reference), preserving facial identity 100%. 
        This person must be wearing the exact clothing from the second input image (the clothing reference), preserving all details, patterns, and colors. 
        The background of the final image must be the one from the third input image (the background reference). 
        The scene should also follow these instructions: ${prompt}. ${ENGINE_V6_PROMPT_SUFFIX}`;

        const parts = [
            { inlineData: { data: modelImg.data, mimeType: modelImg.mimeType } },
            { inlineData: { data: clothingImg.data, mimeType: clothingImg.mimeType } },
            { inlineData: { data: backgroundImg.data, mimeType: backgroundImg.mimeType } },
            { text: fullPrompt },
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));
        if (imagePart && imagePart.inlineData) {
            return imagePart.inlineData.data;
        } else {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            if (textPart && textPart.text) {
                throw new Error(`AI model responded with text: "${textPart.text}" instead of an image.`);
            }
            return null;
        }
    } catch (error) {
        console.error("Error calling Gemini API for model generation:", error);
        throw new Error("Failed to generate model image with AI. Please check the console for more details.");
    }
}

export async function generateDifferentPerspectiveImage(
    clothingImg: { data: string, mimeType: string },
    prompt: string,
    aspectRatio: string,
    count: number
): Promise<string[]> {
    try {
        const fullPrompt = `Create ${count} photorealistic, high-resolution 4K image(s) with a ${aspectRatio} aspect ratio. The image(s) must feature the exact clothing item from the reference image, preserving all details, patterns, and colors. The clothing should be presented according to these instructions: ${prompt}. For example: 'worn by a model from a back angle', 'folded neatly on a wooden table', or 'hanging on a rack in a boutique'.`;
        
        const generationPromises = Array(count).fill(0).map(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        { inlineData: { data: clothingImg.data, mimeType: clothingImg.mimeType } },
                        { text: fullPrompt },
                    ]
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
            const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));
            if (imagePart && imagePart.inlineData) {
                return imagePart.inlineData.data;
            }
            return null;
        });

        const results = await Promise.all(generationPromises);
        const validResults = results.filter((r): r is string => r !== null);

        if (validResults.length === 0) {
           throw new Error("AI model did not return any images.");
        }
        
        return validResults;
    } catch (error) {
        console.error("Error calling Gemini API for perspective generation:", error);
        throw new Error("Failed to generate new perspectives with AI. Please check the console for more details.");
    }
}


export async function removeBackground(base64ImageData: string, mimeType: string): Promise<string | null> {
  try {
    const prompt = "Vision Engine v6.0 Clean Mode: Isolate the main subject of the image precisely and make the background transparent. Handle hair strands and fine details with high precision. The output should be a PNG with a transparent background.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      if (textPart && textPart.text) {
          throw new Error(`AI model responded with text: "${textPart.text}" instead of an image.`);
      }
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API for background removal:", error);
    throw new Error("Failed to remove background with AI. Please check the console for more details.");
  }
}

export async function swapFaces(
  baseImage: { data: string; mimeType: string },
  faceImage: { data: string; mimeType: string }
): Promise<string | null> {
  try {
    const prompt = "Vision Engine v6.0 Face Swap: Using the second image as a face reference, replace the face of the person in the first image with the face from the reference image. The final image should maintain the pose, lighting, and overall style of the first image, but with the new face seamlessly integrated. Ensure a realistic, high-quality, 8K result with perfect skin texture match.";

    const parts = [
      { inlineData: { data: baseImage.data, mimeType: baseImage.mimeType } },
      { inlineData: { data: faceImage.data, mimeType: faceImage.mimeType } },
      { text: prompt },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
      if (textPart && textPart.text) {
          throw new Error(`AI model responded with text: "${textPart.text}" instead of an image.`);
      }
      return null;
    }
  } catch (error) {
    console.error("Error calling Gemini API for face swap:", error);
    throw new Error("Failed to swap faces with AI. Please check the console for more details.");
  }
}

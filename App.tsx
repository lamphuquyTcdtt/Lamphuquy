
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageViewer from './components/ImageViewer';
import ControlPanel from './components/ControlPanel';
import { editImageWithPrompt, recognizeClothing, removeBackground, generateModelImage, generateDifferentPerspectiveImage, extractClothingItem, generateImageFromPrompt, swapFaces } from './services/geminiService';
import { AdjustmentSettings, FashionItem, Filter, DetectedItem, HairStyle, MakeupLook, StyleLook, BackgroundTheme, BodyShapeStyle, HistoryEntry, FaceRetouchSettings, JapaneseTextStyle, AppliedFashionItem, Color } from './types';
import { fileToBase64 } from './utils/imageUtils';
import { useTranslation } from './hooks/useTranslation';
import Footer from './components/Footer';


const App: React.FC = () => {
  const { t } = useTranslation();

  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [displayedImages, setDisplayedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false);
  const hoverRequestRef = useRef<number>(0);

  const [appliedFashionItems, setAppliedFashionItems] = useState<AppliedFashionItem[]>([]);
  const [customFashionItems, setCustomFashionItems] = useState<FashionItem[]>([]);
  const [appliedHairStyle, setAppliedHairStyle] = useState<HairStyle | null>(null);
  const [appliedMakeupLook, setAppliedMakeupLook] = useState<MakeupLook | null>(null);
  const [appliedStyle, setAppliedStyle] = useState<StyleLook | null>(null);
  const [appliedBodyShapeStyle, setAppliedBodyShapeStyle] = useState<BodyShapeStyle | null>(null);
  const [appliedBackground, setAppliedBackground] = useState<BackgroundTheme | null>(null);
  const [appliedFaceRetouch, setAppliedFaceRetouch] = useState<FaceRetouchSettings | null>(null);
  const [appliedJapaneseTextStyle, setAppliedJapaneseTextStyle] = useState<JapaneseTextStyle | null>(null);
  const [appliedFaceSwapImage, setAppliedFaceSwapImage] = useState<string | null>(null);

  const [detectedClothing, setDetectedClothing] = useState<DetectedItem[] | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  
  useEffect(() => {
    // Sakura effect
    const container = document.body;
    const existingPetals = container.querySelectorAll('.sakura-petal');
    if (existingPetals.length > 0) return; // Only add petals once

    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDelay = `${Math.random() * 15}s`;
        petal.style.animationDuration = `${10 + Math.random() * 10}s`;
        container.appendChild(petal);
    }
  }, []);

  const addHistoryEntry = useCallback((images: string[], updates: Partial<HistoryEntry>) => {
    const newEntry: HistoryEntry = {
      images,
      fashionItems: updates.fashionItems !== undefined ? updates.fashionItems : appliedFashionItems,
      hairStyle: updates.hairStyle !== undefined ? updates.hairStyle : appliedHairStyle,
      makeupLook: updates.makeupLook !== undefined ? updates.makeupLook : appliedMakeupLook,
      styleLook: updates.styleLook !== undefined ? updates.styleLook : appliedStyle,
      bodyShapeStyle: updates.bodyShapeStyle !== undefined ? updates.bodyShapeStyle : appliedBodyShapeStyle,
      backgroundTheme: updates.backgroundTheme !== undefined ? updates.backgroundTheme : appliedBackground,
      faceRetouchSettings: updates.faceRetouchSettings !== undefined ? updates.faceRetouchSettings : appliedFaceRetouch,
      japaneseTextStyle: updates.japaneseTextStyle !== undefined ? updates.japaneseTextStyle : appliedJapaneseTextStyle,
      appliedFaceSwapImage: updates.appliedFaceSwapImage !== undefined ? updates.appliedFaceSwapImage : appliedFaceSwapImage,
    };
    const newHistory = [...history.slice(0, historyIndex + 1), newEntry];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, appliedFashionItems, appliedHairStyle, appliedMakeupLook, appliedStyle, appliedBodyShapeStyle, appliedBackground, appliedFaceRetouch, appliedJapaneseTextStyle, appliedFaceSwapImage]);
  
  const resetAllStyles = () => {
    setAppliedFashionItems([]);
    setAppliedHairStyle(null);
    setAppliedMakeupLook(null);
    setAppliedStyle(null);
    setAppliedBodyShapeStyle(null);
    setAppliedBackground(null);
    setAppliedFaceRetouch(null);
    setAppliedJapaneseTextStyle(null);
    setAppliedFaceSwapImage(null);
  };
  
  const handleEdit = useCallback(async (prompt: string, message: string, stateUpdatesForHistory: Partial<HistoryEntry> = {}, extraImageBase64?: string, imageToEdit?: File) => {
    const sourceImage = imageToEdit || originalImage;
    if (!sourceImage) {
      setError(t('errorUploadFirst'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingMessage(message);

    try {
      const base64Image = await fileToBase64(sourceImage);
      const mimeType = sourceImage.type;
      
      const editedImageBase64 = await editImageWithPrompt(base64Image, mimeType, prompt, extraImageBase64);

      if (editedImageBase64) {
        const newImageSrc = `data:image/png;base64,${editedImageBase64}`;
        setDisplayedImages([newImageSrc]);
        addHistoryEntry([newImageSrc], stateUpdatesForHistory);
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [originalImage, addHistoryEntry, t]);

  const handleImageUpload = async (file: File) => {
    setOriginalImage(file);
    const imageUrl = URL.createObjectURL(file);
    setDisplayedImages([imageUrl]);
    resetAllStyles();
    setDetectedClothing(null);
    setError(null);
    
    const initialHistoryEntry: HistoryEntry = {
      images: [imageUrl],
      fashionItems: [],
      hairStyle: null,
      makeupLook: null,
      styleLook: null,
      bodyShapeStyle: null,
      backgroundTheme: null,
      faceRetouchSettings: null,
      japaneseTextStyle: null,
      appliedFaceSwapImage: null,
    };
    setHistory([initialHistoryEntry]);
    setHistoryIndex(0);

    // Run clothing detection
    setIsDetecting(true);
    try {
      const base64Image = await fileToBase64(file);
      const mimeType = file.type;
      const items = await recognizeClothing(base64Image, mimeType);
      setDetectedClothing(items);
    } catch (err) {
      console.error("Clothing detection failed", err);
    } finally {
      setIsDetecting(false);
    }
  };

  const applyFilter = (filter: Filter) => {
    handleFilterHoverEnd(); // Ensure preview is cleared when a filter is clicked
    resetAllStyles();
    const stateUpdates: Partial<HistoryEntry> = { fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(filter.prompt, t('loadingApplyingFilter', { filterName: t(filter.key) }), stateUpdates);
  };

  const handleFashionItemSelect = (item: FashionItem, color: Color) => {
    let extraImage: string | undefined = undefined;
    let finalPrompt: string;
    let newAppliedItems: AppliedFashionItem[];

    if (item.isCustom) {
      newAppliedItems = [{ item, color: { name: '', hex: ''} }];
      finalPrompt = item.prompt;
      extraImage = item.imageUrl.split(',')[1];
    } else {
      const currentApplied = appliedFashionItems.filter(i => !i.item.isCustom);
      const itemIndex = currentApplied.findIndex(applied => applied.item.id === item.id);
      
      if (itemIndex > -1) {
        newAppliedItems = [...currentApplied];
        newAppliedItems[itemIndex] = { item, color };
      } else {
        newAppliedItems = [...currentApplied, { item, color }];
      }
      
      finalPrompt = "Apply the following changes to the person in the image: " + newAppliedItems.map(applied => applied.item.prompt.replace('{{color}}', applied.color.name)).join('. Also, ') + '.';
    }
    
    setAppliedFashionItems(newAppliedItems);
    
    const stateUpdates: Partial<HistoryEntry> = { fashionItems: newAppliedItems, hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    
    const itemName = item.isCustom ? t('customItem') : t(item.key);
    const message = newAppliedItems.length > 1 
      ? t('loadingApplyingMultipleItems', { count: newAppliedItems.length.toString() }) 
      : color.name && !item.isCustom
        ? t('loadingApplyingItemWithColor', { itemName, colorName: color.name })
        : t('loadingApplyingItem', { itemName });
    
    handleEdit(finalPrompt, message, stateUpdates, extraImage);
  };
  
  const applyAdjustments = (settings: AdjustmentSettings) => {
    resetAllStyles();
    const promptParts: string[] = [];
    if (settings.brightness !== 100) promptParts.push(`adjust brightness to ${settings.brightness}%`);
    if (settings.contrast !== 100) promptParts.push(`adjust contrast to ${settings.contrast}%`);
    if (settings.saturation !== 100) promptParts.push(`adjust saturation to ${settings.saturation}%`);
    if (settings.sharpness > 0) promptParts.push(`increase image sharpness by ${settings.sharpness}%`);

    if (promptParts.length === 0) return;

    const stateUpdates: Partial<HistoryEntry> = { fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    const prompt = `Perform the following image adjustments: ${promptParts.join(', ')}.`;
    handleEdit(prompt, t('loadingApplyingAdjustments'), stateUpdates);
  };
  
  const handleHairStyleSelect = (style: HairStyle) => {
    resetAllStyles();
    setAppliedHairStyle(style);
    const stateUpdates: Partial<HistoryEntry> = { hairStyle: style, fashionItems: [], makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(style.prompt, t('loadingApplyingHairstyle', { styleName: t(style.key) }), stateUpdates);
  };

  const handleMakeupLookSelect = (look: MakeupLook) => {
    resetAllStyles();
    setAppliedMakeupLook(look);
    const stateUpdates: Partial<HistoryEntry> = { makeupLook: look, fashionItems: [], hairStyle: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(look.prompt, t('loadingApplyingMakeup', { lookName: t(look.key) }), stateUpdates);
  };
  
  const handleApplyFaceRetouch = (settings: FaceRetouchSettings) => {
    const promptParts: string[] = [];
    if (settings.smoothSkin) promptParts.push("apply digital skin smoothing for a clear complexion, removing blemishes");
    if (settings.whitenTeeth) promptParts.push("subtly whiten their teeth");
    if (settings.enhanceEyes) promptParts.push("enhance their eyes to make them brighter and more defined");

    if (promptParts.length === 0) return;

    resetAllStyles();
    setAppliedFaceRetouch(settings);

    const stateUpdates: Partial<HistoryEntry> = { faceRetouchSettings: settings, fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    const prompt = `Perform the following face retouching on the person in the image: ${promptParts.join(', ')}. Keep the changes natural and realistic.`;
    handleEdit(prompt, t('loadingApplyingFaceRetouch'), stateUpdates);
  };

  const handleApplyFaceSwap = async (faceFile: File) => {
    if (!originalImage) {
      setError(t('errorUploadFirst'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingApplyingFaceSwap'));
    resetAllStyles();

    try {
      const [baseImageData, faceImageData] = await Promise.all([
        fileToBase64(originalImage).then(data => ({ data, mimeType: originalImage.type })),
        fileToBase64(faceFile).then(data => ({ data, mimeType: faceFile.type })),
      ]);

      const editedImageBase64 = await swapFaces(baseImageData, faceImageData);

      if (editedImageBase64) {
        const newImageSrc = `data:image/png;base64,${editedImageBase64}`;
        const faceImageSrc = `data:${faceFile.type};base64,${faceImageData.data}`;
        setDisplayedImages([newImageSrc]);
        setAppliedFaceSwapImage(faceImageSrc);
        addHistoryEntry([newImageSrc], { appliedFaceSwapImage: faceImageSrc });
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleStyleSelect = (style: StyleLook) => {
    resetAllStyles();
    setAppliedStyle(style);
    const stateUpdates: Partial<HistoryEntry> = { styleLook: style, fashionItems: [], hairStyle: null, makeupLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(style.prompt, t('loadingApplyingStyle', { styleName: t(style.key) }), stateUpdates);
  };
  
  const handleBodyShapeStyleSelect = (style: BodyShapeStyle) => {
    resetAllStyles();
    setAppliedBodyShapeStyle(style);
    const stateUpdates: Partial<HistoryEntry> = { bodyShapeStyle: style, fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(style.prompt, t('loadingApplyingStyle', { styleName: t(style.key) }), stateUpdates);
  };

  const handleBackgroundSelect = (theme: BackgroundTheme) => {
    resetAllStyles();
    setAppliedBackground(theme);
    const stateUpdates: Partial<HistoryEntry> = { backgroundTheme: theme, fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null };
    handleEdit(theme.prompt, t('loadingChangingBackground', { themeName: t(theme.key) }), stateUpdates);
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) {
      setError(t('errorUploadFirst'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingRemovingBackground'));
    resetAllStyles();

    try {
      const base64Image = await fileToBase64(originalImage);
      const mimeType = originalImage.type;
      
      const editedImageBase64 = await removeBackground(base64Image, mimeType);

      if (editedImageBase64) {
        const newImageSrc = `data:image/png;base64,${editedImageBase64}`;
        setDisplayedImages([newImageSrc]);
        addHistoryEntry([newImageSrc], { fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null });
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleJapaneseTextStyleSelect = (style: JapaneseTextStyle) => {
    resetAllStyles();
    setAppliedJapaneseTextStyle(style);
    const stateUpdates: Partial<HistoryEntry> = { japaneseTextStyle: style, fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, appliedFaceSwapImage: null };
    handleEdit(style.prompt, t('loadingApplyingTextStyle', { styleName: t(style.key) }), stateUpdates);
  };

  const handleExtractClothing = async (image: File, selection: { x: number; y: number; width: number; height: number; }) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingExtractingRegion'));

    try {
        const img = new Image();
        img.src = URL.createObjectURL(image);
        await new Promise(resolve => { img.onload = resolve });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not get canvas context");
        
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = '#00FF00'; // A bright, unambiguous color
        ctx.lineWidth = Math.max(5, img.naturalWidth * 0.01); // Make line width responsive
        ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);

        const annotatedImageBase64 = canvas.toDataURL('image/png').split(',')[1];
        const annotatedMimeType = 'image/png';
        const prompt = `From the image provided, accurately isolate the specific clothing detail located inside the bright green bounding box. The output should be only the selected detail with a transparent background. Do not include any body parts, other clothing, or the bounding box itself in the final image. The item should be centered.`;

        const extractedImageBase64 = await editImageWithPrompt(annotatedImageBase64, annotatedMimeType, prompt);

        if (extractedImageBase64) {
            const newItem: FashionItem = {
                id: Date.now(),
                key: `customItem`,
                type: 'Accessory', // It's a generic extracted piece now
                imageUrl: `data:image/png;base64,${extractedImageBase64}`,
                prompt: `Incorporate the provided clothing item into the person's outfit naturally, replacing any overlapping clothing.`,
                isCustom: true,
            };
            setCustomFashionItems(prev => [...prev, newItem]);
        } else {
            throw new Error("Failed to extract item, no image was returned.");
        }
    } catch(err) {
        console.error(err);
        setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  };

  const handleAutoExtractClothing = async (image: File, clothingType: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingExtracting'));

    try {
        const base64Image = await fileToBase64(image);
        const mimeType = image.type;

        const extractedImageBase64 = await extractClothingItem(base64Image, mimeType, clothingType);

        if (extractedImageBase64) {
            const newItem: FashionItem = {
                id: Date.now(),
                key: `customItem`,
                type: 'Accessory', // It's a generic extracted piece now
                imageUrl: `data:image/png;base64,${extractedImageBase64}`,
                prompt: `Incorporate the provided clothing item into the person's outfit naturally, replacing any overlapping clothing.`,
                isCustom: true,
            };
            setCustomFashionItems(prev => [...prev, newItem]);
        } else {
            throw new Error("Failed to extract item, no image was returned.");
        }
    } catch(err) {
        console.error(err);
        setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  };
  
  const handleGenerateModelImage = async (modelImg: File, clothingImg: File, backgroundImg: File, prompt: string, aspectRatio: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingGeneratingModel'));

    try {
      const [modelData, clothingData, backgroundData] = await Promise.all([
        fileToBase64(modelImg).then(data => ({ data, mimeType: modelImg.type })),
        fileToBase64(clothingImg).then(data => ({ data, mimeType: clothingImg.type })),
        fileToBase64(backgroundImg).then(data => ({ data, mimeType: backgroundImg.type })),
      ]);
      
      const resultBase64 = await generateModelImage(modelData, clothingData, backgroundData, prompt, aspectRatio);

      if (resultBase64) {
        const newImageSrc = `data:image/png;base64,${resultBase64}`;
        setDisplayedImages([newImageSrc]);
        addHistoryEntry([newImageSrc], {});
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch(err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };
  
  const handleGeneratePerspectiveImage = async (clothingImg: File, prompt: string, aspectRatio: string, count: number) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingGeneratingPerspective'));

    try {
      const clothingData = await fileToBase64(clothingImg).then(data => ({ data, mimeType: clothingImg.type }));
      const resultsBase64 = await generateDifferentPerspectiveImage(clothingData, prompt, aspectRatio, count);

      if (resultsBase64.length > 0) {
        const newImageSrcs = resultsBase64.map(r => `data:image/png;base64,${r}`);
        setDisplayedImages(newImageSrcs);
        addHistoryEntry(newImageSrcs, {});
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch(err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleGenerateImageFromPrompt = async (prompt: string, count: number, aspectRatio: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage(t('loadingGeneratingImage'));

    try {
      const resultsBase64 = await generateImageFromPrompt(prompt, count, aspectRatio);

      if (resultsBase64.length > 0) {
        const newImageSrcs = resultsBase64.map(r => `data:image/jpeg;base64,${r}`);
        setDisplayedImages(newImageSrcs);
        resetAllStyles(); 
        addHistoryEntry(newImageSrcs, {
            fashionItems: [], 
            hairStyle: null, 
            makeupLook: null, 
            styleLook: null, 
            bodyShapeStyle: null, 
            backgroundTheme: null, 
            faceRetouchSettings: null, 
            japaneseTextStyle: null,
            appliedFaceSwapImage: null
        });
      } else {
        throw new Error(t('errorNoImageReturned'));
      }
    } catch(err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t('errorUnknown'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const resetImage = () => {
    if (originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      resetAllStyles();
      addHistoryEntry([imageUrl], { fashionItems: [], hairStyle: null, makeupLook: null, styleLook: null, bodyShapeStyle: null, backgroundTheme: null, faceRetouchSettings: null, japaneseTextStyle: null, appliedFaceSwapImage: null });
    }
  };

  const handleUploadNewImage = () => {
    setOriginalImage(null);
    setDisplayedImages(null);
    setPreviewImage(null);
    setIsLoading(false);
    setError(null);
    setLoadingMessage('');
    resetAllStyles();
    setDetectedClothing(null);
    setIsDetecting(false);
    setHistory([]);
    setHistoryIndex(-1);
  };
  
  const resetFashion = () => {
    if (originalImage && appliedFashionItems.length > 0) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedFashionItems([]);
      addHistoryEntry([imageUrl], { fashionItems: [] });
    }
  };

  const resetHairAndMakeup = () => {
    if(originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedHairStyle(null);
      setAppliedMakeupLook(null);
      setAppliedFaceRetouch(null);
      addHistoryEntry([imageUrl], { hairStyle: null, makeupLook: null, faceRetouchSettings: null });
    }
  };

  const resetStylist = () => {
    if(originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedStyle(null);
      setAppliedBodyShapeStyle(null);
      addHistoryEntry([imageUrl], { styleLook: null, bodyShapeStyle: null });
    }
  };
  
  const resetBackground = () => {
    if(originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedBackground(null);
      addHistoryEntry([imageUrl], { backgroundTheme: null });
    }
  };
  
  const resetJapaneseText = () => {
    if(originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedJapaneseTextStyle(null);
      addHistoryEntry([imageUrl], { japaneseTextStyle: null });
    }
  };
  
  const handleResetFaceSwap = () => {
    if(originalImage) {
      const imageUrl = URL.createObjectURL(originalImage);
      setDisplayedImages([imageUrl]);
      setAppliedFaceSwapImage(null);
      addHistoryEntry([imageUrl], { appliedFaceSwapImage: null });
    }
  };

  const restoreStateFromHistory = (entry: HistoryEntry) => {
    setDisplayedImages(entry.images);
    setAppliedFashionItems(entry.fashionItems);
    setAppliedHairStyle(entry.hairStyle);
    setAppliedMakeupLook(entry.makeupLook);
    setAppliedStyle(entry.styleLook);
    setAppliedBodyShapeStyle(entry.bodyShapeStyle);
    setAppliedBackground(entry.backgroundTheme);
    setAppliedFaceRetouch(entry.faceRetouchSettings);
    setAppliedJapaneseTextStyle(entry.japaneseTextStyle);
    setAppliedFaceSwapImage(entry.appliedFaceSwapImage);
  };

  const handleUndo = () => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreStateFromHistory(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreStateFromHistory(history[newIndex]);
    }
  };

  const handleFilterHoverStart = useCallback(async (filter: Filter) => {
    if (isLoading || !originalImage) return;

    const requestId = ++hoverRequestRef.current;
    setIsPreviewLoading(true);

    try {
        const base64Image = await fileToBase64(originalImage);
        const mimeType = originalImage.type;
        
        const editedImageBase64 = await editImageWithPrompt(base64Image, mimeType, filter.prompt);

        if (hoverRequestRef.current === requestId && editedImageBase64) {
            const newImageSrc = `data:image/png;base64,${editedImageBase64}`;
            setPreviewImage(newImageSrc);
        }
    } catch (err) {
        console.error("Preview failed", err);
        if (hoverRequestRef.current === requestId) {
            setPreviewImage(null);
        }
    } finally {
        if (hoverRequestRef.current === requestId) {
            setIsPreviewLoading(false);
        }
    }
  }, [originalImage, isLoading]);

  const handleFilterHoverEnd = useCallback(() => {
    hoverRequestRef.current++;
    setIsPreviewLoading(false);
    setPreviewImage(null);
  }, []);
  

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ImageViewer 
                srcs={previewImage ? [previewImage] : displayedImages} 
                isLoading={isLoading} 
                loadingMessage={loadingMessage} 
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
                isPreviewing={!!previewImage}
                isPreviewLoading={isPreviewLoading}
              />
            </div>
            <div>
              <ControlPanel
                onApplyFilter={applyFilter}
                onApplyFashionItem={handleFashionItemSelect}
                onApplyAdjustments={applyAdjustments}
                onReset={resetImage}
                onUploadNewImage={handleUploadNewImage}
                onResetFashion={resetFashion}
                appliedFashionItems={appliedFashionItems}
                isDisabled={isLoading || isPreviewLoading}
                detectedClothing={detectedClothing}
                isDetecting={isDetecting}
                onApplyHairStyle={handleHairStyleSelect}
                onApplyMakeupLook={handleMakeupLookSelect}
                appliedHairStyle={appliedHairStyle}
                appliedMakeupLook={appliedMakeupLook}
                onResetHairAndMakeup={resetHairAndMakeup}
                onApplyStyle={handleStyleSelect}
                appliedStyle={appliedStyle}
                onResetStylist={resetStylist}
                onApplyBackground={handleBackgroundSelect}
                appliedBackground={appliedBackground}
                onResetBackground={resetBackground}
                onApplyBodyShapeStyle={handleBodyShapeStyleSelect}
                appliedBodyShapeStyle={appliedBodyShapeStyle}
                onApplyFaceRetouch={handleApplyFaceRetouch}
                appliedFaceRetouch={appliedFaceRetouch}
                onApplyJapaneseTextStyle={handleJapaneseTextStyleSelect}
                appliedJapaneseTextStyle={appliedJapaneseTextStyle}
                onResetJapaneseText={resetJapaneseText}
                onFilterHoverStart={handleFilterHoverStart}
                onFilterHoverEnd={handleFilterHoverEnd}
                onExtractClothing={handleExtractClothing}
                onAutoExtractClothing={handleAutoExtractClothing}
                customFashionItems={customFashionItems}
                onRemoveBackground={handleRemoveBackground}
                onGenerateModelImage={handleGenerateModelImage}
                onGeneratePerspectiveImage={handleGeneratePerspectiveImage}
                onGenerateImage={handleGenerateImageFromPrompt}
                onApplyFaceSwap={handleApplyFaceSwap}
                onResetFaceSwap={handleResetFaceSwap}
                appliedFaceSwapImage={appliedFaceSwapImage}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
            <p><strong>{t('errorLabel')}:</strong> {error}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

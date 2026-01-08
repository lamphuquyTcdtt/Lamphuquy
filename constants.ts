
import { Filter, FashionItem, HairStyle, MakeupLook, StyleLook, BackgroundTheme, BodyShapeStyle, JapaneseTextStyle, Color } from './types';

export const VISION_MODES: Filter[] = [
  {
    key: 'animeVision',
    prompt: "Vision Engine v6.0: Transform the entire image into a high-quality 8K anime style. Maintain the original composition and character pose, but render everything with vibrant colors, clean line art, and characteristic anime aesthetics.",
    thumbnail: 'https://picsum.photos/seed/animevision/100/100',
  },
  {
    key: 'realisticVision',
    prompt: "Vision Engine v6.0: Enhance the image to be ultra-realistic 8K. Refine textures, lighting, and details to create a photorealistic, high-resolution image. Ensure the result looks like a professional photograph taken with a prime lens.",
    thumbnail: 'https://picsum.photos/seed/realisticvision/100/100',
  },
  {
    key: 'cosplayVision',
    prompt: "Vision Engine v6.0: Transform the person in the image into a high-quality cosplay photo. Enhance costume details, apply dramatic lighting, and add digital artistry to perfectly capture the essence of a character, while retaining the subject's core facial features.",
    thumbnail: 'https://picsum.photos/seed/cosplayvision/100/100',
  },
];

export const ENHANCEMENTS: Filter[] = [
   {
    key: 'visionEnhance',
    prompt: "Vision Engine v6.0: Apply 'Vision Enhance'. Subtly increase the detail, clarity, and color vibrancy of the image with a Japanese aesthetic. Improve the overall quality to 4K standards without drastic changes to the content or style. Clean noise.",
    thumbnail: 'https://picsum.photos/seed/visionenhance/100/100',
  },
  {
    key: 'promptMirrorJP',
    prompt: "Vision Engine v6.0: Analyze the lighting, skin tones, and camera angles. Regenerate the image shifting elements to match a modern Japanese photography aesthetic. Apply soft, diffused lighting, enhance skin for a clear 'toumei-kan' (translucent) look, and adjust composition to feel intimate and emotional.",
    thumbnail: 'https://picsum.photos/seed/promptmirror/100/100',
  }
];


export const JAPANESE_FILTERS: Filter[] = [
  {
    key: 'tokyoOffice',
    prompt: "Vision Engine v6.0: Apply 'Tokyo Office' aesthetic. Create a clean, bright, professional look with a mix of soft natural light and office lighting. Emphasize white, beige, and navy tones for a sharp OL (Office Lady) vibe. 8K resolution.",
    thumbnail: 'https://picsum.photos/seed/tokyooffice/100/100',
  },
  {
    key: 'shibuyaGlow',
    prompt: "Apply a vibrant, warm, slightly pastel 'Shibuya Glow' Japanese color filter. Enhance the pinks and oranges for a cozy, nostalgic feel.",
    thumbnail: 'https://picsum.photos/seed/shibuya/100/100',
  },
  {
    key: 'kyotoSerenity',
    prompt: "Apply a 'Kyoto Serenity' Japanese color filter with soft, muted tones. Emphasize cool blues and gentle greens for a calm, traditional atmosphere.",
    thumbnail: 'https://picsum.photos/seed/kyoto/100/100',
  },
  {
    key: 'tokyoNeon',
    prompt: "Apply a 'Tokyo Neon' filter. Boost the contrast and saturation, adding a slight magenta and cyan tint to the highlights and shadows to mimic city night lights.",
    thumbnail: 'https://picsum.photos/seed/tokyo/100/100',
  },
  {
    key: 'hokkaidoWinter',
    prompt: "Apply a 'Hokkaido Winter' filter. Desaturate the image slightly and add a cool, crisp blue tone to create a feeling of a cold, clear day.",
    thumbnail: 'https://picsum.photos/seed/hokkaido/100/100',
  },
  {
    key: 'okinawaSunset',
    prompt: "Apply an 'Okinawa Sunset' filter. Infuse the image with warm, golden hour light, rich oranges, and deep purples for a dramatic, tropical sunset effect.",
    thumbnail: 'https://picsum.photos/seed/okinawa/100/100',
  },
   {
    key: 'classicKimono',
    prompt: "Apply a 'Classic Kimono' filter. Give the image a timeless, slightly faded look with rich, deep reds and golds, similar to vintage Japanese textiles.",
    thumbnail: 'https://picsum.photos/seed/kimono/100/100',
  },
  {
    key: 'kimonoStyle',
    prompt: "Apply a 'Kimono Style' filter. Give the image a timeless, slightly faded look with rich, deep reds and golds, similar to vintage Japanese textiles.",
    thumbnail: 'https://picsum.photos/seed/kimonostyle/100/100',
  }
];

export const FASHION_STYLE_FILTERS: Filter[] = [
  {
    key: 'lookbookHighEnd',
    prompt: "Vision Engine v6.0: Apply 'High-end Lookbook' style. Create a sophisticated fashion photography look with a soft focus background and a razor-sharp subject. Use soft studio lighting to highlight fabric textures and skin tones.",
    thumbnail: 'https://picsum.photos/seed/lookbook/100/100',
  },
  {
    key: 'fashionEditorial',
    prompt: "Apply a 'Fashion Editorial' style. Create a high-contrast, slightly desaturated look with sharp focus and dramatic lighting. Emphasize textures in clothing and create a polished, magazine-ready feel.",
    thumbnail: 'https://picsum.photos/seed/editorial/100/100',
  },
  {
    key: 'streetStyle',
    prompt: "Apply a 'Street Style' look. Enhance colors to be more vibrant, add a slight gritty texture, and adjust lighting to feel candid and in-the-moment, like a photo taken on a city street.",
    thumbnail: 'https://picsum.photos/seed/street/100/100',
  },
  {
    key: 'glamourShot',
    prompt: "Apply a 'Glamour Shot' effect. Add a soft, warm glow to the image, smooth skin tones for a flawless look, and enhance highlights to give a dreamy, radiant appearance.",
    thumbnail: 'https://picsum.photos/seed/glamour/100/100',
  },
  {
    key: 'casualChic',
    prompt: "Apply a 'Casual Chic' filter. Create a clean, bright look with natural lighting and relaxed, true-to-life colors. The style should feel effortless and sophisticated.",
    thumbnail: 'https://picsum.photos/seed/casual/100/100',
  },
  {
    key: 'vintageFilm',
    prompt: "Apply a 'Vintage Film' aesthetic. Add a subtle grain, slightly fade the colors, and apply a warm, nostalgic color tint to mimic the look of an old photograph from the 70s.",
    thumbnail: 'https://picsum.photos/seed/vintage/100/100',
  },
  {
    key: 'highFashion',
    prompt: "Apply a 'High Fashion' filter. Convert the image to a dramatic black and white, with deep blacks and bright whites. Increase the clarity to make details pop.",
    thumbnail: 'https://picsum.photos/seed/highfashion/100/100',
  }
];

export const JAPANESE_TEXT_STYLES: JapaneseTextStyle[] = [
    {
        key: 'calligraphyWisdom',
        prompt: "Overlay the Japanese kanji for 'Wisdom' (知) in an elegant, black calligraphy style in the bottom right corner. Ensure it is subtly integrated with the image's composition.",
        thumbnail: 'https://picsum.photos/seed/calligraphy/100/100',
    },
    {
        key: 'brushStrokePower',
        prompt: "Add the Japanese kanji for 'Power' (力) to the image using a bold, dynamic, black ink brush stroke. Place it creatively to enhance the image's energy.",
        thumbnail: 'https://picsum.photos/seed/brushstroke/100/100',
    },
    {
        key: 'tokyoNeonKanji',
        prompt: "Overlay the Japanese text for 'Tokyo' (東京) in a bright, glowing pink neon sign style. Place it in a way that complements the image's urban or modern feel.",
        thumbnail: 'https://picsum.photos/seed/neonkanji/100/100',
    },
    {
        key: 'haikuOverlay',
        prompt: "Add a classic Japanese haiku about nature, written vertically in a delicate, handwritten font. Place it along the side of the image, harmonizing with the visual elements.",
        thumbnail: 'https://picsum.photos/seed/haiku/100/100',
    },
];

export const QUICK_CREATE_STYLES = [
  { key: 'styleAnime', prompt: "Generate a detailed prompt for an anime-style character artwork." },
  { key: 'stylePhotorealistic', prompt: "Generate a detailed prompt for a photorealistic portrait of a person." },
  { key: 'styleFantasy', prompt: "Generate a detailed prompt for a high-fantasy scene with mythical creatures." },
  { key: 'styleMinimalist', prompt: "Generate a detailed prompt for a minimalist and abstract piece of art." },
  { key: 'styleLandscape', prompt: "Generate a detailed prompt for a breathtaking landscape painting." },
  { key: 'styleLogo', prompt: "Generate a detailed prompt for a modern logo for a tech company." },
];


export const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 101,
    key: 'modernOffice',
    imageUrl: 'https://picsum.photos/seed/modernoffice/100/100',
    prompt: "Place the person in a modern, high-end Japanese office in Tokyo with floor-to-ceiling windows, soft daylight, and a blurred city view. Professional atmosphere.",
  },
  {
    id: 1,
    key: 'japaneseGarden',
    imageUrl: 'https://picsum.photos/seed/japangarden/100/100',
    prompt: "Detect the person in the foreground and replace the background with a serene Japanese garden featuring a koi pond and stone lanterns. Ensure the lighting on the person matches the new environment.",
  },
  {
    id: 2,
    key: 'studioBackdrop',
    imageUrl: 'https://picsum.photos/seed/studio/100/100',
    prompt: "Isolate the person and replace the background with a professional, solid light gray studio backdrop. Maintain realistic lighting and shadows on the person.",
  },
  {
    id: 3,
    key: 'cityscapeNight',
    imageUrl: 'https://picsum.photos/seed/citynight/100/100',
    prompt: "Replace the background with a vibrant cityscape at night, filled with neon lights. Adjust the person's lighting to match the ambient city light.",
  },
  {
    id: 4,
    key: 'tropicalBeach',
    imageUrl: 'https://picsum.photos/seed/beach/100/100',
    prompt: "Place the person on a beautiful tropical beach with white sand and clear blue water. Match the lighting to a bright, sunny day.",
  },
  {
    id: 5,
    key: 'cherryBlossomFestival',
    imageUrl: 'https://picsum.photos/seed/cherryblossom/100/100',
    prompt: "Detect the person in the foreground and place them in the middle of a vibrant Japanese cherry blossom festival. The scene should be filled with blooming sakura trees and traditional lanterns. Ensure the lighting on the person is soft and matches the daytime festival atmosphere."
  },
  {
    id: 6,
    key: 'mountFujiView',
    imageUrl: 'https://picsum.photos/seed/fuji/100/100',
    prompt: "Replace the background with a breathtaking view of Mount Fuji from a scenic viewpoint, perhaps overlooking a lake like Kawaguchiko. The person should appear naturally integrated into the landscape under clear, daytime lighting."
  },
  {
    id: 7,
    key: 'traditionalTeaHouse',
    imageUrl: 'https://picsum.photos/seed/teahouse/100/100',
    prompt: "Place the person inside a traditional Japanese tea house with tatami mat floors, shoji paper screens, and a view of a small garden. The lighting should be calm and diffused, as if coming through the paper screens."
  },
  {
    id: 8,
    key: 'modernTokyoStreet',
    imageUrl: 'https://picsum.photos/seed/tokyostreet/100/100',
    prompt: "Replace the background with a bustling, modern Tokyo street during the day. Include contemporary architecture, stylish pedestrians, and clean street signs. The lighting on the person should be bright and consistent with an urban daytime setting."
  }
];


export const EVENT_STYLES: StyleLook[] = [
  {
    id: 1,
    key: 'weddingGuest',
    imageUrl: 'https://picsum.photos/seed/wedding/100/100',
    prompt: "Change the person's outfit to an elegant and appropriate dress or suit for a wedding guest. The style should be formal but not overly flashy.",
  },
  {
    id: 2,
    key: 'galaNight',
    imageUrl: 'https://picsum.photos/seed/gala/100/100',
    prompt: "Transform the person's attire into a stunning, formal evening gown or a sharp tuxedo suitable for a black-tie gala.",
  },
  {
    id: 3,
    key: 'beachParty',
    imageUrl: 'https://picsum.photos/seed/beachparty/100/100',
    prompt: "Change the person's outfit to a stylish and relaxed beach party look, such as a linen shirt and shorts or a flowy sundress.",
  },
  {
    id: 4,
    key: 'casualOuting',
    imageUrl: 'https://picsum.photos/seed/casualouting/100/100',
    prompt: "Give the person a comfortable yet fashionable outfit for a casual outing, like stylish jeans paired with a modern top and sneakers.",
  },
];

export const SEASONAL_STYLES: StyleLook[] = [
  {
    id: 1,
    key: 'springVibe',
    imageUrl: 'https://picsum.photos/seed/spring/100/100',
    prompt: "Dress the person in a spring-themed outfit. Think light layers, pastel colors, and floral patterns, like a light jacket over a blouse.",
  },
  {
    id: 2,
    key: 'summerVibe',
    imageUrl: 'https://picsum.photos/seed/summer/100/100',
    prompt: "Change the outfit to a summer look with light, breathable fabrics. A bright-colored t-shirt and shorts, or a vibrant summer dress would be perfect.",
  },
  {
    id: 3,
    key: 'autumnVibe',
    imageUrl: 'https://picsum.photos/seed/autumn/100/100',
    prompt: "Transform the outfit into a cozy autumn ensemble. Use warm, earthy tones, and layered clothing like a sweater or a trench coat.",
  },
  {
    id: 4,
    key: 'winterVibe',
    imageUrl: 'https://picsum.photos/seed/winter/100/100',
    prompt: "Change the person's attire to a stylish winter outfit, including a warm coat, a chunky knit scarf, and a beanie.",
  },
];

export const BODY_SHAPE_STYLES: BodyShapeStyle[] = [
  {
    id: 1,
    key: 'hourglass',
    imageUrl: 'https://picsum.photos/seed/hourglass/100/100',
    prompt: "Analyze the person's hourglass body shape and change their outfit to a style that accentuates their defined waist and maintains the natural balance of their silhouette. A wrap dress, a belted outfit, or high-waisted bottoms with a fitted top would be ideal."
  },
  {
    id: 2,
    key: 'pearShape',
    imageUrl: 'https://picsum.photos/seed/pearshape/100/100',
    prompt: "Analyze the person's pear-shaped (triangle) body. Change their outfit to add volume and emphasis to the upper body while creating a slimming effect on the hips. A-line skirts paired with a detailed or brightly colored top, or a dress with a fitted top and flared bottom, would be perfect."
  },
  {
    id: 3,
    key: 'appleShape',
    imageUrl: 'https://picsum.photos/seed/appleshape/100/100',
    prompt: "Analyze the person's apple-shaped (inverted triangle) body. Change their outfit to a style that draws attention away from the midsection and elongates the torso. An empire-waist top, a V-neck dress, or a flowy tunic over slim-fit pants would be flattering."
  },
  {
    id: 4,
    key: 'rectangle',
    imageUrl: 'https://picsum.photos/seed/rectangle/100/100',
    prompt: "Analyze the person's rectangle body shape. Change their outfit to create the illusion of curves and define the waist. A peplum top, a belted jacket, a dress with cinching or color-blocking at the waist, or an outfit with ruffles would work well."
  },
];

const COLORS: { [key: string]: Color } = {
  black: { name: 'black', hex: '#111827' },
  white: { name: 'white', hex: '#ffffff' },
  gray: { name: 'gray', hex: '#6b7280' },
  red: { name: 'red', hex: '#ef4444' },
  blue: { name: 'blue', hex: '#3b82f6' },
  green: { name: 'green', hex: '#22c55e' },
  pink: { name: 'light pink', hex: '#f9a8d4' },
  brown: { name: 'brown', hex: '#a16207' },
  beige: { name: 'beige', hex: '#f5f5dc' },
  navy: { name: 'navy blue', hex: '#000080' },
};

export const FASHION_ITEMS: FashionItem[] = [
    // --- JAPANESE OL FASHION PACK (Vision Engine v6.0) ---
  {
    id: 1001,
    key: 'olWhiteShirt',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/olshirt/200/200',
    prompt: "Replace the person's top with a high-quality Japanese OL style {{color}} slim fit shirt. Crisp, clean fabric with perfect tailoring.",
    colors: [COLORS.white, COLORS.pink, COLORS.blue],
  },
  {
    id: 1002,
    key: 'olBowTieBlouse',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/olbow/200/200',
    prompt: "Replace the person's top with an elegant Japanese OL style {{color}} silk blouse featuring a stylish bow-tie at the neck.",
    colors: [COLORS.white, COLORS.beige, COLORS.pink],
  },
  {
    id: 1003,
    key: 'olPencilSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/olpencil/200/200',
    prompt: "Replace the bottom wear with a high-waist Japanese OL style {{color}} tight pencil skirt. Professional and form-fitting.",
    colors: [COLORS.black, COLORS.navy, COLORS.beige, COLORS.gray],
  },
  {
    id: 1004,
    key: 'olMiniSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/olmini/200/200',
    prompt: "Replace the bottom wear with a sophisticated Japanese OL style {{color}} mini skirt, suitable for a modern office look.",
    colors: [COLORS.black, COLORS.navy, COLORS.gray],
  },
  {
    id: 1005,
    key: 'olBlazer',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/olblazer/200/200',
    prompt: "Add a Japanese OL style {{color}} slim fit blazer over the outfit. Sharp tailoring and professional look.",
    colors: [COLORS.black, COLORS.navy, COLORS.beige],
  },
  {
    id: 1006,
    key: 'olCardigan',
    type: 'Sweater',
    imageUrl: 'https://picsum.photos/seed/olcardi/200/200',
    prompt: "Add a soft, gentle Japanese OL style {{color}} cardigan. Elegant and office-appropriate.",
    colors: [COLORS.beige, COLORS.gray, COLORS.pink, COLORS.navy],
  },
  {
    id: 1007,
    key: 'olSuit',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/olsuit/200/200',
    prompt: "Change the person's outfit to a complete Japanese OL leadership suit in {{color}}. Powerful, feminine, and high-end tailored.",
    colors: [COLORS.black, COLORS.navy, COLORS.gray],
  },
  {
    id: 1008,
    key: 'olStockings',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/olstocking/200/200',
    prompt: "Add high-quality sheer pantyhose to the person's legs. Smooth texture, Japanese brand aesthetic.",
  },
  {
    id: 1009,
    key: 'olHeels',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/olheels/200/200',
    prompt: "Change the shoes to {{color}} 7cm high heels (pumps). Classic Japanese office style, clean and polished.",
    colors: [COLORS.black, COLORS.beige, COLORS.navy],
  },

  // --- STANDARD ITEMS ---
  {
    id: 1,
    key: 'blueDenimJacket',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/jacket1/200/200',
    prompt: "Replace the person's current top with a classic {{color}} denim jacket.",
    colors: [COLORS.blue, COLORS.black, COLORS.white],
  },
  {
    id: 26,
    key: 'leatherJacket',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/jacket2/200/200',
    prompt: "Replace the person's current top with a cool {{color}} leather biker jacket.",
    colors: [COLORS.black, COLORS.brown, COLORS.red],
  },
  {
    id: 32,
    key: 'trenchCoat',
    type: 'Coat',
    imageUrl: 'https://picsum.photos/seed/coat1/200/200',
    prompt: "Replace the person's outerwear with a classic {{color}} trench coat, perfect for spring or autumn.",
    colors: [COLORS.beige, COLORS.black, COLORS.navy],
  },
  {
    id: 2,
    key: 'redGraphicTShirt',
    type: 'T-Shirt',
    imageUrl: 'https://picsum.photos/seed/tshirt1/200/200',
    prompt: "Change the person's shirt to a vibrant {{color}} t-shirt with a subtle, modern graphic design on the front.",
    colors: [COLORS.red, COLORS.black, COLORS.white, COLORS.gray],
  },
  {
    id: 5,
    key: 'blackHoodie',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/hoodie1/200/200',
    prompt: "Replace the person's current top with a comfortable {{color}} hoodie.",
    colors: [COLORS.black, COLORS.gray, COLORS.red, COLORS.blue],
  },
  {
    id: 12,
    key: 'whiteSilkBlouse',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/blouse1/200/200',
    prompt: "Change the person's top to an elegant {{color}} silk blouse.",
    colors: [COLORS.white, COLORS.pink, COLORS.black],
  },
  {
    id: 33,
    key: 'linenShirt',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/blouse2/200/200',
    prompt: "Change the person's top to a breathable {{color}} linen shirt, ideal for summer.",
    colors: [COLORS.white, COLORS.blue, COLORS.beige],
  },
  {
    id: 34,
    key: 'cashmereSweater',
    type: 'Sweater',
    imageUrl: 'https://picsum.photos/seed/sweater1/200/200',
    prompt: "Replace the person's top with a cozy {{color}} cashmere sweater.",
    colors: [COLORS.gray, COLORS.beige, COLORS.navy],
  },
  {
    id: 7,
    key: 'khakiChinos',
    type: 'Pants',
    imageUrl: 'https://picsum.photos/seed/pants1/200/200',
    prompt: "Change the person's pants to a pair of smart khaki chinos.",
  },
  {
    id: 8,
    key: 'rippedBlueJeans',
    type: 'Pants',
    imageUrl: 'https://picsum.photos/seed/pants2/200/200',
    prompt: "Replace the person's current pants with a pair of stylish ripped blue jeans.",
  },
  {
    id: 35,
    key: 'wideLegTrousers',
    type: 'Pants',
    imageUrl: 'https://picsum.photos/seed/pants3/200/200',
    prompt: "Replace the person's bottom wear with a pair of chic {{color}} wide-leg trousers.",
    colors: [COLORS.black, COLORS.white, COLORS.beige],
  },
  {
    id: 36,
    key: 'denimShorts',
    type: 'Shorts',
    imageUrl: 'https://picsum.photos/seed/shorts1/200/200',
    prompt: "Change the person's bottom wear to a pair of casual {{color}} denim shorts.",
    colors: [COLORS.blue, COLORS.black, COLORS.white],
  },
  {
    id: 13,
    key: 'pleatedSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/skirt1/200/200',
    prompt: "Replace the person's pants or skirt with a chic, knee-length {{color}} pleated skirt.",
    colors: [COLORS.gray, COLORS.black, COLORS.pink],
  },
  {
    id: 14,
    key: 'pencilSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/skirt2/200/200',
    prompt: "Change the person's bottom wear to a professional {{color}} pencil skirt.",
    colors: [COLORS.black, COLORS.gray, COLORS.blue],
  },
  {
    id: 3,
    key: 'whiteSneakers',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/shoes1/200/200',
    prompt: "Change the person's shoes to a pair of clean, stylish white sneakers.",
  },
  {
    id: 18,
    key: 'blackDressShoes',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/dressshoes1/200/200',
    prompt: "Change the person's shoes to a pair of polished black leather dress shoes.",
  },
  {
    id: 37,
    key: 'ankleBoots',
    type: 'Boots',
    imageUrl: 'https://picsum.photos/seed/boots1/200/200',
    prompt: "Change the person's footwear to a pair of stylish {{color}} leather ankle boots.",
    colors: [COLORS.black, COLORS.brown],
  },
  {
    id: 38,
    key: 'strappySandals',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/sandals1/200/200',
    prompt: "Change the person's shoes to elegant {{color}} strappy sandals.",
    colors: [COLORS.black, COLORS.white, COLORS.beige],
  },
  {
    id: 6,
    key: 'aviatorSunglasses',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/sunglasses1/200/200',
    prompt: "Place a pair of classic aviator sunglasses with a gold frame on the person's face.",
  },
  {
    id: 4,
    key: 'leatherBackpack',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/bag1/200/200',
    prompt: "Add a stylish brown leather backpack onto the person's back.",
  },
  {
    id: 15,
    key: 'crossbodyBag',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/bag2/200/200',
    prompt: "Add a stylish black leather crossbody bag worn over the person's shoulder.",
  },
  {
    id: 24,
    key: 'toteBag',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/bag3/200/200',
    prompt: "Add a large, fashionable canvas tote bag held in the person's hand or on their shoulder.",
  },
  {
    id: 9,
    key: 'redBeanie',
    type: 'Hat',
    imageUrl: 'https://picsum.photos/seed/hat1/200/200',
    prompt: "Place a cozy {{color}} beanie on the person's head.",
    colors: [COLORS.red, COLORS.black, COLORS.gray, COLORS.green],
  },
  {
    id: 10,
    key: 'baseballCap',
    type: 'Hat',
    imageUrl: 'https://picsum.photos/seed/hat2/200/200',
    prompt: "Add a classic {{color}} baseball cap to the person's head, worn forwards.",
    colors: [COLORS.black, COLORS.white, COLORS.blue],
  },
  {
    id: 23,
    key: 'fedoraHat',
    type: 'Hat',
    imageUrl: 'https://picsum.photos/seed/hat3/200/200',
    prompt: "Place a stylish gray fedora hat on the person's head.",
  },
  {
    id: 11,
    key: 'goldChainNecklace',
    type: 'Necklace',
    imageUrl: 'https://picsum.photos/seed/necklace1/200/200',
    prompt: "Add a simple, elegant gold chain necklace around the person's neck.",
  },
  {
    id: 22,
    key: 'silkScarf',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/scarf1/200/200',
    prompt: "Add a colorful silk scarf elegantly tied around the person's neck.",
  },
  {
    id: 39,
    key: 'woolScarf',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/scarf2/200/200',
    prompt: "Add a warm {{color}} wool scarf wrapped around the person's neck.",
    colors: [COLORS.gray, COLORS.red, COLORS.navy],
  },
  {
    id: 40,
    key: 'leatherBelt',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/belt1/200/200',
    prompt: "Add a classic {{color}} leather belt to the person's waist.",
    colors: [COLORS.brown, COLORS.black],
  },
  {
    id: 16,
    key: 'classicTuxedo',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/tuxedo1/200/200',
    prompt: "Replace the person's current outfit with a classic black tuxedo, complete with a white dress shirt and a black bow tie.",
  },
  {
    id: 21,
    key: 'businessSuit',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/suit2/200/200',
    prompt: "Replace the person's current outfit with a sharp, professional dark gray business suit.",
  },
  {
    id: 17,
    key: 'elegantGown',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/gown1/200/200',
    prompt: "Change the person's outfit to an elegant, floor-length formal gown in a deep royal blue color.",
  },
  {
    id: 19,
    key: 'traditionalKimono',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/kimono1/200/200',
    prompt: "Change the person's outfit to a beautiful, traditional Japanese kimono with intricate patterns and a matching obi sash.",
  },
  {
    id: 20,
    key: 'summerDress',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/dress2/200/200',
    prompt: "Change the person's outfit to a light and airy floral summer dress.",
  },
  {
    id: 25,
    key: 'littleBlackDress',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/dress3/200/200',
    prompt: "Change the person's outfit to a classic, chic little black dress suitable for an evening event.",
  },
  {
    id: 41,
    key: 'cocktailDress',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/dress4/200/200',
    prompt: "Change the person's outfit to a stylish {{color}} cocktail dress, perfect for a party.",
    colors: [COLORS.red, COLORS.black, COLORS.navy],
  },
  {
    id: 27,
    key: 'lightPinkCollaredShirt',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/shirtLPC/200/200',
    prompt: "Replace the person's current top with a light pink long-sleeve collared shirt.",
  },
  {
    id: 28,
    key: 'lightPinkMiniSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/skirtLPM/200/200',
    prompt: "Replace the person's bottom wear with a light pink mini skirt.",
  },
  {
    id: 29,
    key: 'lightPinkSheerStockings',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/stockingsLPS/200/200',
    prompt: "Add light pink sheer stockings to the person's legs.",
  },
  {
    id: 30,
    key: 'lightPinkHighHeels',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/heelsLPH/200/200',
    prompt: "Change the person's shoes to light pink pointed-toe high heels.",
  },
  {
    id: 31,
    key: 'smallDanglingEarrings',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/earringsSDE/200/200',
    prompt: "Add a pair of small, delicate dangling earrings to the person's ears.",
  },
  {
    id: 42,
    key: 'yukata',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/yukata1/200/200',
    prompt: "Change the person's outfit to a beautiful, traditional Japanese summer {{color}} yukata with a floral pattern and a matching obi sash.",
    colors: [COLORS.navy, COLORS.pink, COLORS.white],
  },
  {
    id: 43,
    key: 'bikini',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/bikini1/200/200',
    prompt: "Change the person's outfit to a stylish {{color}} bikini, perfect for the beach.",
    colors: [COLORS.black, COLORS.red, COLORS.blue],
  },
  {
    id: 44,
    key: 'pufferJacket',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/puffer1/200/200',
    prompt: "Replace the person's outerwear with a warm and stylish {{color}} puffer jacket.",
    colors: [COLORS.black, COLORS.white, COLORS.red],
  },
  {
    id: 45,
    key: 'promDress',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/promdress1/200/200',
    prompt: "Change the person's outfit to a glamorous, floor-length {{color}} prom dress with sparkling details.",
    colors: [COLORS.blue, COLORS.pink, COLORS.black],
  },
  {
    id: 46,
    key: 'overalls',
    type: 'Pants',
    imageUrl: 'https://picsum.photos/seed/overalls1/200/200',
    prompt: "Change the person's outfit to a pair of casual {{color}} denim overalls.",
    colors: [COLORS.blue],
  },
  {
    id: 47,
    key: 'jinbei',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/jinbei1/200/200',
    prompt: "Change the person's outfit to a comfortable, traditional Japanese {{color}} Jinbei, suitable for summer festivals.",
    colors: [COLORS.navy, COLORS.gray],
  },
  {
    id: 48,
    key: 'cardigan',
    type: 'Sweater',
    imageUrl: 'https://picsum.photos/seed/cardigan1/200/200',
    prompt: "Add a cozy, open-front {{color}} knit cardigan over the person's current top.",
    colors: [COLORS.beige, COLORS.gray, COLORS.black],
  },
  {
    id: 49,
    key: 'weddingDress',
    type: 'Dress',
    imageUrl: 'https://picsum.photos/seed/weddingdress1/200/200',
    prompt: "Transform the person's attire into a stunning, elegant white wedding dress with lace details.",
    colors: [COLORS.white],
  },
  {
    id: 50,
    key: 'tracksuit',
    type: 'Suit',
    imageUrl: 'https://picsum.photos/seed/tracksuit1/200/200',
    prompt: "Change the person's outfit to a stylish and comfortable {{color}} tracksuit.",
    colors: [COLORS.black, COLORS.gray, COLORS.red],
  },
  {
    id: 51,
    key: 'highWaistedShorts',
    type: 'Shorts',
    imageUrl: 'https://picsum.photos/seed/shorts2/200/200',
    prompt: "Replace the person's bottom wear with a pair of trendy {{color}} high-waisted shorts.",
    colors: [COLORS.white, COLORS.black, COLORS.beige],
  },
  {
    id: 52,
    key: 'whiteCollaredShirtWithBowTie',
    type: 'Blouse',
    imageUrl: 'https://picsum.photos/seed/shirtbowtie/200/200',
    prompt: "Replace the person's current top with a crisp white collared shirt and a black bow tie.",
  },
  {
    id: 53,
    key: 'blackBlazer',
    type: 'Jacket',
    imageUrl: 'https://picsum.photos/seed/blazerblack/200/200',
    prompt: "Add a stylish {{color}} single-breasted blazer over the person's current top.",
    colors: [COLORS.black, COLORS.navy, COLORS.gray],
  },
  {
    id: 54,
    key: 'blackMiniSkirt',
    type: 'Skirt',
    imageUrl: 'https://picsum.photos/seed/skirtblackmini/200/200',
    prompt: "Replace the person's bottom wear with a {{color}} mini skirt.",
    colors: [COLORS.black, COLORS.white, COLORS.red],
  },
  {
    id: 55,
    key: 'blackSheerTights',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/tightssheer/200/200',
    prompt: "Add a pair of black sheer tights to the person's legs.",
  },
  {
    id: 56,
    key: 'blackPointedHeelsAnkleStrap',
    type: 'Shoes',
    imageUrl: 'https://picsum.photos/seed/heelsanklestrap/200/200',
    prompt: "Change the person's shoes to a pair of elegant {{color}} pointed-toe high heels with ankle straps.",
    colors: [COLORS.black, COLORS.red, COLORS.beige],
  },
  {
    id: 57,
    key: 'blackStructuredHandbag',
    type: 'Accessory',
    imageUrl: 'https://picsum.photos/seed/handbagstructured/200/200',
    prompt: "Add a sophisticated black structured handbag with a gold clasp, held in the person's hand or placed nearby.",
  }
];

export const HAIR_STYLES: HairStyle[] = [
  {
    id: 1,
    key: 'shortBob',
    imageUrl: 'https://picsum.photos/seed/hair1/100/100',
    prompt: "Change the person's hairstyle to a chic, jaw-length short bob.",
  },
  {
    id: 2,
    key: 'longWavy',
    imageUrl: 'https://picsum.photos/seed/hair2/100/100',
    prompt: "Give the person long, flowing wavy hair.",
  },
  {
    id: 3,
    key: 'pinkHighlights',
    imageUrl: 'https://picsum.photos/seed/hair3/100/100',
    prompt: "Add vibrant pink highlights to the person's current hair.",
  },
  {
    id: 4,
    key: 'slickedBack',
    imageUrl: 'https://picsum.photos/seed/hair4/100/100',
    prompt: "Change the person's hairstyle to a modern, slicked-back look.",
  }
];

export const MAKEUP_LOOKS: MakeupLook[] = [
  {
    id: 101,
    key: 'olNaturalMakeup',
    imageUrl: 'https://picsum.photos/seed/olmakeup/100/100',
    prompt: "Apply a 'Japanese OL' natural makeup look. Clear skin, very subtle blush, light brown eyeliner, and a sheer pink lip tint. Professional and fresh.",
  },
  {
    id: 1,
    key: 'naturalGlow',
    imageUrl: 'https://picsum.photos/seed/makeup1/100/100',
    prompt: "Apply a 'Natural Glow' makeup look. Include subtle foundation, a touch of blush, light mascara, and a nude lipstick.",
  },
  {
    id: 2,
    key: 'smokeyEye',
    imageUrl: 'https://picsum.photos/seed/makeup2/100/100',
    prompt: "Apply a dramatic 'Smokey Eye' makeup look, with dark, blended eyeshadow, bold eyeliner, and voluminous mascara. Keep the lips neutral.",
  },
  {
    id: 3,
    key: 'boldRedLip',
    imageUrl: 'https://picsum.photos/seed/makeup3/100/100',
    prompt: "Apply a classic makeup look featuring a bold, matte red lipstick. Keep the eye makeup minimal with simple eyeliner and mascara.",
  },
  {
    id: 4,
    key: 'catEye',
    imageUrl: 'https://picsum.photos/seed/makeup4/100/100',
    prompt: "Apply a winged 'Cat Eye' eyeliner look. Pair it with a soft pink lipstick and a hint of highlighter on the cheekbones.",
  }
];


export interface Filter {
  key: string;
  prompt: string;
  thumbnail: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface FashionItem {
  id: number;
  key: string;
  type: 'T-Shirt' | 'Jacket' | 'Shoes' | 'Accessory' | 'Pants' | 'Hat' | 'Necklace' | 'Blouse' | 'Skirt' | 'Suit' | 'Dress' | 'Sweater' | 'Coat' | 'Shorts' | 'Boots';
  imageUrl: string;
  prompt: string;
  colors?: Color[];
  isCustom?: boolean;
}

export interface AppliedFashionItem {
  item: FashionItem;
  color: Color;
}

export interface AdjustmentSettings {
    brightness: number;
    contrast: number;
    saturation: number;
    sharpness: number;
}

export interface DetectedItem {
  category: string;
  description: string;
}

export interface HairStyle {
  id: number;
  key: string;
  imageUrl: string;
  prompt: string;
}

export interface MakeupLook {
  id: number;
  key: string;
  imageUrl: string;
  prompt: string;
}

export interface StyleLook {
  id: number;
  key: string;
  imageUrl: string;
  prompt: string;
}

export interface BodyShapeStyle {
  id: number;
  key: string;
  imageUrl: string;
  prompt: string;
}

export interface BackgroundTheme {
  id: number;
  key: string;
  imageUrl: string;
  prompt: string;
}

export interface FaceRetouchSettings {
  smoothSkin: boolean;
  whitenTeeth: boolean;
  enhanceEyes: boolean;
}

export interface JapaneseTextStyle {
  key: string;
  prompt: string;
  thumbnail: string;
}

export interface HistoryEntry {
  images: string[];
  fashionItems: AppliedFashionItem[];
  hairStyle: HairStyle | null;
  makeupLook: MakeupLook | null;
  styleLook: StyleLook | null;
  bodyShapeStyle: BodyShapeStyle | null;
  backgroundTheme: BackgroundTheme | null;
  faceRetouchSettings: FaceRetouchSettings | null;
  japaneseTextStyle: JapaneseTextStyle | null;
  appliedFaceSwapImage: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

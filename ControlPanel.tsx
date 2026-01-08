
import React, { useState } from 'react';
import { Filter, FashionItem, AdjustmentSettings, DetectedItem, HairStyle, MakeupLook, StyleLook, BackgroundTheme, BodyShapeStyle, FaceRetouchSettings, JapaneseTextStyle, AppliedFashionItem, Color } from '../types';
import FilterControls from './FilterControls';
import FashionControls from './FashionControls';
import AdjustmentControls from './AdjustmentControls';
import HairAndMakeupControls from './HairAndMakeupControls';
import StylistControls from './StylistControls';
import BackgroundControls from './BackgroundControls';
import JapaneseTextControls from './JapaneseTextControls';
import ExtractClothingControls from './ExtractClothingControls';
import BackgroundRemovalControls from './BackgroundRemovalControls';
import ModelGeneratorControls from './ModelGeneratorControls';
import PerspectiveGeneratorControls from './PerspectiveGeneratorControls';
import ImageGeneratorControls from './ImageGeneratorControls';
import FaceSwapControls from './FaceSwapControls';
import NotificationTab from './NotificationTab';
import { useTranslation } from '../hooks/useTranslation';

interface ControlPanelProps {
  onApplyFilter: (filter: Filter) => void;
  onApplyFashionItem: (item: FashionItem, color: Color) => void;
  onApplyAdjustments: (settings: AdjustmentSettings) => void;
  onReset: () => void;
  onUploadNewImage: () => void;
  onResetFashion: () => void;
  appliedFashionItems: AppliedFashionItem[];
  isDisabled: boolean;
  detectedClothing: DetectedItem[] | null;
  isDetecting: boolean;
  onApplyHairStyle: (style: HairStyle) => void;
  onApplyMakeupLook: (look: MakeupLook) => void;
  appliedHairStyle: HairStyle | null;
  appliedMakeupLook: MakeupLook | null;
  onResetHairAndMakeup: () => void;
  onApplyStyle: (style: StyleLook) => void;
  appliedStyle: StyleLook | null;
  onResetStylist: () => void;
  onApplyBackground: (theme: BackgroundTheme) => void;
  appliedBackground: BackgroundTheme | null;
  onResetBackground: () => void;
  onApplyBodyShapeStyle: (style: BodyShapeStyle) => void;
  appliedBodyShapeStyle: BodyShapeStyle | null;
  onApplyFaceRetouch: (settings: FaceRetouchSettings) => void;
  appliedFaceRetouch: FaceRetouchSettings | null;
  onApplyJapaneseTextStyle: (style: JapaneseTextStyle) => void;
  appliedJapaneseTextStyle: JapaneseTextStyle | null;
  onResetJapaneseText: () => void;
  onFilterHoverStart?: (filter: Filter) => void;
  onFilterHoverEnd?: () => void;
  onExtractClothing: (image: File, selection: { x: number; y: number; width: number; height: number; }) => void;
  onAutoExtractClothing: (image: File, clothingType: string) => void;
  customFashionItems: FashionItem[];
  onRemoveBackground: () => void;
  onGenerateModelImage: (modelImg: File, clothingImg: File, backgroundImg: File, prompt: string, aspectRatio: string) => void;
  onGeneratePerspectiveImage: (clothingImg: File, prompt: string, aspectRatio: string, count: number) => void;
  onGenerateImage: (prompt: string, count: number, aspectRatio: string) => void;
  onApplyFaceSwap: (faceFile: File) => void;
  onResetFaceSwap: () => void;
  appliedFaceSwapImage: string | null;
}

type TabKey = 'tabTools' | 'tabNotification';

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('tabTools');
  
  const ChevronIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  return (
    <div className="bg-[var(--bg-secondary)] p-4 sm:p-6 rounded-2xl shadow-lg space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold">{t('editingTools')}</h2>
        <div className="flex gap-2">
            <button
                onClick={props.onReset}
                disabled={props.isDisabled}
                className="text-sm font-medium text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {t('resetImage')}
            </button>
             <button
                onClick={props.onUploadNewImage}
                disabled={props.isDisabled}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l border-[var(--border-color)] pl-2"
            >
                {t('uploadNewImage')}
            </button>
        </div>
      </div>

      <div className="flex space-x-1 bg-[var(--bg-accent)] p-1 rounded-xl flex-shrink-0">
        <button
            onClick={() => setActiveTab('tabTools')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'tabTools'
                ? 'bg-white dark:bg-gray-800 text-[var(--accent-color)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
        >
            {t('tabTools')}
        </button>
        <button
            onClick={() => setActiveTab('tabNotification')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'tabNotification'
                ? 'bg-white dark:bg-gray-800 text-red-600 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
        >
            {t('tabNotification')}
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {activeTab === 'tabNotification' ? (
            <NotificationTab />
        ) : (
            <div className="space-y-4">
                <details className="group" open>
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabFilters')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                        <FilterControls onSelectFilter={props.onApplyFilter} isDisabled={props.isDisabled} onFilterHoverStart={props.onFilterHoverStart} onFilterHoverEnd={props.onFilterHoverEnd} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabVirtualTryOn')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <FashionControls
                            onSelectItem={props.onApplyFashionItem}
                            appliedItems={props.appliedFashionItems}
                            onResetFashion={props.onResetFashion}
                            isDisabled={props.isDisabled}
                            detectedClothing={props.detectedClothing}
                            isDetecting={props.isDetecting}
                            customFashionItems={props.customFashionItems}
                        />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabHairAndMakeup')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <HairAndMakeupControls
                            onApplyHairStyle={props.onApplyHairStyle}
                            onApplyMakeupLook={props.onApplyMakeupLook}
                            appliedHairStyle={props.appliedHairStyle}
                            appliedMakeupLook={props.appliedMakeupLook}
                            onResetHairAndMakeup={props.onResetHairAndMakeup}
                            isDisabled={props.isDisabled}
                            onApplyFaceRetouch={props.onApplyFaceRetouch}
                            appliedFaceRetouch={props.appliedFaceRetouch}
                        />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabStylist')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <StylistControls
                            onApplyStyle={props.onApplyStyle}
                            appliedStyle={props.appliedStyle}
                            onResetStylist={props.onResetStylist}
                            isDisabled={props.isDisabled}
                            onApplyBodyShapeStyle={props.onApplyBodyShapeStyle}
                            appliedBodyShapeStyle={props.appliedBodyShapeStyle}
                        />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabFaceSwap')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <FaceSwapControls 
                        onApplyFaceSwap={props.onApplyFaceSwap}
                        onResetFaceSwap={props.onResetFaceSwap}
                        isDisabled={props.isDisabled}
                        appliedFaceSwapImage={props.appliedFaceSwapImage}
                    />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabBackground')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <BackgroundControls
                        onApplyBackground={props.onApplyBackground}
                        appliedBackground={props.appliedBackground}
                        onResetBackground={props.onResetBackground}
                        isDisabled={props.isDisabled}
                    />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabBackgroundRemoval')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                        <BackgroundRemovalControls onRemoveBackground={props.onRemoveBackground} isDisabled={props.isDisabled} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabExtractClothing')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <ExtractClothingControls onManualExtract={props.onExtractClothing} onAutoExtract={props.onAutoExtractClothing} isDisabled={props.isDisabled} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabModelGenerator')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <ModelGeneratorControls onGenerate={props.onGenerateModelImage} isDisabled={props.isDisabled} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabPerspectiveGenerator')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <PerspectiveGeneratorControls onGenerate={props.onGeneratePerspectiveImage} isDisabled={props.isDisabled} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabImageGenerator')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                        <ImageGeneratorControls onGenerate={props.onGenerateImage} isDisabled={props.isDisabled} />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabJapaneseText')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <JapaneseTextControls
                        onApplyTextStyle={props.onApplyJapaneseTextStyle}
                        appliedTextStyle={props.appliedJapaneseTextStyle}
                        onResetTextStyle={props.onResetJapaneseText}
                        isDisabled={props.isDisabled}
                    />
                    </div>
                </details>
                <details className="group">
                    <summary className="flex justify-between items-center p-3 rounded-xl cursor-pointer list-none bg-[var(--bg-accent)] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('tabAdjust')}</h4>
                        <ChevronIcon />
                    </summary>
                    <div className="pt-4">
                    <AdjustmentControls onApply={props.onApplyAdjustments} isDisabled={props.isDisabled} />
                    </div>
                </details>
            </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { UploadIcon } from './icons/UploadIcon';
import ImageAnnotation from './ImageAnnotation';

interface ExtractClothingControlsProps {
  onManualExtract: (image: File, selection: { x: number; y: number; width: number; height: number; }) => void;
  onAutoExtract: (image: File, clothingType: string) => void;
  isDisabled: boolean;
}

const ExtractClothingControls: React.FC<ExtractClothingControlsProps> = ({ onManualExtract, onAutoExtract, isDisabled }) => {
  const { t } = useTranslation();
  const [outfitImage, setOutfitImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ x: number; y: number; width: number; height: number; } | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number; } | null>(null);

  useEffect(() => {
    // Clean up object URL when component unmounts or image changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOutfitImage(file);
      setSelection(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImagePreview(url);
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleManualExtractClick = () => {
    if (outfitImage && selection) {
      onManualExtract(outfitImage, selection);
    }
  };
  
  const handleAutoExtractClick = (clothingType: string) => {
    if (outfitImage) {
        onAutoExtract(outfitImage, clothingType);
    }
  };

  const handleResetSelection = () => {
    setSelection(null);
  };

  const ChevronIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const ActionButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
        {children}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t('extractClothingTitle')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('extractClothingDescription')}</p>
      </div>
      
      {!outfitImage && (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">{t('uploadOutfitImage')}</label>
            <label htmlFor="outfit-uploader" className="cursor-pointer">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md hover:border-violet-500 dark:hover:border-violet-400">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <span className="relative rounded-md font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500">
                      <span>{t('uploadOutfitHint')}</span>
                      <input id="outfit-uploader" name="outfit-uploader" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{t('uploadOutfitMaxSize')}</p>
                </div>
              </div>
            </label>
        </div>
      )}

      {outfitImage && imagePreview && imageDimensions && (
        <div className="space-y-4">
            <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Outfit preview" className="w-full h-full object-contain" />
            </div>

            <details className="group space-y-3" open>
                <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer list-none bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('autoExtract')}</h4>
                    <ChevronIcon />
                </summary>
                <p className="text-sm text-gray-600 dark:text-gray-400 px-3">{t('autoExtractDescription')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-3 pb-3">
                    <ActionButton onClick={() => handleAutoExtractClick('Top')} disabled={isDisabled}>
                        {t('clothingTypeTop')}
                    </ActionButton>
                    <ActionButton onClick={() => handleAutoExtractClick('Pants')} disabled={isDisabled}>
                        {t('clothingTypePants')}
                    </ActionButton>
                     <ActionButton onClick={() => handleAutoExtractClick('Dress')} disabled={isDisabled}>
                        {t('clothingTypeDress')}
                    </ActionButton>
                    <ActionButton onClick={() => handleAutoExtractClick('Jacket')} disabled={isDisabled}>
                        {t('clothingTypeJacket')}
                    </ActionButton>
                    <ActionButton onClick={() => handleAutoExtractClick('Skirt')} disabled={isDisabled}>
                        {t('clothingTypeSkirt')}
                    </ActionButton>
                    <ActionButton onClick={() => handleAutoExtractClick('Shoes')} disabled={isDisabled}>
                        {t('clothingTypeShoes')}
                    </ActionButton>
                    <ActionButton onClick={() => handleAutoExtractClick('Suit')} disabled={isDisabled}>
                        {t('clothingTypeSuit')}
                    </ActionButton>
                </div>
            </details>

            <details className="group space-y-3">
                <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer list-none bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('manualExtract')}</h4>
                    <ChevronIcon />
                </summary>
                <div className="px-3 pb-3 space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('manualExtractDescription')}</p>
                    <ImageAnnotation 
                        src={imagePreview}
                        dimensions={imageDimensions}
                        onSelectionChange={setSelection}
                        selection={selection}
                        disabled={isDisabled}
                    />
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleManualExtractClick}
                            disabled={!selection || isDisabled}
                            className="flex-1 w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {t('extractButton')}
                        </button>
                        <button
                            onClick={handleResetSelection}
                            disabled={!selection || isDisabled}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                        >
                            {t('resetSelection')}
                        </button>
                    </div>
                </div>
            </details>
        </div>
      )}
    </div>
  );
};

export default ExtractClothingControls;
import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SaveIcon } from './icons/SaveIcon';
import { UndoIcon } from './icons/UndoIcon';
import { RedoIcon } from './icons/RedoIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ImageViewerProps {
  srcs: string[] | null;
  isLoading: boolean;
  loadingMessage: string;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isPreviewing?: boolean;
  isPreviewLoading?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ 
  srcs, 
  isLoading, 
  loadingMessage, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  isPreviewing,
  isPreviewLoading
}) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Reset to the first image whenever the source array changes
    setSelectedIndex(0);
  }, [srcs]);
  
  const currentSrc = srcs?.[selectedIndex] || null;

  const handleSave = () => {
    if (!currentSrc) return;
    const link = document.createElement('a');
    link.href = currentSrc;
    link.download = `edited-image-${selectedIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {currentSrc && (
          <img src={currentSrc} alt={`${t('altUserUpload')} ${selectedIndex + 1}`} className="w-full h-full object-contain" />
        )}
        {!currentSrc && !isLoading && (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">{t('resultsHere')}</p>
            </div>
        )}
        {currentSrc && !isLoading && (
           <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                  onClick={onUndo}
                  disabled={!canUndo || isPreviewing || isPreviewLoading}
                  className="bg-white/80 dark:bg-gray-900/80 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-violet-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('undo')}
                  title={t('undo')}
              >
                  <UndoIcon className="w-6 h-6" />
              </button>
              <button
                  onClick={onRedo}
                  disabled={!canRedo || isPreviewing || isPreviewLoading}
                  className="bg-white/80 dark:bg-gray-900/80 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-violet-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={t('redo')}
                  title={t('redo')}
              >
                  <RedoIcon className="w-6 h-6" />
              </button>
              <button
                onClick={handleSave}
                disabled={isPreviewing || isPreviewLoading}
                className="bg-white/80 dark:bg-gray-900/80 p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-violet-500 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={t('saveImage')}
                title={t('saveImage')}
              >
                <SaveIcon className="w-6 h-6" />
              </button>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300 z-20">
            <SpinnerIcon className="w-16 h-16 text-white" />
            <p className="mt-4 text-white text-lg font-semibold">{loadingMessage}</p>
          </div>
        )}
        {isPreviewLoading && !isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-10">
            <SpinnerIcon className="w-12 h-12 text-white" />
          </div>
        )}
        {isPreviewing && !isPreviewLoading && !isLoading && (
          <div className="absolute top-4 left-4 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
            {t('previewMode')}
          </div>
        )}
      </div>
      {srcs && srcs.length > 1 && (
        <div className="flex justify-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-inner">
          {srcs.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden focus:outline-none transition-all duration-200 ${
                index === selectedIndex
                  ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={src} alt={`Result ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { UploadIcon } from './icons/UploadIcon';

interface FaceSwapControlsProps {
  onApplyFaceSwap: (faceFile: File) => void;
  onResetFaceSwap: () => void;
  isDisabled: boolean;
  appliedFaceSwapImage: string | null;
}

const FaceSwapControls: React.FC<FaceSwapControlsProps> = ({ onApplyFaceSwap, onResetFaceSwap, isDisabled, appliedFaceSwapImage }) => {
  const { t } = useTranslation();
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFaceImage(file);
      setFacePreview(URL.createObjectURL(file));
    }
  };
  
  const handleApplyClick = () => {
    if (faceImage) {
      onApplyFaceSwap(faceImage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('faceSwapTitle')}</h3>
        {appliedFaceSwapImage && (
            <button
                onClick={onResetFaceSwap}
                disabled={isDisabled}
                className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {t('clearFaceSwap')}
            </button>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{t('faceSwapDescription')}</p>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">{t('uploadFaceImage')}</label>
        <label htmlFor="face-swap-uploader" className={`cursor-pointer block w-full h-32 border-2 border-dashed rounded-md flex items-center justify-center text-center ${facePreview ? '' : 'p-4'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-violet-500'}`}>
          {facePreview ? (
            <img src={facePreview} alt="Face Preview" className="h-full w-full object-contain rounded-md p-1" />
          ) : (
            <div className="space-y-1">
              <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="text-xs text-gray-500">{t('uploadHint')}</p>
            </div>
          )}
        </label>
        <input id="face-swap-uploader" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isDisabled} />
      </div>

      <button
        onClick={handleApplyClick}
        disabled={!faceImage || isDisabled}
        className="w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {t('applyFaceSwap')}
      </button>

      {appliedFaceSwapImage && (
        <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-2">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('appliedFace')}:</h4>
            <div className="w-16 h-16 rounded-md overflow-hidden mx-auto">
                <img src={appliedFaceSwapImage} alt="Applied Face" className="w-full h-full object-cover" />
            </div>
        </div>
      )}

    </div>
  );
};

export default FaceSwapControls;

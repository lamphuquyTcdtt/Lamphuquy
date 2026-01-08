import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface BackgroundRemovalControlsProps {
  onRemoveBackground: () => void;
  isDisabled: boolean;
}

const BackgroundRemovalControls: React.FC<BackgroundRemovalControlsProps> = ({ onRemoveBackground, isDisabled }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{t('backgroundRemovalTitle')}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('backgroundRemovalDescription')}
      </p>
      <button
        onClick={onRemoveBackground}
        disabled={isDisabled}
        className="w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {t('removeBackgroundButton')}
      </button>
    </div>
  );
};

export default BackgroundRemovalControls;

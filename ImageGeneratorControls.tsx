import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface ImageGeneratorControlsProps {
  onGenerate: (prompt: string, count: number, aspectRatio: string) => void;
  isDisabled: boolean;
}

const ImageGeneratorControls: React.FC<ImageGeneratorControlsProps> = ({ onGenerate, isDisabled }) => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  const handleGenerateClick = () => {
    if (prompt) {
      onGenerate(prompt, imageCount, aspectRatio);
    }
  };

  const aspectRatios = ['1:1', '9:16', '16:9', '3:4', '4:3'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t('imageGeneratorTitle')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('imageGeneratorDescription')}</p>
      </div>

      <div>
        <label htmlFor="image-prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('imageGeneratorPrompt')}</label>
        <textarea
          id="image-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t('promptPlaceholderImageGen')}
          rows={4}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
          disabled={isDisabled}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="image-count" className="text-sm font-medium text-gray-700 dark:text-gray-300 block">{t('numberOfImages')}: <span className="font-bold">{imageCount}</span></label>
        <input
          id="image-count"
          type="range"
          min="1"
          max="4"
          step="1"
          value={imageCount}
          onChange={(e) => setImageCount(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:bg-violet-500"
          disabled={isDisabled}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('aspectRatio')}</label>
        <div className="flex flex-wrap gap-2">
            {aspectRatios.map(ratio => (
                 <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    disabled={isDisabled}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-violet-500 disabled:opacity-50 ${
                        aspectRatio === ratio
                        ? 'bg-violet-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {ratio}
                </button>
            ))}
        </div>
      </div>
      
      <button
        onClick={handleGenerateClick}
        disabled={!prompt || isDisabled}
        className="w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {t('generateButton')}
      </button>
    </div>
  );
};

export default ImageGeneratorControls;
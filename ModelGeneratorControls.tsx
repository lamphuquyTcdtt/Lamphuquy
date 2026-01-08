import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { UploadIcon } from './icons/UploadIcon';

interface ModelGeneratorControlsProps {
  onGenerate: (modelImg: File, clothingImg: File, backgroundImg: File, prompt: string, aspectRatio: string) => void;
  isDisabled: boolean;
}

const ImageUploader: React.FC<{ id: string; label: string; onFileSelect: (file: File) => void; disabled: boolean }> = ({ id, label, onFileSelect, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{label}</label>
      <label htmlFor={id} className={`cursor-pointer block w-full h-28 border-2 border-dashed rounded-md flex items-center justify-center text-center ${preview ? '' : 'p-4'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-violet-500'}`}>
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-md" />
        ) : (
          <div className="space-y-1">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-xs text-gray-500">{t('uploadHint')}</p>
          </div>
        )}
      </label>
      <input id={id} type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={disabled} />
    </div>
  );
};


const ModelGeneratorControls: React.FC<ModelGeneratorControlsProps> = ({ onGenerate, isDisabled }) => {
  const { t } = useTranslation();
  const [modelImg, setModelImg] = useState<File | null>(null);
  const [clothingImg, setClothingImg] = useState<File | null>(null);
  const [backgroundImg, setBackgroundImg] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  const handleGenerateClick = () => {
    if (modelImg && clothingImg && backgroundImg && prompt) {
      onGenerate(modelImg, clothingImg, backgroundImg, prompt, aspectRatio);
    }
  };

  const aspectRatios = ['1:1', '9:16', '16:9'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t('modelGeneratorTitle')}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('modelGeneratorDescription')}</p>
      </div>

      <div className="space-y-4">
        <ImageUploader id="model-img" label={t('uploadModelImage')} onFileSelect={setModelImg} disabled={isDisabled} />
        <ImageUploader id="clothing-img" label={t('uploadClothingImage')} onFileSelect={setClothingImg} disabled={isDisabled} />
        <ImageUploader id="background-img" label={t('uploadBackgroundImage')} onFileSelect={setBackgroundImg} disabled={isDisabled} />
      </div>

      <div>
        <label htmlFor="model-prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('enterPrompt')}</label>
        <textarea
          id="model-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t('promptPlaceholder')}
          rows={3}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
          disabled={isDisabled}
        />
      </div>

       <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('aspectRatio')}</label>
        <div className="flex gap-2">
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
        disabled={!modelImg || !clothingImg || !backgroundImg || !prompt || isDisabled}
        className="w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {t('generateButton')}
      </button>
    </div>
  );
};

export default ModelGeneratorControls;
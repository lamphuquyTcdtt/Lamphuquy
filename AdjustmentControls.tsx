

import React, { useState } from 'react';
import { AdjustmentSettings } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface AdjustmentControlsProps {
  onApply: (settings: AdjustmentSettings) => void;
  isDisabled: boolean;
}

const AdjustmentControls: React.FC<AdjustmentControlsProps> = ({ onApply, isDisabled }) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AdjustmentSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sharpness: 0,
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };
  
  const handleApply = () => {
    onApply(settings);
  };
  
  const resetDefaults = () => {
    setSettings({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        sharpness: 0,
    });
  };

  const Slider: React.FC<{name: keyof AdjustmentSettings, label: string, min?: number, max?: number}> = ({ name, label, min = 0, max = 200 }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <span className="text-sm text-gray-500 dark:text-gray-400">{settings[name]}%</span>
        </div>
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        value={settings[name]}
        onChange={handleSliderChange}
        disabled={isDisabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:bg-violet-500"
      />
    </div>
  );

  return (
    <div className="space-y-6">
        <h3 className="text-lg font-semibold">{t('adjustments')}</h3>
        <Slider name="brightness" label={t('brightness')} />
        <Slider name="contrast" label={t('contrast')} />
        <Slider name="saturation" label={t('saturation')} />
        <Slider name="sharpness" label={t('sharpness')} min={0} max={100} />

        <div className="flex items-center space-x-4 pt-4">
             <button
                onClick={handleApply}
                disabled={isDisabled}
                className="flex-1 w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
                {t('applyAdjustments')}
            </button>
            <button
                onClick={resetDefaults}
                disabled={isDisabled}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
            >
                {t('reset')}
            </button>
        </div>
    </div>
  );
};

export default AdjustmentControls;

import React, { useState, useEffect } from 'react';
import { HairStyle, MakeupLook, FaceRetouchSettings } from '../types';
import { HAIR_STYLES, MAKEUP_LOOKS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface HairAndMakeupControlsProps {
  onApplyHairStyle: (style: HairStyle) => void;
  onApplyMakeupLook: (look: MakeupLook) => void;
  isDisabled: boolean;
  appliedHairStyle: HairStyle | null;
  appliedMakeupLook: MakeupLook | null;
  onResetHairAndMakeup: () => void;
  onApplyFaceRetouch: (settings: FaceRetouchSettings) => void;
  appliedFaceRetouch: FaceRetouchSettings | null;
}

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, checked, onChange, disabled }) => (
  <label htmlFor={id} className="flex items-center justify-between cursor-pointer">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-violet-600"></div>
    </div>
  </label>
);

const HairAndMakeupControls: React.FC<HairAndMakeupControlsProps> = ({
  onApplyHairStyle,
  onApplyMakeupLook,
  isDisabled,
  appliedHairStyle,
  appliedMakeupLook,
  onResetHairAndMakeup,
  onApplyFaceRetouch,
  appliedFaceRetouch
}) => {
  const { t } = useTranslation();
  const initialRetouchState = { smoothSkin: false, whitenTeeth: false, enhanceEyes: false };
  const [retouchSettings, setRetouchSettings] = useState<FaceRetouchSettings>(initialRetouchState);

  useEffect(() => {
    setRetouchSettings(appliedFaceRetouch || initialRetouchState);
  }, [appliedFaceRetouch]);
  
  const handleRetouchChange = (option: keyof FaceRetouchSettings) => {
    setRetouchSettings(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleApplyClick = () => {
    onApplyFaceRetouch(retouchSettings);
  };

  const hasRetouchOptionsSelected = Object.values(retouchSettings).some(v => v);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('beautyTools')}</h3>
        {(appliedHairStyle || appliedMakeupLook || appliedFaceRetouch) && (
          <button
            onClick={onResetHairAndMakeup}
            disabled={isDisabled}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('clear')}
          </button>
        )}
      </div>

      {/* Face Retouch Section */}
      <div>
        <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('faceRetouch')}</h4>
        <div className="space-y-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
          <ToggleSwitch
            id="smoothSkin"
            label={t('smoothSkin')}
            checked={retouchSettings.smoothSkin}
            onChange={() => handleRetouchChange('smoothSkin')}
            disabled={isDisabled}
          />
          <ToggleSwitch
            id="whitenTeeth"
            label={t('whitenTeeth')}
            checked={retouchSettings.whitenTeeth}
            onChange={() => handleRetouchChange('whitenTeeth')}
            disabled={isDisabled}
          />
          <ToggleSwitch
            id="enhanceEyes"
            label={t('enhanceEyes')}
            checked={retouchSettings.enhanceEyes}
            onChange={() => handleRetouchChange('enhanceEyes')}
            disabled={isDisabled}
          />
          <button
            onClick={handleApplyClick}
            disabled={isDisabled || !hasRetouchOptionsSelected}
            className="w-full mt-2 bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-violet-500 disabled:bg-violet-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {t('applyRetouch')}
          </button>
        </div>
      </div>

      {/* Hairstyles Section */}
      <div>
        <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('hairstyles')}</h4>
        <div className="grid grid-cols-3 gap-3">
          {HAIR_STYLES.map((style) => {
            const isApplied = appliedHairStyle?.id === style.id;
            return (
              <button
                key={style.id}
                onClick={() => onApplyHairStyle(style)}
                disabled={isDisabled || isApplied}
                className="group relative aspect-square w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={style.imageUrl} alt={t(style.key)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-black flex items-end p-2 transition-all duration-300 ${isApplied ? 'bg-opacity-60' : 'bg-opacity-40 group-hover:bg-opacity-20'}`}>
                  <p className="text-white text-xs font-medium">{t(style.key)}</p>
                </div>
                 {isApplied && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Makeup Section */}
      <div>
        <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('makeupLooks')}</h4>
        <div className="grid grid-cols-3 gap-3">
          {MAKEUP_LOOKS.map((look) => {
            const isApplied = appliedMakeupLook?.id === look.id;
            return (
                <button
                key={look.id}
                onClick={() => onApplyMakeupLook(look)}
                disabled={isDisabled || isApplied}
                className="group relative aspect-square w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={look.imageUrl} alt={t(look.key)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-black flex items-end p-2 transition-all duration-300 ${isApplied ? 'bg-opacity-60' : 'bg-opacity-40 group-hover:bg-opacity-20'}`}>
                  <p className="text-white text-xs font-medium">{t(look.key)}</p>
                </div>
                 {isApplied && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default HairAndMakeupControls;

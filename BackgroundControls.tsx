
import React from 'react';
import { BackgroundTheme } from '../types';
import { BACKGROUND_THEMES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface BackgroundControlsProps {
  onApplyBackground: (theme: BackgroundTheme) => void;
  isDisabled: boolean;
  appliedBackground: BackgroundTheme | null;
  onResetBackground: () => void;
}

const BackgroundControls: React.FC<BackgroundControlsProps> = ({
  onApplyBackground,
  isDisabled,
  appliedBackground,
  onResetBackground,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('backgroundReplacement')}</h3>
        {appliedBackground && (
          <button
            onClick={onResetBackground}
            disabled={isDisabled}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('clearBackground')}
          </button>
        )}
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3">
          {BACKGROUND_THEMES.map((theme) => {
            const isApplied = appliedBackground?.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onApplyBackground(theme)}
                disabled={isDisabled || isApplied}
                className="group relative aspect-square w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={theme.imageUrl} alt={t(theme.key)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-black flex items-end p-2 transition-all duration-300 ${isApplied ? 'bg-opacity-60' : 'bg-opacity-40 group-hover:bg-opacity-20'}`}>
                  <p className="text-white text-xs font-medium">{t(theme.key)}</p>
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
    </div>
  );
};

export default BackgroundControls;

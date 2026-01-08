import React from 'react';
import { JapaneseTextStyle } from '../types';
import { JAPANESE_TEXT_STYLES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface JapaneseTextControlsProps {
  onApplyTextStyle: (style: JapaneseTextStyle) => void;
  isDisabled: boolean;
  appliedTextStyle: JapaneseTextStyle | null;
  onResetTextStyle: () => void;
}

const JapaneseTextControls: React.FC<JapaneseTextControlsProps> = ({
  onApplyTextStyle,
  isDisabled,
  appliedTextStyle,
  onResetTextStyle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('japaneseTextStyle')}</h3>
        {appliedTextStyle && (
          <button
            onClick={onResetTextStyle}
            disabled={isDisabled}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('clearTextStyle')}
          </button>
        )}
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3">
          {JAPANESE_TEXT_STYLES.map((style) => {
            const isApplied = appliedTextStyle?.key === style.key;
            return (
              <button
                key={style.key}
                onClick={() => onApplyTextStyle(style)}
                disabled={isDisabled || isApplied}
                className="group relative aspect-square w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={style.thumbnail} alt={t(style.key)} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
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
    </div>
  );
};

export default JapaneseTextControls;

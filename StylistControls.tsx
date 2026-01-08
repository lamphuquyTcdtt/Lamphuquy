
import React from 'react';
import { StyleLook, BodyShapeStyle } from '../types';
import { EVENT_STYLES, SEASONAL_STYLES, BODY_SHAPE_STYLES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface StylistControlsProps {
  onApplyStyle: (style: StyleLook) => void;
  isDisabled: boolean;
  appliedStyle: StyleLook | null;
  onResetStylist: () => void;
  onApplyBodyShapeStyle: (style: BodyShapeStyle) => void;
  appliedBodyShapeStyle: BodyShapeStyle | null;
}

const StylistControls: React.FC<StylistControlsProps> = ({
  onApplyStyle,
  isDisabled,
  appliedStyle,
  onResetStylist,
  onApplyBodyShapeStyle,
  appliedBodyShapeStyle,
}) => {
  const { t } = useTranslation();

  const StyleGrid: React.FC<{ styles: StyleLook[] }> = ({ styles }) => (
    <div className="grid grid-cols-3 gap-3 pt-4">
      {styles.map((style) => {
        const isApplied = appliedStyle?.id === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onApplyStyle(style)}
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
  );

  const BodyShapeStyleGrid: React.FC<{ styles: BodyShapeStyle[] }> = ({ styles }) => (
    <div className="grid grid-cols-3 gap-3 pt-4">
      {styles.map((style) => {
        const isApplied = appliedBodyShapeStyle?.id === style.id;
        return (
          <button
            key={style.id}
            onClick={() => onApplyBodyShapeStyle(style)}
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
  );
  
  const ChevronIcon = () => (
    <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('aiStylist')}</h3>
        {(appliedStyle || appliedBodyShapeStyle) && (
          <button
            onClick={onResetStylist}
            disabled={isDisabled}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('clearStylist')}
          </button>
        )}
      </div>

      <div className="space-y-2">
        <details className="group" open>
            <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer list-none bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('eventStyling')}</h4>
                <ChevronIcon />
            </summary>
            <StyleGrid styles={EVENT_STYLES} />
        </details>
        
        <details className="group">
            <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer list-none bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('seasonalFashion')}</h4>
                <ChevronIcon />
            </summary>
            <StyleGrid styles={SEASONAL_STYLES} />
        </details>
        
        <details className="group">
            <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer list-none bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{t('bodyShapeStyling')}</h4>
                <ChevronIcon />
            </summary>
            <BodyShapeStyleGrid styles={BODY_SHAPE_STYLES} />
        </details>
      </div>
    </div>
  );
};

export default StylistControls;

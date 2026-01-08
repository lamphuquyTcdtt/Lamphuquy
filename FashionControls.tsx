import React, { useMemo, useState } from 'react';
import { FashionItem, DetectedItem, AppliedFashionItem, Color } from '../types';
import { FASHION_ITEMS } from '../constants';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { useTranslation } from '../hooks/useTranslation';
import { DownloadIcon } from './icons/DownloadIcon';

interface FashionControlsProps {
  onSelectItem: (item: FashionItem, color: Color) => void;
  isDisabled: boolean;
  appliedItems: AppliedFashionItem[];
  onResetFashion: () => void;
  detectedClothing: DetectedItem[] | null;
  isDetecting: boolean;
  customFashionItems: FashionItem[];
}

const FashionControls: React.FC<FashionControlsProps> = ({ 
  onSelectItem, 
  isDisabled, 
  appliedItems, 
  onResetFashion, 
  detectedClothing, 
  isDetecting,
  customFashionItems
}) => {
  const { t } = useTranslation();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleItemClick = (item: FashionItem) => {
    if (item.colors && item.colors.length > 0) {
      setSelectedItemId(prevId => (prevId === item.id ? null : item.id));
    } else {
      onSelectItem(item, { name: '', hex: '' });
    }
  };

  const handleColorSelect = (item: FashionItem, color: Color) => {
    onSelectItem(item, color);
    setSelectedItemId(null);
  };

  const isApplied = (item: FashionItem) => {
    return appliedItems.some(applied => applied.item.id === item.id);
  };

  const getAppliedColor = (item: FashionItem): Color | undefined => {
    return appliedItems.find(applied => applied.item.id === item.id)?.color;
  };

  const handleDownload = (imageUrl: string, index: number) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `extracted-item-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categorizedItems = useMemo(() => {
    const categoryMap: Record<FashionItem['type'], string> = {
      'T-Shirt': 'Tops',
      'Jacket': 'Tops',
      'Blouse': 'Tops',
      'Sweater': 'Tops',
      'Coat': 'Tops',
      'Suit': 'Suits',
      'Dress': 'Dresses',
      'Pants': 'Pants',
      'Shorts': 'Pants',
      'Skirt': 'Skirts',
      'Shoes': 'Shoes',
      'Boots': 'Shoes',
      'Hat': 'Hats',
      'Necklace': 'Necklaces',
      'Accessory': 'Accessories',
    };
    
    const translationMap = {
      'Tops': 'categoryTops',
      'Suits': 'categorySuits',
      'Dresses': 'categoryDresses',
      'Pants': 'categoryPants',
      'Skirts': 'categorySkirts',
      'Shoes': 'categoryShoes',
      'Hats': 'categoryHats',
      'Necklaces': 'categoryNecklaces',
      'Accessories': 'categoryAccessories',
    };

    const categories = FASHION_ITEMS.reduce((acc, item) => {
      const categoryName = categoryMap[item.type];
      if (categoryName) {
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(item);
      }
      return acc;
    }, {} as { [key: string]: FashionItem[] });

    const categoryOrder = ['Tops', 'Suits', 'Dresses', 'Pants', 'Skirts', 'Shoes', 'Hats', 'Necklaces', 'Accessories'];

    return categoryOrder
      .filter(category => categories[category] && categories[category].length > 0)
      .map(category => ({
        category: t(translationMap[category]),
        items: categories[category],
      }));
  }, [t]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t('tabVirtualTryOn')}</h3>
        {appliedItems.length > 0 && (
          <button
            onClick={onResetFashion}
            disabled={isDisabled}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('clearFashion')}
          </button>
        )}
      </div>

      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
        <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('whatYoureWearing')}</h4>
        {isDetecting ? (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <SpinnerIcon className="w-4 h-4 mr-2" />
            <span>{t('analyzingOutfit')}</span>
          </div>
        ) : detectedClothing && detectedClothing.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {detectedClothing.map((item, index) => (
              <div key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
                {item.description}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('detectionFailed')}</p>
        )}
      </div>

      {appliedItems.length > 0 && (
        <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('appliedItems')}:</h4>
          <div className="flex flex-wrap gap-2">
            {appliedItems.map(({ item, color }, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200 text-xs font-medium pl-2 pr-3 py-1 rounded-full">
                 {color.hex && !item.isCustom && (
                  <span 
                    className="w-3 h-3 rounded-full mr-1.5 border border-gray-400/50"
                    style={{ backgroundColor: color.hex }}
                  ></span>
                )}
                {item.isCustom ? `${t(item.key)}` : t(item.key)}
              </div>
            ))}
          </div>
        </div>
      )}

      {customFashionItems.length > 0 && (
        <div>
          <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('yourItems')}</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {customFashionItems.map((item, index) => {
              const applied = isApplied(item);
              return (
                <div key={item.id} className="space-y-2">
                  <div
                    onClick={() => !isDisabled && handleItemClick(item)}
                    role="button"
                    tabIndex={isDisabled ? -1 : 0}
                    onKeyDown={(e) => { if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleItemClick(item); } }}
                    aria-pressed={applied}
                    aria-label={`${t('customItem')} ${index + 1}`}
                    className={`group/item flex flex-col items-center text-center w-full space-y-2 p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'}`}
                  >
                    <div className={`w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative ${applied ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : ''}`}>
                      <img src={item.imageUrl} alt={`${t('customItem')} ${index + 1}`} className="w-full h-full object-contain p-1" />
                      {applied && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      )}
                       <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(item.imageUrl, index);
                        }}
                        disabled={isDisabled}
                        className="absolute top-1 right-1 bg-white/70 dark:bg-gray-900/70 p-1.5 rounded-full text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 shadow-md opacity-0 group-hover/item:opacity-100 disabled:opacity-50"
                        aria-label={t('downloadItem')}
                        title={t('downloadItem')}
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{`${t('customItem')} ${index + 1}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {categorizedItems.map(({ category, items }) => (
        items.length > 0 && (
          <div key={category}>
            <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-200">{category}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item) => {
                const applied = isApplied(item);
                const appliedColor = getAppliedColor(item);
                const isSelectedForColorPicking = selectedItemId === item.id;
                return (
                  <div key={item.id} className="space-y-2">
                    <button
                      onClick={() => handleItemClick(item)}
                      disabled={isDisabled}
                      className="group flex flex-col items-center text-center w-full space-y-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-violet-500"
                    >
                      <div className={`w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative ${applied ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' : ''}`}>
                        <img src={item.imageUrl} alt={t(item.key)} className="w-full h-full object-cover" />
                        {applied && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{t(item.key)}</p>
                    </button>
                     {isSelectedForColorPicking && item.colors && (
                        <div className="flex justify-center items-center gap-2">
                            {item.colors.map(color => (
                                <button
                                    key={color.hex}
                                    onClick={() => handleColorSelect(item, color)}
                                    disabled={isDisabled}
                                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-violet-500
                                    ${appliedColor?.hex === color.hex ? 'ring-2 ring-violet-500' : 'border-transparent'}`}
                                    style={{ backgroundColor: color.hex, borderColor: color.hex === '#ffffff' ? '#e5e7eb' : 'transparent' }}
                                    aria-label={`Select color ${color.name}`}
                                    title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                                />
                            ))}
                        </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default FashionControls;
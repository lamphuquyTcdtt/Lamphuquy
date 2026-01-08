
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-secondary)]/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              {t('headerTitle')}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">
              {t('headerSubtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-center py-4 mt-auto border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('footerCopyright', { year: currentYear.toString() })}
      </p>
    </footer>
  );
};

export default Footer;

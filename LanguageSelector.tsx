
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'ja', name: '日本語' },
  { code: 'es', name: 'Español' },
];

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value);
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-violet-500"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;

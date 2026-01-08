import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 w-14 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-violet-500"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="sr-only">Toggle Theme</span>
      <span
        className={`${
          isDark ? 'translate-x-7' : 'translate-x-1'
        } inline-block h-6 w-6 transform rounded-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 flex items-center justify-center`}
      >
        {isDark ? (
          <SunIcon className="w-4 h-4 text-yellow-400" />
        ) : (
          <MoonIcon className="w-4 h-4 text-violet-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;

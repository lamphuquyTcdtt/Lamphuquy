
import React, { createContext, useState, useEffect, useCallback } from 'react';

// Define the shape of the context
interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

// Create the provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>(localStorage.getItem('locale') || 'en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}.json`);
        if (!response.ok) {
          throw new Error(`Could not load ${locale}.json`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to English if the selected locale fails
        if (locale !== 'en') {
          setLocaleState('en');
        }
      }
    };
    fetchTranslations();
  }, [locale]);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
  };

  const t = useCallback((key: string, replacements?: Record<string, string>): string => {
    let translation = translations[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        translation = translation.replace(`{{${rKey}}}`, replacements[rKey]);
      });
    }
    return translation;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

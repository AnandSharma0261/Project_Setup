import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिंदी'
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Check if we're in development mode (Vite way)
const isDevelopment = import.meta.env.MODE === 'development';

// Language detection options
const detectionOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  caches: ['localStorage'],
  lookupLocalStorage: 'i18nextLng',
  checkWhitelist: true,
};

// i18n configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
      }
    },
    
    // Language detection
    detection: detectionOptions,
    
    // Fallback language
    fallbackLng: DEFAULT_LANGUAGE,
    
    // Supported languages
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    
    // Namespace
    defaultNS: 'translation',
    
    // Debugging (disable in production)
    debug: isDevelopment,
    
    // Key separator
    keySeparator: '.',
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false, // Disable suspense for better control
    },
    
    // Missing key handling
    saveMissing: isDevelopment,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      if (isDevelopment) {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },
  });

export default i18n;
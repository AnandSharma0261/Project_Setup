import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { TEXT_CONSTANTS, type TextConstantKey } from '../constants/textConstants';
import { type SupportedLanguage } from '../i18n/config';

/**
 * Custom hook for type-safe translations with additional utilities
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nextTranslation();

  /**
   * Type-safe translation function
   * @param key - Translation key from TEXT_CONSTANTS
   * @param options - Translation options (interpolation, etc.)
   * @returns Translated string
   */
  const translate = (key: TextConstantKey, options?: any): string => {
    return t(key, options) as string;
  };

  /**
   * Get current language
   * @returns Current language code
   */
  const getCurrentLanguage = (): SupportedLanguage => {
    return i18n.language as SupportedLanguage;
  };

  /**
   * Change language
   * @param language - Language code to switch to
   */
  const changeLanguage = (language: SupportedLanguage): Promise<any> => {
    return i18n.changeLanguage(language);
  };

  /**
   * Check if a language is currently active
   * @param language - Language code to check
   * @returns Boolean indicating if language is active
   */
  const isLanguageActive = (language: SupportedLanguage): boolean => {
    return i18n.language === language;
  };

  /**
   * Get translation with fallback
   * @param key - Translation key
   * @param fallback - Fallback text if translation not found
   * @param options - Translation options
   * @returns Translated string or fallback
   */
  const translateWithFallback = (
    key: TextConstantKey, 
    fallback: string, 
    options?: any
  ): string => {
    const translation = t(key, options);
    return translation === key ? fallback : (translation as string);
  };

  /**
   * Format date according to current locale
   * @param date - Date to format
   * @param options - Intl.DateTimeFormat options
   * @returns Formatted date string
   */
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    const locale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  /**
   * Format number according to current locale
   * @param number - Number to format
   * @param options - Intl.NumberFormat options
   * @returns Formatted number string
   */
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    const locale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(number);
  };

  /**
   * Get text direction for current language
   * @returns 'ltr' or 'rtl'
   */
  const getTextDirection = (): 'ltr' | 'rtl' => {
    // Hindi is LTR, but keeping this for future RTL language support
    return 'ltr';
  };

  return {
    // Standard i18next functions
    t,
    i18n,
    
    // Custom utilities
    translate,
    getCurrentLanguage,
    changeLanguage,
    isLanguageActive,
    translateWithFallback,
    formatDate,
    formatNumber,
    getTextDirection,
    
    // Constants for easy access
    TEXT_CONSTANTS,
  };
};

/**
 * Simple formatting utilities that can be used without the hook
 * Useful for components that need basic formatting
 */
export const formatUtils = {
  /**
   * Format number with locale
   */
  formatNumber: (number: number, locale: string = 'en-US', options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(locale, options).format(number);
  },

  /**
   * Format date with locale
   */
  formatDate: (date: Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  },

  /**
   * Get locale string from language code
   */
  getLocale: (language: string): string => {
    return language === 'hi' ? 'hi-IN' : 'en-US';
  }
};

export default useTranslation;
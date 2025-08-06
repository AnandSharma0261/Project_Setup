import React from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n/config';
import { TEXT_CONSTANTS } from '../../constants/textConstants';

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'dropdown' | 'buttons';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showLabel = true,
  variant = 'dropdown'
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language as SupportedLanguage;

  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showLabel && (
          <span className="text-sm text-gray-600 mr-2">
            {t(TEXT_CONSTANTS.LANGUAGE.SELECT_LANGUAGE)}:
          </span>
        )}
        <div className="flex space-x-1">
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                currentLanguage === code
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Switch to ${name}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <label htmlFor="language-select" className="text-sm text-gray-600">
          {t(TEXT_CONSTANTS.LANGUAGE.SELECT_LANGUAGE)}:
        </label>
      )}
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label={t(TEXT_CONSTANTS.LANGUAGE.CHANGE_LANGUAGE)}
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
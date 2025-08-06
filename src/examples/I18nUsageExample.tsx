import React from 'react';
import { useTranslation } from 'react-i18next';
import { TEXT_CONSTANTS } from '../constants/textConstants';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

/**
 * Example component demonstrating proper i18n usage throughout the application
 * This serves as a reference for developers on how to implement translations
 */
const I18nUsageExample: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // Helper functions for formatting
  const formatNumber = (num: number): string => {
    const locale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    return num.toLocaleString(locale);
  };
  
  const formatDate = (date: Date): string => {
    const locale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getCurrentLanguage = (): string => {
    return i18n.language;
  };

  // Example data with translations
  const statsData = [
    {
      title: t(TEXT_CONSTANTS.USERS.TOTAL_USERS),
      value: 1250,
      color: 'teal' as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: t(TEXT_CONSTANTS.USERS.TOTAL_AUDITORS),
      value: 45,
      color: 'purple' as const,
      trend: { value: 8, isPositive: true }
    }
  ];

  const filterOptions = [
    { value: 'all', label: t(TEXT_CONSTANTS.FILTERS.ALL) },
    { value: 'today', label: t(TEXT_CONSTANTS.FILTERS.TODAY) },
    { value: 'week', label: t(TEXT_CONSTANTS.FILTERS.THIS_WEEK) },
    { value: 'month', label: t(TEXT_CONSTANTS.FILTERS.THIS_MONTH) }
  ];

  const ringData = [
    { value: 85, color: '#10B981', label: t(TEXT_CONSTANTS.PROGRESS_CHART.SALES) },
    { value: 70, color: '#F59E0B', label: t(TEXT_CONSTANTS.PROGRESS_CHART.MARKETING) },
    { value: 60, color: '#EF4444', label: t(TEXT_CONSTANTS.PROGRESS_CHART.REVENUE) }
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {t(TEXT_CONSTANTS.PAGE_TITLES.DASHBOARD)}
          </h1>
          <LanguageSwitcher variant="dropdown" showLabel={true} />
        </div>
        
        <p className="text-gray-600">
          {t(TEXT_CONSTANTS.MESSAGES.WELCOME_MESSAGE)}
        </p>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Current Language: {getCurrentLanguage()}</p>
          <p>Formatted Date: {formatDate(new Date())}</p>
          <p>Formatted Number: {formatNumber(123456.789)}</p>
        </div>
      </div>

      {/* Language Switcher Variants */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.LANGUAGE.CHANGE_LANGUAGE)}
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Dropdown Variant:</h3>
            <LanguageSwitcher variant="dropdown" showLabel={true} />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Button Variant:</h3>
            <LanguageSwitcher variant="buttons" showLabel={true} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.DASHBOARD.STATS)}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.COMMON.FILTER)}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(TEXT_CONSTANTS.FILTERS.DATE_RANGE)}
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>{t(TEXT_CONSTANTS.FILTERS.ALL)}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(TEXT_CONSTANTS.FILTERS.STATUS)}
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="active">{t(TEXT_CONSTANTS.STATUS.ACTIVE)}</option>
              <option value="inactive">{t(TEXT_CONSTANTS.STATUS.INACTIVE)}</option>
              <option value="pending">{t(TEXT_CONSTANTS.AUDIT.PENDING)}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t(TEXT_CONSTANTS.FILTERS.TYPE)}
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="audit">{t(TEXT_CONSTANTS.AUDIT.TITLE)}</option>
              <option value="review">{t(TEXT_CONSTANTS.AUDIT.REVIEWED)}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.DASHBOARD.ANALYTICS)}
        </h2>
        
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50</div>
              <div className="text-sm text-gray-600">{t(TEXT_CONSTANTS.PROGRESS_CHART.TOTAL)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.FORMS.FORM_SUBMITTED)}
        </h2>
        
        <div className="space-y-4 max-w-md">
          <Input
            label={t(TEXT_CONSTANTS.FORM_LABELS.EMAIL_ADDRESS)}
            type="email"
            placeholder={t(TEXT_CONSTANTS.AUTH.ENTER_EMAIL)}
          />
          
          <Input
            label={t(TEXT_CONSTANTS.FORM_LABELS.PASSWORD)}
            type="password"
            placeholder={t(TEXT_CONSTANTS.AUTH.ENTER_PASSWORD)}
          />
          
          <div className="flex space-x-4">
            <Button type="submit">
              {t(TEXT_CONSTANTS.COMMON.SUBMIT)}
            </Button>
            
            <Button variant="secondary">
              {t(TEXT_CONSTANTS.COMMON.CANCEL)}
            </Button>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.MESSAGES.SUCCESS_MESSAGE)}
        </h2>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>{t(TEXT_CONSTANTS.STATUS.ACTIVE)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span>{t(TEXT_CONSTANTS.STATUS.UNDER_REVIEW)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>{t(TEXT_CONSTANTS.STATUS.REJECTED)}</span>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(TEXT_CONSTANTS.VALIDATION.EMAIL_INVALID)}
        </h2>
        
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="space-y-1">
            <p className="text-red-800">{t(TEXT_CONSTANTS.VALIDATION.FIELD_REQUIRED)}</p>
            <p className="text-red-800">{t(TEXT_CONSTANTS.VALIDATION.PASSWORD_TOO_SHORT)}</p>
            <p className="text-red-800">{t(TEXT_CONSTANTS.VALIDATION.PASSWORDS_DONT_MATCH)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-600 text-sm">
          <p>{t(TEXT_CONSTANTS.FOOTER.COPYRIGHT, { year: new Date().getFullYear() })}</p>
          <p>{t(TEXT_CONSTANTS.FOOTER.ALL_RIGHTS_RESERVED)}</p>
        </div>
      </div>
    </div>
  );
};

export default I18nUsageExample;
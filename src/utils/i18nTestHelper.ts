import i18n from '../i18n/config';
import { TEXT_CONSTANTS } from '../constants/textConstants';

/**
 * Helper utilities for testing i18n implementation
 */

/**
 * Test if all translation keys exist in both languages
 */
export const validateTranslations = () => {
  const results = {
    missing: {
      en: [] as string[],
      hi: [] as string[]
    },
    success: true
  };

  // Get all translation keys from constants
  const allKeys: string[] = [];
  
  const extractKeys = (obj: any, prefix = ''): void => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        allKeys.push(value);
      } else if (typeof value === 'object' && value !== null) {
        extractKeys(value, prefix ? `${prefix}.${key}` : key);
      }
    });
  };

  extractKeys(TEXT_CONSTANTS);

  // Check each key exists in both languages
  allKeys.forEach(key => {
    // Check English
    if (!i18n.exists(key, { lng: 'en' })) {
      results.missing.en.push(key);
      results.success = false;
    }
    
    // Check Hindi
    if (!i18n.exists(key, { lng: 'hi' })) {
      results.missing.hi.push(key);
      results.success = false;
    }
  });

  return results;
};

/**
 * Get all available translation keys
 */
export const getAllTranslationKeys = (): string[] => {
  const allKeys: string[] = [];
  
  const extractKeys = (obj: any): void => {
    Object.entries(obj).forEach(([, value]) => {
      if (typeof value === 'string') {
        allKeys.push(value);
      } else if (typeof value === 'object' && value !== null) {
        extractKeys(value);
      }
    });
  };

  extractKeys(TEXT_CONSTANTS);
  return allKeys.sort();
};

/**
 * Test translation interpolation
 */
export const testInterpolation = () => {
  const testCases = [
    {
      key: 'footer.copyright',
      params: { year: 2024 },
      expectedEn: '© 2024 TVS Motor Company',
      expectedHi: '© 2024 TVS मोटर कंपनी'
    },
    {
      key: 'forms.minLength',
      params: { count: 8 },
      expectedEn: 'Minimum 8 characters required',
      expectedHi: 'न्यूनतम 8 अक्षर आवश्यक'
    }
  ];

  const results = testCases.map(testCase => {
    const enResult = i18n.t(testCase.key, { ...testCase.params, lng: 'en' });
    const hiResult = i18n.t(testCase.key, { ...testCase.params, lng: 'hi' });
    
    return {
      key: testCase.key,
      params: testCase.params,
      results: {
        en: {
          actual: enResult,
          expected: testCase.expectedEn,
          match: enResult === testCase.expectedEn
        },
        hi: {
          actual: hiResult,
          expected: testCase.expectedHi,
          match: hiResult === testCase.expectedHi
        }
      }
    };
  });

  return results;
};

/**
 * Generate translation coverage report
 */
export const generateCoverageReport = () => {
  const validation = validateTranslations();
  const allKeys = getAllTranslationKeys();
  const interpolationTests = testInterpolation();

  const report = {
    summary: {
      totalKeys: allKeys.length,
      englishMissing: validation.missing.en.length,
      hindiMissing: validation.missing.hi.length,
      coveragePercentage: {
        en: ((allKeys.length - validation.missing.en.length) / allKeys.length) * 100,
        hi: ((allKeys.length - validation.missing.hi.length) / allKeys.length) * 100
      }
    },
    validation,
    interpolationTests,
    recommendations: [] as string[]
  };

  // Add recommendations
  if (validation.missing.en.length > 0) {
    report.recommendations.push(`Add missing English translations: ${validation.missing.en.join(', ')}`);
  }
  
  if (validation.missing.hi.length > 0) {
    report.recommendations.push(`Add missing Hindi translations: ${validation.missing.hi.join(', ')}`);
  }

  const failedInterpolation = interpolationTests.filter(test => 
    !test.results.en.match || !test.results.hi.match
  );
  
  if (failedInterpolation.length > 0) {
    report.recommendations.push(`Fix interpolation for keys: ${failedInterpolation.map(t => t.key).join(', ')}`);
  }

  return report;
};

/**
 * Console logger for translation testing
 */
export const logTranslationReport = () => {
  const report = generateCoverageReport();
  
  console.group('🌐 i18n Translation Report');
  
  console.log('📊 Summary:');
  console.table(report.summary);
  
  if (report.validation.missing.en.length > 0) {
    console.warn('❌ Missing English translations:', report.validation.missing.en);
  }
  
  if (report.validation.missing.hi.length > 0) {
    console.warn('❌ Missing Hindi translations:', report.validation.missing.hi);
  }
  
  console.log('🧪 Interpolation Tests:');
  report.interpolationTests.forEach(test => {
    console.group(`Key: ${test.key}`);
    console.log('EN:', test.results.en.match ? '✅' : '❌', test.results.en.actual);
    console.log('HI:', test.results.hi.match ? '✅' : '❌', test.results.hi.actual);
    console.groupEnd();
  });
  
  if (report.recommendations.length > 0) {
    console.warn('💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.warn(`${index + 1}. ${rec}`);
    });
  }
  
  console.groupEnd();
  
  return report;
};

/**
 * Quick test function to verify i18n setup
 */
export const quickI18nTest = () => {
  console.group('🚀 Quick i18n Test');
  
  try {
    // Test basic translation
    const enHome = i18n.t('navigation.home', { lng: 'en' });
    const hiHome = i18n.t('navigation.home', { lng: 'hi' });
    
    console.log('✅ Basic Translation:', { en: enHome, hi: hiHome });
    
    // Test interpolation
    const enCopyright = i18n.t('footer.copyright', { year: 2024, lng: 'en' });
    const hiCopyright = i18n.t('footer.copyright', { year: 2024, lng: 'hi' });
    
    console.log('✅ Interpolation:', { en: enCopyright, hi: hiCopyright });
    
    // Test current language
    console.log('✅ Current Language:', i18n.language);
    
    // Test language switching
    const originalLang = i18n.language;
    i18n.changeLanguage('hi');
    console.log('✅ Switched to Hindi:', i18n.t('navigation.home'));
    i18n.changeLanguage(originalLang);
    
    console.log('🎉 All tests passed!');
    
  } catch (error) {
    console.error('❌ i18n Test Failed:', error);
  }
  
  console.groupEnd();
};

// Export for use in development
if (import.meta.env.MODE === 'development') {
  (window as any).i18nTestHelper = {
    validateTranslations,
    getAllTranslationKeys,
    generateCoverageReport,
    logTranslationReport,
    quickI18nTest
  };
}
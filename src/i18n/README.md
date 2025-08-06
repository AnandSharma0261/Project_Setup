# Internationalization (i18n) Implementation

This project uses `react-i18next` for internationalization support with English and Hindi languages.

## Overview

- **Library**: react-i18next v15.6.1
- **Supported Languages**: English (en), Hindi (hi)
- **Default Language**: English
- **Storage**: Browser localStorage
- **Auto-detection**: Browser language, localStorage, HTML lang attribute

## Project Structure

```
src/
├── i18n/
│   ├── config.ts              # i18n configuration
│   ├── locales/
│   │   ├── en.json            # English translations
│   │   └── hi.json            # Hindi translations
│   └── README.md              # This file
├── constants/
│   └── textConstants.ts       # Translation key constants
├── hooks/
│   └── useTranslation.ts      # Custom translation hook
└── components/
    └── common/
        └── LanguageSwitcher.tsx # Language switching component
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';
import { TEXT_CONSTANTS } from '../constants/textConstants';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t(TEXT_CONSTANTS.NAVIGATION.HOME)}</h1>
      <p>{t(TEXT_CONSTANTS.MESSAGES.WELCOME_MESSAGE)}</p>
    </div>
  );
};
```

### Using Custom Hook

```tsx
import useTranslation from '../hooks/useTranslation';

const MyComponent = () => {
  const { translate, getCurrentLanguage, changeLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{translate(TEXT_CONSTANTS.NAVIGATION.HOME)}</h1>
      <p>Current language: {getCurrentLanguage()}</p>
      <button onClick={() => changeLanguage('hi')}>
        Switch to Hindi
      </button>
    </div>
  );
};
```

### Language Switcher Component

```tsx
import LanguageSwitcher from '../components/common/LanguageSwitcher';

const Header = () => {
  return (
    <header>
      {/* Dropdown variant */}
      <LanguageSwitcher variant="dropdown" showLabel={true} />
      
      {/* Button variant */}
      <LanguageSwitcher variant="buttons" showLabel={false} />
    </header>
  );
};
```

### Interpolation

```tsx
// In translation file (en.json)
{
  "welcome": "Welcome, {{name}}!"
}

// In component
const { t } = useTranslation();
return <h1>{t('welcome', { name: 'John' })}</h1>;
```

### Pluralization

```tsx
// In translation file (en.json)
{
  "items_zero": "No items",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}

// In component
const { t } = useTranslation();
return <p>{t('items', { count: 5 })}</p>;
```

## Adding New Languages

1. Create a new translation file in `src/i18n/locales/[lang].json`
2. Add the language to `SUPPORTED_LANGUAGES` in `src/i18n/config.ts`
3. Import and add the translations to the `resources` object in `config.ts`

Example for adding French:

```typescript
// src/i18n/config.ts
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिंदी',
  fr: 'Français'  // Add new language
} as const;

// Import new translations
import frTranslations from './locales/fr.json';

// Add to resources
resources: {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  fr: { translation: frTranslations }  // Add new resource
}
```

## Translation Keys Structure

All translation keys are defined in `src/constants/textConstants.ts` for type safety and consistency:

```typescript
export const TEXT_CONSTANTS = {
  COMMON: {
    LOADING: 'common.loading',
    ERROR: 'common.error',
    // ...
  },
  NAVIGATION: {
    HOME: 'navigation.home',
    DASHBOARD: 'navigation.dashboard',
    // ...
  },
  // ...
} as const;
```

## Features

### Language Detection
- Automatically detects user's preferred language from:
  1. localStorage (previous selection)
  2. Browser navigator language
  3. HTML lang attribute

### Language Persistence
- Selected language is saved in localStorage
- Persists across browser sessions

### Type Safety
- TypeScript interfaces for translation keys
- Custom hook with type-safe methods
- Compile-time checking for translation keys

### Fallback System
- Falls back to English if translation not found
- Graceful handling of missing keys

### Performance
- Lazy loading of translation files
- Minimal bundle size impact
- Efficient re-rendering

## Best Practices

1. **Use Constants**: Always use `TEXT_CONSTANTS` instead of hardcoded strings
2. **Namespace Keys**: Organize keys by feature/component (e.g., `auth.login`, `dashboard.title`)
3. **Consistent Naming**: Use camelCase for nested objects, lowercase for keys
4. **Meaningful Names**: Use descriptive names that indicate context
5. **Avoid HTML**: Keep HTML tags out of translations when possible
6. **Test Both Languages**: Always test functionality in both languages
7. **Context**: Provide context in key names when the same word has different meanings

## Debugging

### Development Mode
- Missing key warnings in console
- Debug mode enabled in development
- Translation key logging available

### Common Issues
1. **Missing Translation**: Check console for warnings about missing keys
2. **Wrong Language**: Verify localStorage setting and browser language
3. **Layout Issues**: Test UI with longer Hindi text
4. **Special Characters**: Ensure proper UTF-8 encoding

## File Formatting

### Translation Files
- Use proper JSON formatting
- Maintain consistent structure across languages
- Sort keys alphabetically within sections
- Use proper Unicode for Hindi text

### Constants File
- Export as `const assertion` for type safety
- Group related keys together
- Use descriptive comments
- Maintain alphabetical order

## Contributing

When adding new features:
1. Add translation keys to `textConstants.ts`
2. Add translations to both `en.json` and `hi.json`
3. Use the translation in components
4. Test in both languages
5. Update this documentation if needed
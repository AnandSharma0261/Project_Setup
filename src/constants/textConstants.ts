// Text Constants for i18n translation keys

export const TEXT_CONSTANTS = {
  // Common
  COMMON: {
    LOADING: 'common.loading',
    ERROR: 'common.error',
    SUCCESS: 'common.success',
    SAVE: 'common.save',
    CANCEL: 'common.cancel',
    DELETE: 'common.delete',
    EDIT: 'common.edit',
    ADD: 'common.add',
    SEARCH: 'common.search',
    FILTER: 'common.filter',
    CLEAR: 'common.clear',
    SUBMIT: 'common.submit',
    CLOSE: 'common.close',
    BACK: 'common.back',
    NEXT: 'common.next',
    PREVIOUS: 'common.previous',
    YES: 'common.yes',
    NO: 'common.no',
    OK: 'common.ok',
    TOTAL: 'common.total',
  },

  // Navigation
  NAVIGATION: {
    HOME: 'navigation.home',
    DASHBOARD: 'navigation.dashboard',
    ABOUT: 'navigation.about',
    CONTACT: 'navigation.contact',
    LOGIN: 'navigation.login',
    LOGOUT: 'navigation.logout',
    PROFILE: 'navigation.profile',
    SETTINGS: 'navigation.settings',
  },

  // Authentication
  AUTH: {
    LOGIN: 'auth.login',
    EMAIL: 'auth.email',
    PASSWORD: 'auth.password',
    FORGOT_PASSWORD: 'auth.forgotPassword',
    REMEMBER_ME: 'auth.rememberMe',
    SIGN_IN: 'auth.signIn',
    SIGN_OUT: 'auth.signOut',
    WELCOME_BACK: 'auth.welcomeBack',
    ENTER_EMAIL: 'auth.enterEmail',
    ENTER_PASSWORD: 'auth.enterPassword',
    AD_LOGIN: 'auth.adLogin',
    EMAIL_LOGIN: 'auth.emailLogin',
    INVALID_CREDENTIALS: 'auth.invalidCredentials',
    PASSWORD_REQUIRED: 'auth.passwordRequired',
    EMAIL_REQUIRED: 'auth.emailRequired',
  },

  // Dashboard
  DASHBOARD: {
    TITLE: 'dashboard.title',
    WELCOME: 'dashboard.welcome',
    STATS: 'dashboard.stats',
    OVERVIEW: 'dashboard.overview',
    ANALYTICS: 'dashboard.analytics',
    REPORTS: 'dashboard.reports',
    RECENT_ACTIVITY: 'dashboard.recentActivity',
    QUICK_ACTIONS: 'dashboard.quickActions',
  },

  // Stats Cards
  STATS: {
    TOTAL_USERS: 'stats.totalUsers',
    ACTIVE_SESSIONS: 'stats.activeSessions',
    REVENUE: 'stats.revenue',
    GROWTH: 'stats.growth',
    SALES: 'stats.sales',
    MARKETING: 'stats.marketing',
    PERFORMANCE: 'stats.performance',
    ANALYTICS: 'stats.analytics',
  },

  // Filters
  FILTERS: {
    ALL: 'filters.all',
    TODAY: 'filters.today',
    YESTERDAY: 'filters.yesterday',
    THIS_WEEK: 'filters.thisWeek',
    LAST_WEEK: 'filters.lastWeek',
    THIS_MONTH: 'filters.thisMonth',
    LAST_MONTH: 'filters.lastMonth',
    THIS_YEAR: 'filters.thisYear',
    CUSTOM_RANGE: 'filters.customRange',
    DATE_RANGE: 'filters.dateRange',
    STATUS: 'filters.status',
    CATEGORY: 'filters.category',
    TYPE: 'filters.type',
  },

  // Forms
  FORMS: {
    REQUIRED_FIELD: 'forms.requiredField',
    INVALID_EMAIL: 'forms.invalidEmail',
    INVALID_PHONE: 'forms.invalidPhone',
    MIN_LENGTH: 'forms.minLength',
    MAX_LENGTH: 'forms.maxLength',
    MATCH_PASSWORD: 'forms.matchPassword',
    FORM_SUBMITTED: 'forms.formSubmitted',
    FORM_ERROR: 'forms.formError',
  },

  // Messages
  MESSAGES: {
    WELCOME_MESSAGE: 'messages.welcomeMessage',
    SUCCESS_MESSAGE: 'messages.successMessage',
    ERROR_MESSAGE: 'messages.errorMessage',
    NO_DATA: 'messages.noData',
    LOADING_DATA: 'messages.loadingData',
    DATA_SAVED: 'messages.dataSaved',
    DATA_UPDATED: 'messages.dataUpdated',
    DATA_DELETED: 'messages.dataDeleted',
  },

  // Footer
  FOOTER: {
    COPYRIGHT: 'footer.copyright',
    ALL_RIGHTS_RESERVED: 'footer.allRightsReserved',
    PRIVACY_POLICY: 'footer.privacyPolicy',
    TERMS_OF_SERVICE: 'footer.termsOfService',
    CONTACT_US: 'footer.contactUs',
  },

  // Language
  LANGUAGE: {
    ENGLISH: 'language.english',
    HINDI: 'language.hindi',
    SELECT_LANGUAGE: 'language.selectLanguage',
    CHANGE_LANGUAGE: 'language.changeLanguage',
  },

  // Company Info
  COMPANY: {
    NAME: 'company.name',
    DESCRIPTION: 'company.description',
    ADDRESS: 'company.address',
    PHONE: 'company.phone',
    EMAIL: 'company.email',
  },

  // Progress Chart
  PROGRESS_CHART: {
    TOTAL: 'progressChart.total',
    INNER: 'progressChart.inner',
    MIDDLE: 'progressChart.middle',
    OUTER: 'progressChart.outer',
    SALES: 'progressChart.sales',
    MARKETING: 'progressChart.marketing',
    REVENUE: 'progressChart.revenue',
  },

  // Page Titles
  PAGE_TITLES: {
    HOME: 'pageTitles.home',
    DASHBOARD: 'pageTitles.dashboard',
    ABOUT: 'pageTitles.about',
    CONTACT: 'pageTitles.contact',
    LOGIN: 'pageTitles.login',
    NOT_FOUND: 'pageTitles.notFound',
  },

  // Buttons
  BUTTONS: {
    GET_STARTED: 'buttons.getStarted',
    LEARN_MORE: 'buttons.learnMore',
    CONTACT_US: 'buttons.contactUs',
    SIGN_UP: 'buttons.signUp',
    SIGN_IN: 'buttons.signIn',
    DOWNLOAD: 'buttons.download',
    UPLOAD: 'buttons.upload',
    REFRESH: 'buttons.refresh',
    RESET: 'buttons.reset',
    CONTINUE: 'buttons.continue',
    VIEW_ALL: 'buttons.viewAll',
    APPLY: 'buttons.apply',
  },

  // Landing Page
  LANDING: {
    HERO_TITLE: 'landing.heroTitle',
    HERO_SUBTITLE: 'landing.heroSubtitle',
    HERO_CTA: 'landing.heroCta',
    FEATURES_TITLE: 'landing.featuresTitle',
    FEATURE_AUDIT: 'landing.featureAudit',
    FEATURE_REPORTS: 'landing.featureReports',
    FEATURE_ANALYTICS: 'landing.featureAnalytics',
    ABOUT_TITLE: 'landing.aboutTitle',
    ABOUT_DESCRIPTION: 'landing.aboutDescription',
  },

  // Audit
  AUDIT: {
    TITLE: 'audit.title',
    STATUS: 'audit.status',
    COMPLETED: 'audit.completed',
    PENDING: 'audit.pending',
    IN_PROGRESS: 'audit.inProgress',
    REVIEWED: 'audit.reviewed',
    ALLOTTED: 'audit.allotted',
    DEALER_CODE: 'audit.dealerCode',
    DEALER_NAME: 'audit.dealerName',
    AUDITOR_STATUS: 'audit.auditorStatus',
    REVIEWER_STATUS: 'audit.reviewerStatus',
    LOCATION: 'audit.location',
    DATE: 'audit.date',
    SCORE: 'audit.score',
    CHECKSHEET: 'audit.checksheet',
    CHECKSHEET_STATUS: 'audit.checksheetStatus',
  },

  // User Management
  USERS: {
    TOTAL_USERS: 'users.totalUsers',
    TOTAL_REVIEWERS: 'users.totalReviewers',
    TOTAL_AUDITORS: 'users.totalAuditors',
    TOTAL_ORGANIZATIONS: 'users.totalOrganizations',
    USER_PROFILE: 'users.userProfile',
    USER_ROLE: 'users.userRole',
    ADMIN: 'users.admin',
    AUDITOR: 'users.auditor',
    REVIEWER: 'users.reviewer',
    USER: 'users.user',
  },

  // Sidebar Navigation
  SIDEBAR: {
    DASHBOARD: 'sidebar.dashboard',
    AUDITS: 'sidebar.audits',
    REPORTS: 'sidebar.reports',
    USERS: 'sidebar.users',
    SETTINGS: 'sidebar.settings',
    HELP: 'sidebar.help',
    COLLAPSE: 'sidebar.collapse',
    EXPAND: 'sidebar.expand',
  },

  // Form Labels
  FORM_LABELS: {
    EMAIL_ADDRESS: 'formLabels.emailAddress',
    PASSWORD: 'formLabels.password',
    CONFIRM_PASSWORD: 'formLabels.confirmPassword',
    FIRST_NAME: 'formLabels.firstName',
    LAST_NAME: 'formLabels.lastName',
    PHONE_NUMBER: 'formLabels.phoneNumber',
    ORGANIZATION: 'formLabels.organization',
    ROLE: 'formLabels.role',
    STATUS: 'formLabels.status',
    DATE_FROM: 'formLabels.dateFrom',
    DATE_TO: 'formLabels.dateTo',
    SEARCH_PLACEHOLDER: 'formLabels.searchPlaceholder',
  },

  // Notifications
  NOTIFICATIONS: {
    TITLE: 'notifications.title',
    NEW_AUDIT: 'notifications.newAudit',
    AUDIT_COMPLETED: 'notifications.auditCompleted',
    REVIEW_REQUIRED: 'notifications.reviewRequired',
    SYSTEM_UPDATE: 'notifications.systemUpdate',
    NO_NOTIFICATIONS: 'notifications.noNotifications',
    MARK_AS_READ: 'notifications.markAsRead',
    CLEAR_ALL: 'notifications.clearAll',
  },

  // Status Messages
  STATUS: {
    ACTIVE: 'status.active',
    INACTIVE: 'status.inactive',
    DRAFT: 'status.draft',
    PUBLISHED: 'status.published',
    ARCHIVED: 'status.archived',
    APPROVED: 'status.approved',
    REJECTED: 'status.rejected',
    UNDER_REVIEW: 'status.underReview',
  },

  // Time & Dates
  TIME: {
    TODAY: 'time.today',
    YESTERDAY: 'time.yesterday',
    LAST_WEEK: 'time.lastWeek',
    LAST_MONTH: 'time.lastMonth',
    LAST_YEAR: 'time.lastYear',
    MINUTES_AGO: 'time.minutesAgo',
    HOURS_AGO: 'time.hoursAgo',
    DAYS_AGO: 'time.daysAgo',
    WEEKS_AGO: 'time.weeksAgo',
    MONTHS_AGO: 'time.monthsAgo',
  },

  // Validation Messages
  VALIDATION: {
    EMAIL_INVALID: 'validation.emailInvalid',
    PASSWORD_TOO_SHORT: 'validation.passwordTooShort',
    PASSWORD_REQUIRED: 'validation.passwordRequired',
    FIELD_REQUIRED: 'validation.fieldRequired',
    PASSWORDS_DONT_MATCH: 'validation.passwordsDontMatch',
    PHONE_INVALID: 'validation.phoneInvalid',
  },
} as const;

// Type for text constants to ensure type safety
export type TextConstantKey = typeof TEXT_CONSTANTS[keyof typeof TEXT_CONSTANTS][keyof typeof TEXT_CONSTANTS[keyof typeof TEXT_CONSTANTS]];
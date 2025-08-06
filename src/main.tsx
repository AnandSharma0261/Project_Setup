import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles/main.scss'
import './i18n/config' // Initialize i18n
import App from './App.tsx'

// Import i18n testing utilities in development
if (import.meta.env.MODE === 'development') {
  import('./utils/i18nTestHelper').then(({ quickI18nTest }) => {
    // Run quick test on app load
    setTimeout(quickI18nTest, 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

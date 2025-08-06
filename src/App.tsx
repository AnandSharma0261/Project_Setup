import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { initializeAuth } from './store/slices/authSlice'
import { useAppDispatch } from './hooks/redux'
import RouteGenerator from './components/routing/RouteGenerator'
import './App.css'

// Global loading fallback for the entire app
const AppLoadingFallback = () => (
  <div className="app-loading">
    <div className="loading-spinner"></div>
    <p>Loading TVS CMS Portal...</p>
  </div>
)

function App() {
  const dispatch = useAppDispatch()

  // Initialize auth state on app load
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <Router>
      <Suspense fallback={<AppLoadingFallback />}>
        <RouteGenerator />
      </Suspense>
    </Router>
  )
}

export default App

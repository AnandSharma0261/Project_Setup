import { Suspense, lazy } from 'react'
import type { ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { RouteConfig } from '../../types'
import { ROUTE_CONFIGS } from '../../constants/routes'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

// Cache for lazily loaded components
const componentCache = new Map<string, ComponentType<any>>()

// Component mapping for better type safety and Vite compatibility
const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  'Home': () => import('../../pages/Home.tsx'),
  'ADLogin': () => import('../../pages/ADLogin.tsx'),
  'ADPasswordEntry': () => import('../../pages/ADPasswordEntry.tsx'),
  'EmailLogin': () => import('../../pages/EmailLogin.tsx'),
  'Dashboard': () => import('../../pages/Dashboard.tsx'),
  'Reports': () => import('../../pages/Reports.tsx'),
}

// Dynamic component loader with error handling
const loadComponent = (componentName: string): ComponentType<any> => {
  // Check cache first
  if (componentCache.has(componentName)) {
    return componentCache.get(componentName)!
  }

  // Create lazy component with explicit mapping
  const LazyComponent = lazy(() => {
    const componentLoader = componentMap[componentName]
    
    if (componentLoader) {
      return componentLoader()
        .then(module => ({ default: module.default }))
        .catch(error => {
          console.error(`Failed to load component: ${componentName}`, error)
          return { 
            default: () => (
              <div className="route-error">
                <h2>Component Load Error</h2>
                <p>The component '{componentName}' failed to load.</p>
                <p>Error: {error.message}</p>
              </div>
            )
          }
        })
    }
    
    // Fallback: try dynamic import with .tsx extension for future components
    return import(/* @vite-ignore */ `../../pages/${componentName}.tsx`)
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error(`Failed to load component: ${componentName}`, error)
        // Return a fallback error component
        return { 
          default: () => (
            <div className="route-error">
              <h2>Page Not Found</h2>
              <p>The component '{componentName}' could not be loaded.</p>
              <p>Please check if the file exists at: /pages/{componentName}.tsx</p>
            </div>
          )
        }
      })
  })

  // Cache the component
  componentCache.set(componentName, LazyComponent)
  return LazyComponent
}

// Route Error Boundary Component
const RouteErrorFallback = ({ componentName }: { componentName: string }) => (
  <div className="route-error">
    <h2>Component Error</h2>
    <p>There was an error loading the '{componentName}' component.</p>
    <p>Please refresh the page or contact support if the problem persists.</p>
  </div>
)

// Loading Component
const RouteLoadingFallback = () => (
  <div className="route-loading">
    <div className="loading-spinner"></div>
    <p>Loading page...</p>
  </div>
)

// Individual Route Component with Error Boundary and Protection
const DynamicRoute = ({ config }: { config: RouteConfig }) => {
  try {
    const Component = loadComponent(config.component)
    
    const routeContent = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <Component />
      </Suspense>
    )

    // Apply route protection based on route configuration
    if (config.protected) {
      // Protected route - requires authentication
      return <ProtectedRoute>{routeContent}</ProtectedRoute>
    } else {
      // Public route - determine if it should redirect authenticated users
      const isAuthRoute = ['/ad-login', '/ad-password', '/email-login'].includes(config.path)
      return (
        <PublicRoute redirectIfAuthenticated={isAuthRoute}>
          {routeContent}
        </PublicRoute>
      )
    }
    
  } catch (error) {
    console.error(`Error creating route for ${config.component}:`, error)
    return <RouteErrorFallback componentName={config.component} />
  }
}

// Main Route Generator Component
const RouteGenerator = () => {
  return (
    <Routes>
      {ROUTE_CONFIGS.map((routeConfig) => (
        <Route
          key={routeConfig.path}
          path={routeConfig.path}
          element={<DynamicRoute config={routeConfig} />}
        />
      ))}
      
      {/* Catch-all route for 404 pages */}
      <Route 
        path="*" 
        element={
          <div className="route-error not-found">
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/">Go back to home</a>
          </div>
        } 
      />
    </Routes>
  )
}

// Utility function to preload a component
export const preloadComponent = (componentName: string): void => {
  if (!componentCache.has(componentName)) {
    loadComponent(componentName)
  }
}

// Utility function to preload all components
export const preloadAllComponents = (): void => {
  ROUTE_CONFIGS.forEach(config => {
    preloadComponent(config.component)
  })
}

// Route debugging utilities (for development)
export const getLoadedComponents = (): string[] => {
  return Array.from(componentCache.keys())
}

export const clearComponentCache = (): void => {
  componentCache.clear()
}

export default RouteGenerator
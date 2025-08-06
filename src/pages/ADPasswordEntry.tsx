import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGES, IMAGE_ALT_TEXT } from '../constants/images'
import { authService } from '../services/authService'
import { login as loginAction } from '../store/slices/authSlice'
import type { RootState } from '../store'
import LandingHeader from '../components/layout/LandingHeader'
import LandingFooter from '../components/layout/LandingFooter'
import '../styles/pages/ad-password-entry.css'

interface FormData {
  password: string
}

interface FormErrors {
  password?: string
  general?: string
}

interface LocationState {
  email: string
  from?: string // For redirect after login
  message?: string
}

const ADPasswordEntry = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const state = location.state as LocationState
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState<FormData>({
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect to login if no email provided
  useEffect(() => {
    if (!state?.email) {
      navigate('/ad-login')
    }
  }, [state, navigate])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Check if there was an intended destination
      const redirectTo = state?.from || '/dashboard'
      console.log('✅ User already authenticated, redirecting to:', redirectTo)
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, state])

  const validatePassword = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData({ password: value })
    
    // Clear error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }))
    }
  }

  const handleSignIn = async () => {
    if (!validatePassword()) return

    setIsLoading(true)
    setErrors({})

    try {
      if (!state?.email) {
        throw new Error('Email not provided')
      }

      console.log('🔐 Calling authentication API for:', state.email)

      // Call the authentication API using axios
      const response = await authService.authenticateUser({
        email: state.email,
        password: formData.password
      })

      console.log('🔑 Authentication response:', response)

      if (response.success) {
        const { user, token, refreshToken } = response.data
        
        // Store tokens in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Update Redux state
        dispatch(loginAction({ user, token, refreshToken }))
        
        console.log('✅ Login successful, redirecting to dashboard...')
        // Navigation will happen automatically via useEffect when isAuthenticated becomes true
      } else {
        setErrors({
          general: response.message || 'Sign-in failed. Please check your password and try again.'
        })
      }
      
    } catch (error: any) {
      console.error('❌ Authentication failed:', error)
      setErrors({
        general: error?.message || 'Sign-in failed. Please check your password and try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/ad-login', { state: { email: state?.email } })
  }

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality will be implemented soon.')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignIn()
    }
  }

  if (!state?.email) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="ad-password-page">
      <LandingHeader />
      
      <div className="ad-password-container">
        <div className="left-section">
          <div className="logo-container">
            <img 
              src={IMAGES.logos.tvsMdMr} 
              alt={IMAGE_ALT_TEXT.tvsMdMr} 
              className="mdmr-logo" 
            />
          </div>
          <div className="display-image-container">
            <div className="display-placeholder">
              <span>Display Image</span>
            </div>
          </div>
        </div>
        
        <div className="divider"></div>
        
        <div className="right-section">
          <div className="microsoft-login-card">
            <div className="card-top-section">
              <div className="card-header">
                <img 
                  src={IMAGES.logos.tvs} 
                  alt={IMAGE_ALT_TEXT.tvs} 
                  className="tvs-small-logo" 
                />
              </div>
              
              <div className="back-navigation">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="back-link"
                  disabled={isLoading}
                >
                  ← {state.email}
                </button>
              </div>
              
              <h1 className="signin-title">Enter password</h1>
            </div>
            
            <div className="card-middle-section">
              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}
              
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`password-input ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••••••••••••"
                  disabled={isLoading}
                  autoFocus
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              
              <div className="password-help">
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="help-link"
                  disabled={isLoading}
                >
                  Forgot password
                </button>
              </div>
            </div>
            
            <div className="card-bottom-section">
              <div className="signin-button-container">
                <button 
                  type="button"
                  onClick={handleSignIn}
                  className={`signin-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LandingFooter />
    </div>
  )
}

export default ADPasswordEntry
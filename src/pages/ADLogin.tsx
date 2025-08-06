import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IMAGES, IMAGE_ALT_TEXT } from '../constants/images'
import { authService } from '../services/authService'
import LandingHeader from '../components/layout/LandingHeader'
import LandingFooter from '../components/layout/LandingFooter'
import '../styles/pages/ad-login.css'

interface FormData {
  email: string
}

interface FormErrors {
  email?: string
  general?: string
}

const ADLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState<FormData>({
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  
  // Get any message from protected route redirect
  const locationState = location.state as { from?: string; message?: string } | null

  const validateEmail = (): boolean => {
    const newErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData({ email: value })
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }))
    }
  }

  const handleNext = async () => {
    if (!validateEmail()) return

    setIsLoading(true)
    setErrors({})

    try {
      console.log('🔍 Calling email validation API for:', formData.email)
      
      // Call the email validation API using axios
      const response = await authService.validateEmail(formData.email)
      
      console.log('📧 Email validation response:', response)
      
      if (response.success && response.data.exists) {
        console.log('✅ Email verified successfully:', formData.email)
        // Navigate to password entry page with email and any redirect info
        const locationState = location.state as { from?: string; message?: string } | null
        navigate('/ad-password', { 
          state: { 
            email: formData.email,
            from: locationState?.from, // Pass through redirect destination
            message: locationState?.message
          } 
        })
      } else {
        setErrors({
          general: response.message || 'This email address is not registered. Please check your email and try again.'
        })
      }
      
    } catch (error: any) {
      console.error('❌ Email validation failed:', error)
      setErrors({
        general: error.message || 'Unable to verify email. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext()
    }
  }

  return (
    <div className="ad-login-page">
      <LandingHeader />
      
      <div className="ad-login-container">
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
              <h1 className="signin-title">Sign in</h1>
            </div>
            
            <div className="card-middle-section">
              {locationState?.message && (
                <div className="info-message" style={{
                  padding: '12px 16px',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #1976d2',
                  borderRadius: '4px',
                  color: '#1565c0',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {locationState.message}
                </div>
              )}
              
              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}
              
              <div className="email-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`email-input ${errors.email ? 'error' : ''}`}
                  placeholder="someone@tvsmotor.com"
                  disabled={isLoading}
                  autoFocus
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="account-help">
                <a href="#" className="help-link">
                  Can't access your account?
                </a>
              </div>
            </div>
            
            <div className="card-bottom-section">
              <div className="button-group">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="back-btn"
                  disabled={isLoading}
                >
                  Back
                </button>
                
                <button 
                  type="button"
                  onClick={handleNext}
                  className={`next-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    'Next'
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

export default ADLogin
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IMAGES, IMAGE_ALT_TEXT } from '../constants/images'
import { TEXT_CONSTANTS } from '../constants/textConstants'
import LandingHeader from '../components/layout/LandingHeader'
import LandingFooter from '../components/layout/LandingFooter'
import '../styles/pages/email-login.css'

interface FormData {
  email: string
}

interface FormErrors {
  email?: string
  general?: string
}

const EmailLogin = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [formData, setFormData] = useState<FormData>({
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (): boolean => {
    const newErrors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = t(TEXT_CONSTANTS.AUTH.EMAIL_REQUIRED)
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t(TEXT_CONSTANTS.VALIDATION.EMAIL_INVALID)
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
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // TODO: Implement actual OTP sending logic
      console.log('Sending OTP to:', formData.email)
      
      // Simulate successful OTP verification and redirect to dashboard
      navigate('/dashboard')
      
    } catch (error) {
      setErrors({
        general: 'Failed to send OTP. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleCannotAccess = () => {
    // TODO: Implement account recovery functionality
    alert('Account recovery functionality will be implemented soon.')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext()
    }
  }

  return (
    <div className="email-login-page">
      <LandingHeader />
      
      <div className="email-login-container">
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
          <div className="otp-verification-card">
            <div className="card-content">
              <h1 className="otp-title">{t(TEXT_CONSTANTS.AUTH.EMAIL_LOGIN)}</h1>
              
              <div className="otp-description">
                <h2 className="email-prompt">{t(TEXT_CONSTANTS.FORM_LABELS.EMAIL_ADDRESS)}</h2>
                <p className="otp-info">{t(TEXT_CONSTANTS.AUTH.ENTER_EMAIL)}</p>
              </div>
              
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
                  placeholder={t(TEXT_CONSTANTS.FORM_LABELS.EMAIL_ADDRESS)}
                  disabled={isLoading}
                  autoFocus
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="account-help">
                <button 
                  type="button"
                  onClick={handleCannotAccess}
                  className="help-link"
                  disabled={isLoading}
                >
                  Can't access your account?
                </button>
              </div>
            </div>
            
            <div className="button-group">
              <button 
                type="button"
                onClick={handleBack}
                className="back-btn"
                disabled={isLoading}
              >
                {t(TEXT_CONSTANTS.COMMON.BACK)}
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
                    {t(TEXT_CONSTANTS.COMMON.LOADING)}
                  </>
                ) : (
                  t(TEXT_CONSTANTS.COMMON.NEXT)
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <LandingFooter />
    </div>
  )
}

export default EmailLogin
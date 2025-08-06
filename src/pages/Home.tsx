import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IMAGES, IMAGE_ALT_TEXT } from '../constants/images'
import { TEXT_CONSTANTS } from '../constants/textConstants'
import LandingHeader from '../components/layout/LandingHeader'
import LandingFooter from '../components/layout/LandingFooter'
import '../styles/pages/landing.css'

interface HomeProps {
  showHeader?: boolean
  showFooter?: boolean
}

const Home = ({ showHeader = true, showFooter = true }: HomeProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleTVSLogin = () => {
    navigate('/ad-login')
  }

  const handleEmailLogin = () => {
    navigate('/email-login')
  }

  return (
    <div className="landing-page">
      <LandingHeader showHeader={showHeader} />
      
      <div className="landing-container">
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
          <div className="login-container">
            <h1 className="login-title">{t(TEXT_CONSTANTS.AUTH.LOGIN)}</h1>
            <p className="welcome-text">{t(TEXT_CONSTANTS.MESSAGES.WELCOME_MESSAGE)}</p>
            
            <div className="login-buttons">
              <button 
                className="login-btn tvs-btn"
                onClick={handleTVSLogin}
                type="button"
              >
                <span className="btn-icon">
                  <img 
                    src={IMAGES.logos.tvsLogin} 
                    alt={IMAGE_ALT_TEXT.tvsLogin} 
                    className="btn-icon" 
                  />
                </span>
                {t(TEXT_CONSTANTS.AUTH.AD_LOGIN)}
                <span className="btn-arrow">→</span>
              </button>
              
              <button 
                className="login-btn email-btn"
                onClick={handleEmailLogin}
                type="button"
              >
                <span className="btn-icon">
                  <img 
                    src={IMAGES.logos.email} 
                    alt={IMAGE_ALT_TEXT.email} 
                    className="btn-icon" 
                  />
                </span>
                {t(TEXT_CONSTANTS.AUTH.EMAIL_LOGIN)}
                <span className="btn-arrow">→</span>
              </button>
            </div>
            
            <p className="login-info">
              Please Login with your<br />
              <strong>TVS email id</strong> or <strong>Registered email id</strong>
            </p>
          </div>
        </div>
      </div>
      
      <LandingFooter showFooter={showFooter} />
    </div>
  )
}

export default Home
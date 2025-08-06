// Image imports
import TvsMdMrLogo from '../assets/images/TvsMdMr.svg'
import HeaderLogo from '../assets/images/header-logo.svg'
import TvsLogo from '../assets/images/tvs-logo.svg'
import LoginLogo from '../assets/images/tvs-login-logo.svg'
import EmailLogo from '../assets/images/email-logo.svg'
import UserImage from '../assets/images/user-img.svg'

// Centralized image constants
export const IMAGES = {
  logos: {
    tvsMdMr: TvsMdMrLogo,
    header: HeaderLogo,
    tvs: TvsLogo,
    tvsLogin: LoginLogo,
    email: EmailLogo,
  },
  profile: {
    userImage: UserImage,
  },
} as const

// Image alt text constants
export const IMAGE_ALT_TEXT = {
  tvsMdMr: 'TVS MDMR Logo',
  header: 'TVS Header Logo',
  tvs: 'TVS Logo',
  tvsLogin: 'TVS Login Icon',
  email: 'Email Login Icon',
  userImage: 'User Profile Image',
} as const

// Export individual images for backward compatibility
export {
  TvsMdMrLogo,
  HeaderLogo,
  TvsLogo,
  LoginLogo,
  EmailLogo,
  UserImage,
}
import '../styles/main.scss'
import Search from './Search.js'
import ModalCollection from './AuthModal.js'
import InputMaskCollection from './InputMask.js'
import { initGoogleAuth } from './google-auth.js'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

new Search()
new ModalCollection()
new InputMaskCollection()
initGoogleAuth(CLIENT_ID)

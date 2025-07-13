import '../styles/main.scss'
import Search from './Search.js'
import ModalCollection from './AuthModal.js'
import InputMaskCollection from './InputMask.js'
import { initGoogleAuth } from './google-auth.js'
import SliderCollection from './Slider.js'

const CLIENT_ID =
	'338113015991-8lidjllokbu1dkbeq5p166c02lgjc4mf.apps.googleusercontent.com'

new Search()
new ModalCollection()
new InputMaskCollection()
initGoogleAuth(CLIENT_ID)
new SliderCollection()

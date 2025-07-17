import '../styles/main.scss'
import Search from './Search.js'
import ModalCollection from './AuthModal.js'
import InputMaskCollection from './InputMask.js'
import { initGoogleAuth } from './google-auth.js'
import SliderCollection from './Slider.js'
import HeroSliderCollection from './HeroSlider.js'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

new Search()
new ModalCollection()
new InputMaskCollection()
initGoogleAuth(CLIENT_ID)
new SliderCollection()
new HeroSliderCollection(TOKEN)

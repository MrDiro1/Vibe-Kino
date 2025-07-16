import '../styles/main.scss'
import Search from './Search.js'
import ModalCollection from './AuthModal.js'
import InputMaskCollection from './InputMask.js'
import { initGoogleAuth } from './google-auth.js'
import SliderCollection from './Slider.js'
import MovieSlider from './FilmsCatalog.js'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const TOKEN = import.meta.env.VITE_TMDB_TOKEN // Ваш токен TMDB, замените на свой

const popularSlider = new MovieSlider({
	wrapperSelector: '[data-js-popular-slider]',
	endpoint: 'popular',
	token: TOKEN,
	language: 'uk-UA',
})

const topRatedSlider = new MovieSlider({
	wrapperSelector: '[data-js-top-rated-slider]',
	endpoint: 'top_rated',
	token: TOKEN,
	language: 'uk-UA',
})

const upcomingSlider = new MovieSlider({
	wrapperSelector: '[data-js-upcoming-slider]',
	endpoint: 'upcoming',
	token: TOKEN,
	language: 'uk-UA',
})

new Search()
new ModalCollection()
new InputMaskCollection()

initGoogleAuth(CLIENT_ID)

new SliderCollection()

popularSlider.render()
topRatedSlider.render()
upcomingSlider.render()

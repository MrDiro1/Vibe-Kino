import '../styles/main.scss'
import Search from './Search.js'
import ModalCollection from './AuthModal.js'
import InputMaskCollection from './InputMask.js'
import { initGoogleAuth } from './google-auth.js'
import SliderCollection from './Slider.js'

import MovieSlider from './FilmsCatalog.js'
import MoviePageCollection from './MoviePage.js'
import YouTubePlayerCollection from './YoutubePlayer.js'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

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

const watchButton = document.querySelector('[data-js-watch-button]')
const youtubePlayer = new YouTubePlayerCollection(watchButton)

import HeroSliderCollection from './HeroSlider.js'

new Search()
new ModalCollection()
new InputMaskCollection()

initGoogleAuth(CLIENT_ID)

popularSlider.render()
topRatedSlider.render()
upcomingSlider.render()

new MoviePageCollection({
	onTrailerKey: key => youtubePlayer.setTrailerKey(key),
})

new HeroSliderCollection(TOKEN)

setTimeout(() => {
	new SliderCollection()
}, 10)

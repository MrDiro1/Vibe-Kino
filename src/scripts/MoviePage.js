const rootSelector = '[data-js-movie]'

class MoviePage {
	selectors = {
		root: rootSelector,
		poster: '[data-js-small-poster]',
		title: '[data-js-title]',
		description: '[data-js-description]',
		playerInfo: '[data-js-player-info]',
	}

	constructor(rootElement, options) {
		this.rootElement = rootElement
		this.token = options.token
		this.options = options // сохраняем, чтобы использовать onTrailerKey
		this.imageBaseUrl =
			options.imageBaseUrl || 'https://image.tmdb.org/t/p/w500'
		this.backdropBaseUrl =
			options.backdropBaseUrl || 'https://image.tmdb.org/t/p/original'

		this.movieId = new URLSearchParams(window.location.search).get('id')

		this.elements = {
			poster: this.rootElement.querySelector(this.selectors.poster),
			title: this.rootElement.querySelector(this.selectors.title),
			description: this.rootElement.querySelector(this.selectors.description),
			playerInfo: this.rootElement.querySelector(this.selectors.playerInfo),
		}

		this.apiOptions = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		}

		this.init()
	}

	async init() {
		if (!this.movieId) {
			console.error('❌ Movie ID not found in URL')
			return
		}

		try {
			const [movieRes, videoRes] = await Promise.all([
				fetch(
					`https://api.themoviedb.org/3/movie/${this.movieId}?language=uk-UA`,
					this.apiOptions
				),
				fetch(
					`https://api.themoviedb.org/3/movie/${this.movieId}/videos?language=uk-UA`,
					this.apiOptions
				),
			])

			const movie = await movieRes.json()
			const videos = await videoRes.json()

			this.renderMovie(movie)

			const trailerKey = this.getTrailerKey(videos)

			if (this.options?.onTrailerKey && trailerKey) {
				this.options.onTrailerKey(trailerKey)
			}
		} catch (err) {
			console.error('❌ Failed to load movie:', err)
		}
	}

	renderMovie(movie) {
		const { poster, title, description, playerInfo } = this.elements

		if (poster) {
			poster.src = `${this.imageBaseUrl}${movie.poster_path}`
			poster.alt = movie.title
		}

		if (playerInfo && movie.backdrop_path) {
			playerInfo.style.backgroundImage = `url(${this.backdropBaseUrl}${movie.backdrop_path})`
		}

		if (title) title.textContent = movie.title
		if (description) description.textContent = movie.overview
	}

	getTrailerKey(videos) {
		const trailer = videos.results.find(
			video => video.type === 'Trailer' && video.site === 'YouTube'
		)
		return trailer?.key || null
	}
}

class MoviePageCollection {
	constructor(options = {}) {
		this.options = options
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach(el => {
			new MoviePage(el, {
				token: import.meta.env.VITE_TMDB_TOKEN,
				onTrailerKey: this.options.onTrailerKey, // передаём колбэк, если есть
			})
		})
	}
}

export default MoviePageCollection

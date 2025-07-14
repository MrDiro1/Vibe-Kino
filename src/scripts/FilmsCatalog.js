export default class MovieSlider {
	constructor({
		wrapperSelector,
		endpoint,
		language = 'en-US',
		page = 1,
		token,
		imageBaseUrl = 'https://image.tmdb.org/t/p/w500',
		renderSlide = null,
	}) {
		this.wrapperSelector = wrapperSelector
		this.endpoint = endpoint
		this.language = language
		this.page = page
		this.token = token
		this.imageBaseUrl = imageBaseUrl
		this.renderSlide = renderSlide || this.createDefaultSlide.bind(this)

		this.apiUrl = `https://api.themoviedb.org/3/movie/${this.endpoint}?language=${this.language}&page=${this.page}`
		this.options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		}

		this.swiperWrapper = document.querySelector(this.wrapperSelector)
	}

	async fetchMovies() {
		try {
			const res = await fetch(this.apiUrl, this.options)
			const data = await res.json()

			if (!Array.isArray(data.results)) {
				console.warn('⚠️ Unexpected API response:', data)
				return []
			}

			return data.results
		} catch (err) {
			console.error('Failed to fetch movies:', err)
			return []
		}
	}

	createDefaultSlide(movie) {
		const { title, release_date, poster_path } = movie
		const formattedDate = new Date(release_date).toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		const slide = document.createElement('div')
		slide.className = 'swiper-slide'
		slide.innerHTML = `
			<div class="catalog-films__film-preview-card film-preview-card">
				<a href="/" class="film-preview-card__link">
					<img
						src="${this.imageBaseUrl}${poster_path}"
						alt="${title}"
						class="film-preview-card__image"
						loading="lazy"
						width="236"
						height="356"
					/>
				</a>
				<div class="film-preview-card__content">
					<h3 class="film-preview-card__title">${title}</h3>
					<p class="film-preview-card__subtitle">
						<time datetime="${release_date}">${formattedDate}</time>
					</p>
				</div>
			</div>
		`
		return slide
	}

	async render() {
		if (!this.swiperWrapper) {
			console.warn(`Swiper wrapper not found: ${this.wrapperSelector}`)
			return
		}

		const movies = await this.fetchMovies()
		this.swiperWrapper.innerHTML = ''

		movies.forEach(movie => {
			const slide = this.renderSlide(movie)
			this.swiperWrapper.appendChild(slide)
		})
	}
}

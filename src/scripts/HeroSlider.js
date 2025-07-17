const rootSelector = '[data-js-hero-swiper-wrapper]'

class HeroSlider {
	constructor(rootElement, token) {
		this.rootElement = rootElement
		this.token = token
		this.swiperWrapper = this.rootElement
		this.apiUrl =
			'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
		this.apiOptions = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
		}

		this.fetchMovies()
	}

	async fetchMovies() {
		try {
			const response = await fetch(this.apiUrl, this.apiOptions)
			const data = await response.json()
			this.renderSlides(data.results)
		} catch (error) {
			console.error('Failed to load hero slider movies:', error)
		}
	}

	renderSlides(movies) {
		this.swiperWrapper.innerHTML = ''

		movies.forEach(movie => {
			const { id, title, backdrop_path } = movie

			if (!backdrop_path) return

			const slide = document.createElement('div')
			slide.classList.add('swiper-slide')
			slide.innerHTML = `
				<div class="swiper-item">
					<a href="/movie.html?id=${id}" class="swiper-item__link">
						<img
							src="https://image.tmdb.org/t/p/w1280${backdrop_path}"
							alt="${title}"
							class="swiper-item__image"
							width="1600"
							height="520"
							loading="lazy"
						/>
					</a>
				</div>
			`

			this.swiperWrapper.appendChild(slide)
		})
	}
}

class HeroSliderCollection {
	constructor(token) {
		this.token = token
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach(element => {
			new HeroSlider(element, this.token)
		})
	}
}

export default HeroSliderCollection

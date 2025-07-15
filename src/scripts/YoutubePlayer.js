const rootSelector = '[data-js-youtube-player]'

class YouTubePlayer {
	selectors = {
		iframe: '[data-js-youtube-iframe]',
	}

	stateClasses = {
		isActive: 'is-active',
	}

	constructor(rootElement, watchButton) {
		this.rootElement = rootElement
		this.iframeElement = this.rootElement.querySelector(this.selectors.iframe)
		this.watchButton = watchButton
		this.trailerKey = null

		this.isTrailerVisible = false

		this.bindEvents()
	}

	setTrailerKey(key) {
		this.trailerKey = key
	}

	bindEvents() {
		if (this.watchButton) {
			this.watchButton.addEventListener('click', () => this.toggleTrailer())
		}
	}

	toggleTrailer() {
		if (!this.trailerKey || !this.iframeElement) {
			console.warn('❌ No trailer key or iframe')
			return
		}

		const isActive = this.rootElement.classList.toggle(
			this.stateClasses.isActive
		)

		if (isActive) {
			this.iframeElement.src = `https://www.youtube.com/embed/${this.trailerKey}?autoplay=1`

			this.rootElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
		} else {
			this.iframeElement.src = ''
		}

		this.watchButton.classList.toggle(this.stateClasses.isActive, isActive)
		this.watchButton.textContent = isActive ? 'Закрити' : 'Дивитися'
	}
}

class YouTubePlayerCollection {
	constructor(watchButton) {
		this.watchButton = watchButton
		this.player = null
		this.init()
	}

	init() {
		const playerElement = document.querySelector(rootSelector)
		if (playerElement) {
			this.player = new YouTubePlayer(playerElement, this.watchButton)
		}
	}

	setTrailerKey(key) {
		if (this.player) {
			this.player.setTrailerKey(key)
		}
	}
}

export default YouTubePlayerCollection

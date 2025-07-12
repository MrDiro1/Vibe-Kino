import IMask from 'imask'

const rootSelector = '[data-js-input-mask]'

class inputMask {
	constructor(rootElement) {
		this.rootElement = rootElement
		this.init()
	}

	init() {
		const isLibReady = typeof window.IMask !== 'undefined'

		if (isLibReady) {
			IMask(this.rootElement, {
				mask: this.rootElement.dataset.jsInputMask,
			})
		} else {
			console.error('Библиотека "IMask" не подключена')
		}
	}
}

class inputMaskCollection {
	constructor() {
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach(element => {
			new inputMask(element)
		})
	}
}

export default inputMaskCollection

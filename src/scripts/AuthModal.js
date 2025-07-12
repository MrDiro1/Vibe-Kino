const rootSelectorHeader = '[data-js-header]'
const rootSelector = '[data-js-modal]'

class Modal {
	selectors = {
		root: rootSelector,
		rootHeader: rootSelectorHeader,
		closeButton: '[data-js-modal-close]',
		openButton: '[data-js-open-button]',
	}

	stateClasses = {
		isActive: 'is-active',
		isLocked: 'is-lock',
	}

	constructor(element) {
		this.modal = element
		this.openButton = document.querySelector(this.selectors.openButton)
		this.closeButton = this.modal.querySelector(this.selectors.closeButton)
		this.html = document.documentElement

		this.bindEvents()
	}

	onOpenClick = () => {
		this.modal.classList.add(this.stateClasses.isActive)
		this.html.classList.add(this.stateClasses.isLocked)
	}

	onCloseClick = () => {
		this.modal.classList.remove(this.stateClasses.isActive)
		this.html.classList.remove(this.stateClasses.isLocked)
	}

	bindEvents() {
		this.openButton?.addEventListener('click', this.onOpenClick)
		this.closeButton?.addEventListener('click', this.onCloseClick)
	}
}

class ModalCollection {
	constructor() {
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach(element => {
			new Modal(element)
		})
	}
}

export default ModalCollection

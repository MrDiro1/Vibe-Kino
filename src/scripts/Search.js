class Search {
	selectors = {
		root: '[data-js-header]',
		formElement: '[data-js-header-form]',
		openSearchButton: '[data-js-header-button]',
		searchWrapper: '[data-js-header-search]',
	}

	stateClasses = {
		isVisible: 'is-active',
	}

	constructor() {
		this.rootElement = document.querySelector(this.selectors.root)
		this.formElement = this.rootElement.querySelector(
			this.selectors.formElement
		)
		this.openSearchButtonElement = this.rootElement.querySelector(
			this.selectors.openSearchButton
		)
		this.searchWrapperElement = this.rootElement.querySelector(
			this.selectors.searchWrapper
		)

		this.bindEvents()
	}

	onSearchButtonClick = () => {
		this.searchWrapperElement.classList.toggle(this.stateClasses.isVisible)
	}

	onDocumentClick = event => {
		const isOpened = this.searchWrapperElement.classList.contains(
			this.stateClasses.isVisible
		)
		const isClickInside = this.searchWrapperElement.contains(event.target)
		const isClickOnButton = this.openSearchButtonElement.contains(event.target)

		if (!isOpened || isClickInside || isClickOnButton) return

		this.searchWrapperElement.classList.remove(this.stateClasses.isVisible)
	}

	bindEvents() {
		this.openSearchButtonElement.addEventListener(
			'click',
			this.onSearchButtonClick
		)
		document.addEventListener('click', this.onDocumentClick)
	}
}

export default Search

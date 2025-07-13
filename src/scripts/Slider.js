import Swiper from 'swiper'
import 'swiper/css' // Базовые стили
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'

class SwiperElement {
	constructor(rootElement) {
		this.rootElement = rootElement

		this.swiper = new Swiper(this.rootElement, {
			modules: [Navigation, Pagination, Autoplay],
			loop: true,
			spaceBetween: 30,
			slidesPerView: 1,

			navigation: {
				nextEl: this.rootElement.querySelector('.swiper-button-next'),
				prevEl: this.rootElement.querySelector('.swiper-button-prev'),
			},

			pagination: {
				el: this.rootElement.querySelector('.swiper-pagination'),
				clickable: true,
			},

			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
			},
		})
	}
}

class SliderCollection {
	constructor() {
		this.init()
	}

	init() {
		document.querySelectorAll('.swiper').forEach(element => {
			new SwiperElement(element)
		})
	}
}

export default SliderCollection

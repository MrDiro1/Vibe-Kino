import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'

class SwiperElement {
	constructor(rootElement) {
		this.rootElement = rootElement

		const sliderType = rootElement.dataset.type || 'default'

		let config = {
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
		}

		if (sliderType === 'movie-scroll') {
			config = {
				...config,
				loop: false,
				slidesPerView: 6,
				slidesPerGroup: 6,
				autoplay: false,
			}
		}

		this.swiper = new Swiper(this.rootElement, config)
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

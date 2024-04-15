export const SwiperProductCarouselScrollbar = ({ entries }: { entries: any }) => {
	return (
		<div
			className="swiper-container overflow-visible"
			data-swiper
			data-options='{
    "spaceBetween": 25,
    "cssMode": true,
    "roundLengths": true,
    "scrollbar": {
      "el": ".swiper-scrollbar",
      "hide": false,
      "draggable": true
    },      
    "navigation": {
      "nextEl": ".swiper-next",
      "prevEl": ".swiper-prev"
    },  
    "breakpoints": {
      "576": {
        "slidesPerView": 1
      },
      "768": {
        "slidesPerView": 2
      },
      "992": {
        "slidesPerView": 3
      },
      "1200": {
        "slidesPerView": 4
      }            
    }
  }'
		>
			<div className="swiper-wrapper pb-5 pe-1">
				{entries.map((i: any) => (
					<div className="swiper-slide d-flex h-auto">
						{/* {{> listing-cards/listing-card this }} */}
					</div>
				))}

				<div className="swiper-slide d-flex h-auto justify-content-center align-items-center">
					<a
						href="/category.html"
						className="d-flex text-decoration-none flex-column justify-content-center align-items-center"
					>
						<span className="btn btn-dark btn-icon mb-3">
							<i className="ri-arrow-right-line ri-lg lh-1"></i>
						</span>
						<span className="lead fw-bolder">See All</span>
					</a>
				</div>
			</div>

			<div className="swiper-btn swiper-disabled-hide swiper-prev swiper-btn-side btn-icon bg-dark text-white ms-3 shadow-lg mt-n5 ms-n4">
				<i className="ri-arrow-left-s-line ri-lg"></i>
			</div>
			<div className="swiper-btn swiper-disabled-hide swiper-next swiper-btn-side swiper-btn-side-right btn-icon bg-dark text-white me-n4 shadow-lg mt-n5">
				<i className="ri-arrow-right-s-line ri-lg"></i>
			</div>

			<div className="swiper-scrollbar"></div>
		</div>
	);
};

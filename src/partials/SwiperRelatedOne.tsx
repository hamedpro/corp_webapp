import config from "../data/config.json";
import category_four from "../data/category-four.json";
export const SwiperRelatedOne = () => {
	return (
		<div
			className="swiper-container"
			data-swiper
			data-options='{
    "spaceBetween": 10,
    "loop": true,
    "navigation": {
      "nextEl": ".swiper-next",
      "prevEl": ".swiper-prev"
    },
    "pagination": {
      "el": ".swiper-pagination",
      "clickable": true
    },    
    "breakpoints": {
      "300": {
        "slidesPerView": 2
      },
      "700": {
        "slidesPerView": 3
      },       
      "999": {
        "slidesPerView": 4
      },
      "1024": {
        "slidesPerView": 5
      }
    }
  }'
		>
			<div className="swiper-wrapper mb-5">
				{category_four && (
					<>
						{category_four.entries.shoes.map((i) => (
							<div className="swiper-slide align-self-stretch bg-transparent h-auto">
								{/* {{> listing-cards/listing-card-five this }} */}
							</div>
						))}
					</>
				)}
			</div>

			<div className="swiper-pagination bottom-0"></div>

			<div className="swiper-prev top-50  start-0 z-index-30 cursor-pointer transition-all bg-white px-3 py-4 position-absolute z-index-30 top-50 start-0 mt-n8 d-flex justify-content-center align-items-center opacity-50-hover">
				<i className="ri-arrow-left-s-line ri-lg"></i>
			</div>
			<div className="swiper-next top-50 end-0 z-index-30 cursor-pointer transition-all bg-white px-3 py-4 position-absolute z-index-30 top-50 end-0 mt-n8 d-flex justify-content-center align-items-center opacity-50-hover">
				<i className="ri-arrow-right-s-line ri-lg"></i>
			</div>
		</div>
	);
};

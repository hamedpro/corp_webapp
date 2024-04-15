export const ImagesSlideshowVertical = () => {
	return (
		<div className="row g-1">
			<div className="swiper-container gallery-thumbs-vertical col-2 pb-4">
				<div className="swiper-wrapper">
					<div className="swiper-slide bg-light bg-light h-auto">
						<picture>
							<img
								className="img-fluid mx-auto d-table"
								src="/assets/images/products/product-5.jpg"
								alt="{{config.defaultImgAlt}}"
							/>
						</picture>
					</div>
					<div className="swiper-slide bg-light bg-light h-auto">
						<picture>
							<img
								className="img-fluid mx-auto d-table"
								src="/assets/images/products/product-5b.jpg"
								alt="{{config.defaultImgAlt}}"
							/>
						</picture>
					</div>
					<div className="swiper-slide bg-light bg-light h-auto">
						<picture>
							<img
								className="img-fluid mx-auto d-table"
								src="/assets/images/products/product-5c.jpg"
								alt="{{config.defaultImgAlt}}"
							/>
						</picture>
					</div>
				</div>
			</div>
			<div className="swiper-container gallery-top-vertical col-10">
				<div className="swiper-wrapper">
					<div className="swiper-slide bg-white h-auto">
						<picture>
							<img
								className="img-fluid d-table mx-auto"
								src="/assets/images/products/product-5.jpg"
								alt="{{config.defaultImgAlt}}"
								data-zoomable
							/>
						</picture>
					</div>
					<div className="swiper-slide bg-white h-auto">
						<picture>
							<img
								className="img-fluid d-table mx-auto"
								src="/assets/images/products/product-5b.jpg"
								alt="{{config.defaultImgAlt}}"
								data-zoomable
							/>
						</picture>
					</div>
					<div className="swiper-slide bg-white h-auto">
						<picture>
							<img
								className="img-fluid d-table mx-auto"
								src="/assets/images/products/product-5c.jpg"
								alt="{{config.defaultImgAlt}}"
								data-zoomable
							/>
						</picture>
					</div>
				</div>
			</div>
		</div>
	);
};

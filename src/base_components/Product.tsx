import { Navbar } from "../partials/Navbar";
import config from "../data/config.json";
import { Footer } from "../partials/Footer";
import category_products from "../data/category-products.json";
import { SwiperProductCarouselScrollbar } from "../partials/SwiperProductCarouselScrollbar";
import { BreadcrumbsOne } from "../partials/BreadcrumbsOne";
import { ImagesSlideshowVertical } from "../partials/ImagesSlideshowVertical";
import { InfoOne } from "../partials/InfoOne";
import { TabsOne } from "../partials/TabsOne";
export const Product = () => {
	return (
		<>
			<Navbar
				configClassList={config.classes.navbar}
				classList=""
			/>

			<section className={`mt-5 ${config.classes.content}`}>
				<section className="container">
					<BreadcrumbsOne />

					<div className="row g-5">
						<div className="col-12 col-lg-7">
							<ImagesSlideshowVertical />
						</div>

						<div className="col-12 col-lg-5">
							<InfoOne />
						</div>
					</div>
				</section>

				<section>
					<div className="mt-7 pt-5 border-top">
						<div className="container">
							<TabsOne />
						</div>
					</div>
				</section>

				<div className="container my-8">
					<h3 className="fs-4 fw-bold mb-5 text-center">You May Also Like</h3>
					{category_products.entries.length > 0 && (
						<SwiperProductCarouselScrollbar entries={category_products.entries} />
					)}
				</div>
			</section>

			<Footer
				configClassList={config.classes.footer}
				classList=""
			/>
		</>
	);
};

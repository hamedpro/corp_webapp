import { Navbar } from "../partials/Navbar";
import config from "../data/config.json";
import { CartItems } from "../partials/CartItems";
import { CartSummary } from "../partials/CartSummary";
import { Footer } from "../partials/Footer";
import { SearchOverlay } from "../partials/SearchOverlay";
import { BreadcrumbsTwo } from "../partials/BreadcrumbsTwo";
import { AsideMenuOne } from "../partials/AsideMenuOne";
import { ToolbarTop } from "../partials/ToolbarTop";
import category_products from "../data/category-products.json";
import { ListingCard } from "../partials/ListingCard";
import { Pagination } from "../partials/Pagination";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export const Category = () => {
	return (
		<>
			<Navbar
				configClassList={config.classes.navbar}
				classList="border-0"
			/>

			<section className="mt-0 {{ config.classes.content }}">
				<div
					className="py-6 bg-img-cover bg-dark bg-overlay-gradient-dark position-relative overflow-hidden mb-4 bg-pos-center-center"
					style={{ backgroundImage: "url(/assets/images/banners/banner-1.jpg)" }}
				>
					<div
						className="container position-relative z-index-20"
						data-aos="fade-right"
						data-aos-delay="300"
					>
						<BreadcrumbsTwo />
						<h1 className="fw-bold display-6 mb-4 text-white">Latest Arrivals (121)</h1>
						<div className="col-12 col-md-6">
							<p className="lead text-white mb-0">
								Move, stretch, jump and hike in our latest waterproof arrivals.
								We've got you covered for your hike or climbing sessions, from
								Gortex jackets to lightweight waterproof pants. Discover our latest
								range of outdoor clothing.
							</p>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row">
						<div className="d-none d-lg-flex col-lg-3">
							<div className="pe-4">
								<AsideMenuOne />
							</div>
						</div>

						<div className="col-12 col-lg-9">
							<ToolbarTop />

							<div className="row g-4 mb-5">
								{category_products.entries.slice(0, 4).map((i, index) => (
									<div
										className="col-12 col-sm-6 col-md-4"
										key={index}
									>
										<ListingCard {...i} />
									</div>
								))}
								<div className="d-none d-md-flex col-md-8">
									<div className="w-100 h-100 position-relative">
										<div
											className="position-absolute w-50 h-100 start-0 bottom-0 top-0 bg-pos-center-center bg-img-cover"
											style={{
												backgroundImage:
													"url(/assets/images/banners/banner-3.jpg)",
											}}
										></div>
										<div className="position-absolute w-50 h-100 bg-light end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
											<div className="px-4 text-center">
												<h4 className="fs-4 fw-bold mb-4">
													Built for adventure
												</h4>
												<p className="mb-4">
													The perfect grab-and-go layer for every hiking
													adventure
												</p>
												<Link
													to="#"
													className="text-link-border border-2 pb-1 fw-bolder"
												>
													Shop Now
												</Link>
											</div>
										</div>
									</div>
								</div>
								{category_products.entries.slice(0, 6).map((i, index) => (
									<div
										className="col-12 col-sm-6 col-md-4"
										key={index}
									>
										<ListingCard {...i} />
									</div>
								))}{" "}
							</div>

							<Pagination />

							<div className="border-top mt-5 pt-5">
								<p className="lead fw-bolder">Related Categories</p>
								<div className="d-flex flex-wrap justify-content-start align-items-center">
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Hiking Shoes
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Waterproof Trousers
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Hiking Shirts
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Jackets
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Gilets
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Hiking Socks
									</Link>
									<Link
										className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mb-md-0 text-white-hover"
										to="#"
									>
										Rugsacks
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer
				configClassList={config.classes.footer}
				classList=""
			/>
		</>
	);
};

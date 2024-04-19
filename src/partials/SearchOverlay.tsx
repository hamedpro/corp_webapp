import { ListingCard } from "./ListingCard";

export const SearchOverlay = () => {
	return (
		<section className="search-overlay">
			<div className="container search-container">
				<div className="py-5">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<p className="lead lh-1 m-0 fw-bold">What are you looking for?</p>
						<button className="btn btn-light btn-close-search">
							<i className="ri-close-circle-line align-bottom"></i> Close search
						</button>
					</div>
					<form>
						<input
							type="text"
							className="form-control"
							id="searchForm"
							placeholder="Search by product or category name..."
						/>
					</form>
					<div className="my-5">
						<p className="lead fw-bolder">
							2 results found for <span className="fw-bold">"Waterproof Jacket"</span>
						</p>
						<div className="row">
							<div className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-0">
								<ListingCard
									img="/assets/images/products/product-1.jpg"
									title="Mens Pennie II Waterproof Jacket"
									currency="$"
									price="325.66"
									review_width="80%"
									review_count="4.2 (123)"
								/>
							</div>
							<div className="col-12 col-md-6 col-lg-3">
								<ListingCard
									img="/assets/images/products/product-2.jpg"
									title="Mens Storm Waterproof Jacket"
									currency="$"
									price="499.99"
									review_width="70%"
									review_count="4.5 (1289)"
								/>
							</div>
						</div>
					</div>

					<div className="bg-dark p-4 text-white">
						<p className="lead m-0">
							Didn't find what you are looking for?{" "}
							<a
								className="transition-all opacity-50-hover text-white text-link-border border-white pb-1 border-2"
								href="#"
							>
								Send us a message.
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

import { ReviewStarsSmall } from "./ReviewStarsSmall";

export const ReviewsCustomers = () => {
	return (
		<section className="reviews">
			<div className="col-lg-12 text-center pb-5">
				<h2 className="fs-1 fw-bold d-flex align-items-center justify-content-center">
					4.88{" "}
					<small className="text-muted fw-bolder ms-3 fw-bolder fs-6">
						(1288 reviews)
					</small>
				</h2>
				<div className="d-flex justify-content-center">
					<ReviewStarsSmall />
				</div>

				<div className="bg-light rounded py-3 px-4 mt-3 col-12 col-md-6 col-lg-5 mx-auto">
					<ul className="list-group list-group-flush">
						<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 bg-transparent">
							<span className="fw-bolder">Fit</span>
							<ReviewStarsSmall width={"25%"} />
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 bg-transparent">
							<span className="fw-bolder">Value for money</span>
							<ReviewStarsSmall width={"75%"} />
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 bg-transparent">
							<span className="fw-bolder">Build quality</span>
							<ReviewStarsSmall width={"65%"} />
						</li>
						<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 bg-transparent">
							<span className="fw-bolder">Style</span>
							<ReviewStarsSmall width={"90%"} />
						</li>
					</ul>
				</div>

				<button
					type="button"
					className="btn btn-dark mt-4 hover-lift-sm hover-boxshadow disable-child-pointer"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasReview"
					aria-controls="offcanvasReview"
				>
					Write A Review <i className="ri-discuss-line align-bottom ms-1"></i>
				</button>
			</div>

			<article className="py-5 border-bottom border-top">
				<div className="row">
					<div className="col-12 col-md-4">
						<small className="text-muted fw-bolder">08/12/2021</small>
						<p className="fw-bolder">Ben Sandhu, Ireland</p>
						<span className="bg-success-faded fs-xs fw-bolder text-uppercase p-2">
							Verified Customer
						</span>
					</div>
					<div className="col-12 col-md-8 mt-4 mt-md-0">
						<ReviewStarsSmall width={"80%"} />
						<p className="fw-bolder mt-4">Happy with this considering the price</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi,
							architecto placeat nam officia sapiente ipsam at dolorum quisquam, ipsa
							earum qui laboriosam. Pariatur recusandae nihil, architecto
							reprehenderit perferendis obcaecati. Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Distinctio sint nesciunt velit quae,
							quisquam ullam veritatis itaque repudiandae. Inventore quae doloribus
							modi nihil illum accusamus voluptas suscipit neque perferendis totam!
						</p>

						<small className="fw-bolder bg-light d-table rounded py-1 px-2">
							Yes, I would recommend the product
						</small>
						<div className="d-block d-md-flex mt-3 justify-content-between align-items-center">
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start"
								title=""
							>
								<small>
									Was this review helpful?
									<i className="ri-thumb-up-line ms-4"></i> 112{" "}
									<i className="ri-thumb-down-line ms-2"></i>
									23
								</small>
							</a>
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start mt-3 mt-md-0"
								title=""
							>
								<small>
									Flag as inappropriate <i className="ri-flag-2-line ms-2"></i>
								</small>
							</a>
						</div>
					</div>
				</div>
			</article>

			<article className="py-5 border-bottom ">
				<div className="row">
					<div className="col-12 col-md-4">
						<small className="text-muted fw-bolder">08/12/2021</small>
						<p className="fw-bolder">Patricia Smith, London</p>
						<span className="bg-success-faded fs-xs fw-bolder text-uppercase p-2">
							Verified Customer
						</span>
					</div>
					<div className="col-12 col-md-8 mt-4 mt-md-0">
						<ReviewStarsSmall width={"80%"} />
						<p className="fw-bolder mt-4">Very happy with my purchase so far...</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi,
							architecto placeat nam officia sapiente ipsam at dolorum quisquam, ipsa
							earum qui laboriosam. Pariatur recusandae nihil, architecto
							reprehenderit perferendis obcaecati. Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Distinctio sint nesciunt velit quae,
							quisquam ullam veritatis itaque repudiandae. Inventore quae doloribus
							modi nihil illum accusamus voluptas suscipit neque perferendis totam!
						</p>

						<small className="fw-bolder bg-light d-table rounded py-1 px-2">
							Yes, I would recommend the product
						</small>
						<div className="d-block d-md-flex mt-3 justify-content-between align-items-center">
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start"
								title=""
							>
								<small>
									Was this review helpful?
									<i className="ri-thumb-up-line ms-4"></i> 112{" "}
									<i className="ri-thumb-down-line ms-2"></i>
									23
								</small>
							</a>
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start mt-3 mt-md-0"
								title=""
							>
								<small>
									Flag as inappropriate <i className="ri-flag-2-line ms-2"></i>
								</small>
							</a>
						</div>
					</div>
				</div>
			</article>

			<article className="py-5 border-bottom ">
				<div className="row">
					<div className="col-12 col-md-4">
						<small className="text-muted fw-bolder">08/12/2021</small>
						<p className="fw-bolder">Jack Jones, Scotland</p>
						<span className="bg-success-faded fs-xs fw-bolder text-uppercase p-2">
							Verified Customer
						</span>
					</div>
					<div className="col-12 col-md-8 mt-4 mt-md-0">
						<ReviewStarsSmall width={"80%"} />
						<p className="fw-bolder mt-4">
							I wish it was a little cheaper - otherwise love this!
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi,
							architecto placeat nam officia sapiente ipsam at dolorum quisquam, ipsa
							earum qui laboriosam. Pariatur recusandae nihil, architecto
							reprehenderit perferendis obcaecati. Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Distinctio sint nesciunt velit quae,
							quisquam ullam veritatis itaque repudiandae. Inventore quae doloribus
							modi nihil illum accusamus voluptas suscipit neque perferendis totam!
						</p>

						<small className="fw-bolder bg-light d-table rounded py-1 px-2">
							Yes, I would recommend the product
						</small>
						<div className="d-block d-md-flex mt-3 justify-content-between align-items-center">
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start"
								title=""
							>
								<small>
									Was this review helpful?
									<i className="ri-thumb-up-line ms-4"></i> 112{" "}
									<i className="ri-thumb-down-line ms-2"></i>
									23
								</small>
							</a>
							<a
								href="#"
								className="btn btn-link text-muted p-0 text-decoration-none w-100 w-md-auto fw-bolder text-start mt-3 mt-md-0"
								title=""
							>
								<small>
									Flag as inappropriate <i className="ri-flag-2-line ms-2"></i>
								</small>
							</a>
						</div>
					</div>
				</div>
			</article>

			<a
				href="#"
				className="btn btn-dark d-table mx-auto mt-6 mb-3 hover-lift-sm hover-boxshadow"
				title=""
			>
				Load More Reviews
			</a>
			<p className="text-muted text-center fw-bolder">Showing 3 of 1234</p>
		</section>
	);
};

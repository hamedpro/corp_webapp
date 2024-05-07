import { Link } from "react-router-dom";

export const BannerSaleExtended: React.FC = () => {
	return (
		<>
			<div className="position-absolute text-white z-index-50 top-0 end-0 start-0">
				<img src="/svg-divider-top-lr" />
				{/* {> svg/svg-divider-top-lr } */}
			</div>

			<div className="py-7 py-lg-10">
				<div className="container text-white py-4 py-md-6">
					<div className="row g-5 align-items-center">
						<div
							className="col-12 col-lg-4 justify-content-center d-flex justify-content-lg-start"
							data-aos="fade-right"
							data-aos-delay="250"
						>
							<h3 className="fs-1 fw-bold mb-0 lh-1">
								<i className="ri-timer-flash-line align-bottom"></i> Sale Extended
							</h3>
						</div>
						<div
							className="col-12 col-lg-4 d-flex justify-content-center flex-column"
							data-aos="fade-up"
							data-aos-delay="250"
						>
							<Link
								to={"/category"}
								className="btn btn-orange btn-orange-chunky text-white my-1"
							>
								<span>Shop Menswear</span>
							</Link>

							<Link
								to="/category"
								className="btn btn-orange btn-orange-chunky text-white my-1"
							>
								<span>Shop Womenswear</span>
							</Link>
							<Link
								to="/category"
								className="btn btn-orange btn-orange-chunky text-white my-1"
							>
								<span>Shop Kidswear</span>
							</Link>
							<Link
								to="/category"
								className="btn btn-orange btn-orange-chunky text-white my-1"
							>
								<span>Shop Accessories</span>
							</Link>
						</div>
						<div
							className="col-12 col-lg-4 text-center text-lg-end"
							data-aos="fade-left"
							data-aos-delay="250"
						>
							<p className="lead fw-bolder">
								Discount applied to products at checkout.
							</p>
							<Link
								className="text-white fw-bolder text-link-border border-2 border-white align-self-start pb-1 transition-all opacity-50-hover"
								to="#"
							>
								Exclusions apply. Learn more{" "}
								<i className="ri-arrow-right-line align-bottom"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="position-absolute z-index-50 text-white bottom-0 start-0 end-0">
				<img src="/svg-divider-bottom-rl.svg" />
				{/* {> svg/svg-divider-bottom-rl colorclassName="text-white" positionclassName="bottom-0 start-0 end-0" } */}
			</div>
		</>
	);
};

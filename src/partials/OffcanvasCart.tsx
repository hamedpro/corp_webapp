import { Link } from "react-router-dom";
import config from "../data/config.json";
export const OffcanvasCart = () => {
	return (
		<div
			className="offcanvas offcanvas-end d-none"
			tabIndex={-1}
			id="offcanvasCart"
		>
			<div className="offcanvas-header d-flex align-items-center">
				<h5
					className="offcanvas-title"
					id="offcanvasCartLabel"
				>
					Your Cart
				</h5>
				<button
					type="button"
					className="btn-close text-reset"
					data-bs-dismiss="offcanvas"
					aria-label="Close"
				></button>
			</div>
			<div className="offcanvas-body">
				<div className="d-flex flex-column justify-content-between w-100 h-100">
					<div>
						<div className="mt-4 mb-5">
							<p className="mb-2 fs-6">
								<i className="ri-truck-line align-bottom me-2"></i>{" "}
								<span className="fw-bolder">$22</span> away from free delivery
							</p>
							<div className="progress f-h-1">
								<div
									className="progress-bar bg-success"
									role="progressbar"
									style={{ width: "25%" }}
									aria-valuenow={25}
									aria-valuemin={0}
									aria-valuemax={100}
								></div>
							</div>
						</div>

						<div className="row mx-0 pb-4 mb-4 border-bottom">
							<div className="col-3">
								<picture className="d-block bg-light">
									<img
										className="img-fluid"
										src="/assets/images/products/product-1.jpg"
										alt={config.defaultImgAlt}
									/>
								</picture>
							</div>
							<div className="col-9">
								<div>
									<h6 className="justify-content-between d-flex align-items-start mb-2">
										Mens StormBreaker Jacket
										<i className="ri-close-line"></i>
									</h6>
									<small className="d-block text-muted fw-bolder">
										Size: Medium
									</small>
									<small className="d-block text-muted fw-bolder">Qty: 1</small>
								</div>
								<p className="fw-bolder text-end m-0">$85.00</p>
							</div>
						</div>

						<div className="row mx-0 pb-4 mb-4 border-bottom">
							<div className="col-3">
								<picture className="d-block bg-light">
									<img
										className="img-fluid"
										src="/assets/images/products/product-2.jpg"
										alt={config.defaultImgAlt}
									/>
								</picture>
							</div>
							<div className="col-9">
								<div>
									<h6 className="justify-content-between d-flex align-items-start mb-2">
										Mens Torrent Terrain Jacket
										<i className="ri-close-line"></i>
									</h6>
									<small className="d-block text-muted fw-bolder">
										Size: Medium
									</small>
									<small className="d-block text-muted fw-bolder">Qty: 1</small>
								</div>
								<p className="fw-bolder text-end m-0">$99.00</p>
							</div>
						</div>
					</div>
					<div className="border-top pt-3">
						<div className="d-flex justify-content-between align-items-center">
							<p className="m-0 fw-bolder">Subtotal</p>
							<p className="m-0 fw-bolder">$233.33</p>
						</div>
						<Link
							to="/checkout"
							className="btn btn-orange btn-orange-chunky mt-5 mb-2 d-block text-center"
						>
							Checkout
						</Link>
						<Link
							to="/cart"
							className="btn btn-dark fw-bolder d-block text-center transition-all opacity-50-hover"
						>
							View Cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

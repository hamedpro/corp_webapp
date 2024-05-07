import { Link } from "react-router-dom";

export const InfoBoxes = () => {
	return (
		<div className="row">
			<div
				className="col-12 col-md-4 mb-3 mb-xxl-0 text-white"
				data-aos="fade-left"
			>
				<div className="border-white-opacity border-2 p-4 d-flex flex-column flex-lg-row justify-content-start align-items-start h-100">
					<i className="ri-questionnaire-line ri-lg mb-3 mb-lg-0"></i>
					<div className="ms-lg-4">
						<p className="mb-1 lh-1 fw-bold">Customer Services</p>
						<small className="text-muted">
							<Link
								className="text-muted"
								to="#"
							>
								Click here
							</Link>{" "}
							to chat with our support team
						</small>
					</div>
				</div>
			</div>

			<div
				className="col-12 col-md-4 mb-3 mb-xxl-0 text-white"
				data-aos="fade-left"
				data-aos-delay="250"
			>
				<div className="border-white-opacity border-2 p-4 d-flex flex-column flex-lg-row justify-content-start align-items-start h-100">
					<i className="ri-truck-line ri-lg mb-3 mb-lg-0"></i>
					<div className="ms-lg-4">
						<p className="mb-1 lh-1 fw-bold">Free Delivery</p>
						<small className="text-muted">
							Free standard delivery on all orders over $100
						</small>
					</div>
				</div>
			</div>

			<div
				className="col-12 col-md-4 mb-3 mb-xxl-0 text-white"
				data-aos="fade-left"
				data-aos-delay="500"
			>
				<div className="border-white-opacity border-2 p-4 d-flex flex-column flex-lg-row justify-content-start align-items-start h-100">
					<i className="ri-repeat-line ri-lg mb-3 mb-lg-0"></i>
					<div className="ms-lg-4">
						<p className="mb-1 lh-1 fw-bold">Returns</p>
						<small className="text-muted">
							30 day money-back returns if you change your mind
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

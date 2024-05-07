import { Link } from "react-router-dom";
import cart_items from "../data/cart-items.json";
import config from "../data/config.json";
export const CheckoutSummary = () => {
	return (
		<div className="bg-light p-4 sticky-md-top top-5">
			<div className="border-bottom pb-3">
				{cart_items.entries.map(
					({ qty, title, options, "line-total": lineTotal, currency, img }, index) => (
						<div
							className="d-none d-md-flex justify-content-between align-items-start py-2"
							key={index}
						>
							<div className="d-flex flex-grow-1 justify-content-start align-items-start">
								<div className="position-relative f-w-20 border p-2 me-4">
									<span className="checkout-item-qty">{qty}</span>
									<img
										src={img}
										alt={config.defaultImgAlt}
										className="rounded img-fluid"
									/>
								</div>
								<div>
									<p className="mb-1 fs-6 fw-bolder">{title}</p>
									<span className="fs-xs text-uppercase fw-bolder text-muted">
										{options}
									</span>
								</div>
							</div>
							<div className="flex-shrink-0 fw-bolder">
								<span>
									{currency}
									{lineTotal}
								</span>
							</div>
						</div>
					)
				)}
			</div>
			<div className="py-3 border-bottom">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<p className="m-0 fw-bolder fs-6">Subtotal</p>
					<p className="m-0 fs-6 fw-bolder">$422.99</p>
				</div>
				<div className="d-flex justify-content-between align-items-center ">
					<p className="m-0 fw-bolder fs-6">Shipping</p>
					<p className="m-0 fs-6 fw-bolder">$8.95</p>
				</div>
			</div>
			<div className="py-3 border-bottom">
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<p className="m-0 fw-bold fs-5">Grand Total</p>
						<span className="text-muted small">Inc $45.89 sales tax</span>
					</div>
					<p className="m-0 fs-5 fw-bold">$422.99</p>
				</div>
			</div>
			<div className="py-3 border-bottom">
				<div className="input-group mb-0">
					<input
						type="text"
						className="form-control"
						placeholder="Enter your coupon code"
					/>
					<button className="btn btn-dark btn-sm px-4">Apply</button>
				</div>
			</div>

			<div className="form-group form-check my-4">
				<input
					type="checkbox"
					className="form-check-input"
					id="accept-terms"
					checked
				/>
				<label
					className="form-check-label fw-bolder"
					htmlFor="accept-terms"
				>
					I agree to Alpine's <Link to="#">terms & conditions</Link>
				</label>
			</div>
			<Link
				to="#"
				className="btn btn-dark w-100"
				role="button"
			>
				Complete Order
			</Link>
		</div>
	);
};

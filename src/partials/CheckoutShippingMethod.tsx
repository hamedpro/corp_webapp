export const CheckoutShippingMethod = () => {
	return (
		<div className="checkout-panel">
			<h5 className="title-checkout">Shipping Method</h5>

			<div className="form-check form-group form-check-custom form-radio-custom mb-3">
				<input
					className="form-check-input"
					type="radio"
					name="checkoutShippingMethod"
					id="checkoutShippingMethodOne"
					checked
				/>
				<label
					className="form-check-label"
					htmlFor="checkoutShippingMethodOne"
				>
					<span className="d-flex justify-content-between align-items-start w-100">
						<span>
							<span className="mb-0 fw-bolder d-block">Click & Collect Shipping</span>
							<small className="fw-bolder">Collect from our London store</small>
						</span>
						<span className="small fw-bolder text-uppercase">Free</span>
					</span>
				</label>
			</div>

			<div className="form-check form-group form-check-custom form-radio-custom mb-3">
				<input
					className="form-check-input"
					type="radio"
					name="checkoutShippingMethod"
					id="checkoutShippingMethodTwo"
				/>
				<label
					className="form-check-label"
					htmlFor="checkoutShippingMethodTwo"
				>
					<span className="d-flex justify-content-between align-items-start">
						<span>
							<span className="mb-0 fw-bolder d-block">UPS Next Day</span>
							<small className="fw-bolder">
								For all orders placed before 1pm Monday to Thursday
							</small>
						</span>
						<span className="small fw-bolder text-uppercase">$19.99</span>
					</span>
				</label>
			</div>

			<div className="form-check form-group form-check-custom form-radio-custom mb-3">
				<input
					className="form-check-input"
					type="radio"
					name="checkoutShippingMethod"
					id="checkoutShippingMethodThree"
				/>
				<label
					className="form-check-label"
					htmlFor="checkoutShippingMethodThree"
				>
					<span className="d-flex justify-content-between align-items-start">
						<span>
							<span className="mb-0 fw-bolder d-block">DHL Priority Service</span>
							<small className="fw-bolder">24 - 36 hour delivery</small>
						</span>
						<span className="small fw-bolder text-uppercase">$9.99</span>
					</span>
				</label>
			</div>
		</div>
	);
};

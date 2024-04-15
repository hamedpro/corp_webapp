export const CheckoutPayment = () => {
	return (
		<div className="checkout-panel">
			<h5 className="title-checkout">Payment Information</h5>

			<div className="row">
				<div className="col-12">
					<div className="form-check form-group form-check-custom form-radio-custom mb-3">
						<input
							className="form-check-input"
							type="radio"
							name="checkoutPaymentMethod"
							id="checkoutPaymentStripe"
							checked
						/>
						<label
							className="form-check-label"
							htmlFor="checkoutPaymentStripe"
						>
							<span className="d-flex justify-content-between align-items-start">
								<span>
									<span className="mb-0 fw-bolder d-block">
										Credit Card (Stripe)
									</span>
								</span>
								<i className="ri-bank-card-line"></i>
							</span>
						</label>
					</div>
				</div>

				<div className="col-12">
					<div className="form-check form-group form-check-custom form-radio-custom mb-3">
						<input
							className="form-check-input"
							type="radio"
							name="checkoutPaymentMethod"
							id="checkoutPaymentPaypal"
						/>
						<label
							className="form-check-label"
							htmlFor="checkoutPaymentPaypal"
						>
							<span className="d-flex justify-content-between align-items-start">
								<span>
									<span className="mb-0 fw-bolder d-block">PayPal</span>
								</span>
								<i className="ri-paypal-line"></i>
							</span>
						</label>
					</div>
				</div>
			</div>

			<div className="card-details">
				<div className="row pt-3">
					<div className="col-md-12">
						<div className="form-group">
							<label
								htmlFor="cc-name"
								className="form-label"
							>
								Name on card
							</label>
							<input
								type="text"
								className="form-control"
								id="cc-name"
								placeholder=""
								required
							/>
							<small className="text-muted">Full name as displayed on card</small>
						</div>
					</div>

					<div className="col-md-12">
						<div className="form-group">
							<label
								htmlFor="cc-number"
								className="form-label"
							>
								Credit card number
							</label>
							<input
								type="text"
								className="form-control"
								id="cc-number"
								placeholder=""
								required
							/>
						</div>
					</div>

					<div className="col-md-6">
						<div className="form-group">
							<label
								htmlFor="cc-expiration"
								className="form-label"
							>
								Expiration
							</label>
							<input
								type="text"
								className="form-control"
								id="cc-expiration"
								placeholder=""
								required
							/>
						</div>
					</div>

					<div className="col-md-6">
						<div className="form-group">
							<div className="d-flex">
								<label
									htmlFor="cc-cvv"
									className="form-label d-flex w-100 justify-content-between align-items-center"
								>
									Security Code
								</label>
								<button
									type="button"
									className="btn btn-link p-0 fw-bolder fs-xs text-nowrap"
									data-bs-toggle="tooltip"
									data-bs-placement="top"
									title="A CVV is a number on your credit card or debit card that's in addition to your credit card number and expiration date"
								>
									What's this?
								</button>
							</div>
							<input
								type="text"
								className="form-control"
								id="cc-cvv"
								placeholder=""
								required
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="paypal-details bg-light p-4 d-none mt-3 fw-bolder">
				Please click on complete order. You will then be transferred to Paypal to enter your
				payment details.
			</div>
		</div>
	);
};

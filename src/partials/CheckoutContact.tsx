export const CheckoutContact = () => {
	return (
		<div className="checkout-panel">
			<h5 className="title-checkout">Contact Information</h5>
			<div className="row">
				<div className="col-12">
					<div className="form-group">
						<label
							htmlFor="email"
							className="form-label"
						>
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="you@example.com"
						/>
					</div>

					<div className="form-group form-check m-0">
						<input
							type="checkbox"
							className="form-check-input"
							id="add-mailinglist"
							checked
						/>
						<label
							className="form-check-label"
							htmlFor="add-mailinglist"
						>
							Keep me updated with your latest news and offers
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

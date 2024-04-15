export const CartSummary = () => {
	return (
		<>
			<div className="bg-dark p-4 p-md-5 text-white">
				<h3 className="fs-3 fw-bold m-0 text-center">Order Summary</h3>
				<div className="py-3 border-bottom-white-opacity">
					<div className="d-flex justify-content-between align-items-center mb-2 flex-column flex-sm-row">
						<p className="m-0 fw-bolder fs-6">Subtotal</p>
						<p className="m-0 fs-6 fw-bolder">$422.99</p>
					</div>
					<div className="d-flex justify-content-between align-items-center flex-column flex-sm-row mt-3 m-sm-0">
						<p className="m-0 fw-bolder fs-6">Shipping</p>
						<span className="text-white opacity-75 small">Will be set at checkout</span>
					</div>
				</div>
				<div className="py-3 border-bottom-white-opacity">
					<div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
						<div>
							<p className="m-0 fs-5 fw-bold">Grand Total</p>
							<span className="text-white opacity-75 small">
								Inc $45.89 sales tax
							</span>
						</div>
						<p className="mt-3 m-sm-0 fs-5 fw-bold">$422.99</p>
					</div>
				</div>

				<button
					className="btn btn-link p-0 mt-2 text-white fw-bolder text-decoration-none"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					Have a coupon code?
				</button>
				<div
					className="collapse"
					id="collapseExample"
				>
					<div className="card card-body bg-transparent p-0">
						<div className="input-group mb-0 mt-2">
							<input
								type="text"
								className="form-control border-0"
								placeholder="Enter coupon code"
							/>
							<button className="btn btn-white text-dark px-3 btn-sm border-0 d-flex justify-content-center align-items-center">
								<i className="ri-checkbox-circle-line ri-lg"></i>
							</button>
						</div>
					</div>
				</div>

				<a
					href="/checkout.html"
					className="btn btn-white w-100 text-center mt-3"
					role="button"
				>
					<i className="ri-secure-payment-line align-bottom"></i> Proceed to checkout
				</a>
				<a
					href="/checkout.html"
					className="btn btn-orange w-100 text-center mt-3"
					role="button"
				>
					<i className="ri-paypal-line align-bottom"></i> Checkout with PayPal
				</a>
			</div>
			<ul className="list-unstyled d-flex justify-content-center mt-3">
				<li className="mx-1 border d-flex align-items-center p-2">
					<i className="pi pi-paypal"></i>
				</li>
				<li className="mx-1 border d-flex align-items-center p-2">
					<i className="pi pi-mastercard"></i>
				</li>
				<li className="mx-1 border d-flex align-items-center p-2">
					<i className="pi pi-american-express"></i>
				</li>
				<li className="mx-1 border d-flex align-items-center p-2">
					<i className="pi pi-visa"></i>
				</li>
			</ul>
		</>
	);
};

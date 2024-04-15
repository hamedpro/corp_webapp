export const TabsOne = () => {
	return (
		<>
			<ul
				className="nav justify-content-center nav-tabs nav-tabs-border mb-4"
				id="myTab"
				role="tablist"
			>
				<li
					className="nav-item w-100 mb-2 mb-sm-0 w-sm-auto mx-sm-3"
					role="presentation"
				>
					<a
						className="nav-link fs-5 fw-bolder nav-link-underline mx-sm-3 px-0 active"
						id="details-tab"
						data-bs-toggle="tab"
						href="#details"
						role="tab"
						aria-controls="details"
						aria-selected="true"
					>
						The Details
					</a>
				</li>
				<li
					className="nav-item w-100 mb-2 mb-sm-0 w-sm-auto mx-sm-3"
					role="presentation"
				>
					<a
						className="nav-link fs-5 fw-bolder nav-link-underline mx-sm-3 px-0"
						id="reviews-tab"
						data-bs-toggle="tab"
						href="#reviews"
						role="tab"
						aria-controls="reviews"
						aria-selected="false"
					>
						Reviews
					</a>
				</li>
				<li
					className="nav-item w-100 mb-2 mb-sm-0 w-sm-auto mx-sm-3"
					role="presentation"
				>
					<a
						className="nav-link fs-5 fw-bolder nav-link-underline mx-sm-3 px-0"
						id="delivery-tab"
						data-bs-toggle="tab"
						href="#delivery"
						role="tab"
						aria-controls="delivery"
						aria-selected="false"
					>
						Delivery
					</a>
				</li>
				<li
					className="nav-item w-100 mb-2 mb-sm-0 w-sm-auto mx-sm-3"
					role="presentation"
				>
					<a
						className="nav-link fs-5 fw-bolder nav-link-underline mx-sm-3 px-0"
						id="returns-tab"
						data-bs-toggle="tab"
						href="#returns"
						role="tab"
						aria-controls="returns"
						aria-selected="false"
					>
						Returns
					</a>
				</li>
			</ul>
			<div
				className="tab-content"
				id="myTabContent"
			>
				<div
					className="tab-pane fade show active py-5"
					id="details"
					role="tabpanel"
					aria-labelledby="details-tab"
				>
					<div className="col-12 col-lg-10 mx-auto">
						<div className="row g-5">
							<div className="col-12 col-md-6">
								<p>
									Soft, stretchy - the most flattering product of the season! What
									could be easier? Beautifully soft and light cotton-modal jersey,
									with the extra advantage of stretch, cut in an A-line - the
									universally flattering shape for every body. We promise you,
									once you've tried these lovely products - you'll be hooked..
								</p>
							</div>
							<div className="col-12 col-md-6">
								<ul>
									<li>Stretchy cotton-modal jersey stripe</li>
									<li>Garment washed</li>
									<li>Flat, covered elastic waistband</li>
									<li>58% pima cotton/38% viscose </li>
									<li>Modal/4% Lycra® elastane</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div
					className="tab-pane fade py-5"
					id="reviews"
					role="tabpanel"
					aria-labelledby="reviews-tab"
				>
					{/* {{} > reviews / reviews - customers}} */}
				</div>

				<div
					className="tab-pane fade py-5"
					id="delivery"
					role="tabpanel"
					aria-labelledby="delivery-tab"
				>
					<div className="col-12 col-md-10 col-lg-8 mx-auto">
						<p>
							We are now offering contact-free delivery so that you can still receive
							your parcels safely without requiring a signature. Please see below for
							the available delivery methods, costs and timescales.
						</p>
						<ul className="list-group list-group-flush mb-4">
							<li className="list-group-item d-flex justify-content-between align-items-center px-0 py-4 bg-transparent">
								<div>
									<span className="fw-bolder d-block">Standard Delivery</span>
									<span className="text-muted">
										Delivery within 5 days of placing your order.
									</span>
								</div>
								<p className="m-0 lh-1 fw-bolder">$12.99</p>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center px-0 py-4 bg-transparent">
								<div>
									<span className="fw-bolder d-block">Priority Delivery</span>
									<span className="text-muted">
										Delivery within 2 days of placing your order.
									</span>
								</div>
								<p className="m-0 lh-1 fw-bolder">$17.99</p>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center px-0 py-4 bg-transparent">
								<div>
									<span className="fw-bolder d-block">Next Day Delivery</span>
									<span className="text-muted">
										Delivery within 24 hours of placing your order.
									</span>
								</div>
								<p className="m-0 lh-1 fw-bolder">$33.99</p>
							</li>
						</ul>
						<div className="bg-light rounded p-3">
							<p className="fs-6">
								Form more information, please see our delivery FAQs{" "}
								<a href="#">here</a>
							</p>
							<p className="m-0 fs-6">
								If you do not find the answer to your query, please contact our
								customer support team on
								<b>0800 123 456</b> or email us at <b>support@domain.com</b>. We aim
								to respond within 48 hours to queries.
							</p>
						</div>
					</div>
				</div>

				<div
					className="tab-pane fade py-5"
					id="returns"
					role="tabpanel"
					aria-labelledby="returns-tab"
				>
					<div className="col-12 col-md-10 col-lg-8 mx-auto">
						<p>
							We believe you will completely happy with your item, however if you
							aren't, there's no need to worry. We've listed below the ways you can
							return your item to us.
						</p>
						<ul className="list-group list-group-flush mb-4">
							<li className="list-group-item px-0 py-4 bg-transparent">
								<p className="fw-bolder">Return via post</p>
								<p className="fs-6">
									To return your items for free through the postal system, please
									complete the returns form that comes with your order. You'll
									find a label at the bottom of the form. Simply peel the label
									and head to your nearest post office.
								</p>
							</li>
							<li className="list-group-item px-0 py-4 bg-transparent">
								<p className="fw-bolder">Return in person</p>
								<p className="fs-6">
									To return your items for free in person, simply stop into any
									one of our locations and speak to a member of our in-store team.
								</p>
							</li>
						</ul>
						<div className="bg-light rounded p-3">
							<p className="fs-6">
								Form more information, please see our returns FAQs{" "}
								<a href="#">here</a>
							</p>
							<p className="m-0 fs-6">
								If you do not find the answer to your query, please contact our
								customer support team on
								<b>0800 123 456</b> or email us at <b>support@domain.com</b>. We aim
								to respond within 48 hours to queries.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

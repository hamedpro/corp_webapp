export const InfoOne = () => {
	return (
		<div className="pb-3">
			<div className="d-flex justify-content-between align-items-center mb-2">
				<p className="small fw-bolder text-uppercase tracking-wider text-muted mb-0 lh-1">
					Billabong
				</p>
				<div className="d-flex justify-content-start align-items-center">
					{/* {{> reviews/review-stars-small }} */}
					<small className="text-muted d-inline-block ms-2 fs-bolder">(1288)</small>
				</div>
			</div>
			<h1 className="mb-2 fs-2 fw-bold">Coastline Plus Waterproof Stormbreaker</h1>
			<div className="d-flex justify-content-start align-items-center">
				<p className="lead fw-bolder m-0 fs-3 lh-1 text-danger me-2">$84.99</p>
				<s className="lh-1 me-2">
					<span className="fw-bolder m-0">$94.99</span>
				</s>
				<p className="lead fw-bolder m-0 fs-6 lh-1 text-success">Save $10.00</p>
			</div>

			<div className="d-flex justify-content-start mt-3">
				<div className="alert bg-light rounded py-1 px-2 d-table m-0">
					<div className="d-flex justify-content-start align-items-center">
						<i className="ri-fire-fill lh-1 text-orange"></i>
						<div className="ms-2">
							<small className="opacity-75 fw-bolder lh-1">167 views today</small>
						</div>
					</div>
				</div>
			</div>

			<div className="border-top mt-4 mb-3">
				<div className="product-option mb-4 mt-4">
					<small className="text-uppercase d-block fw-bolder mb-2">
						Colour : <span className="selected-option fw-bold">Crimson Blue</span>
					</small>
					<div className="d-flex justify-content-start">
						<div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom">
							<input
								type="radio"
								className="form-check-color-input"
								id="option-colour-1"
								name="option-colour"
								value="Dark Black"
							/>
							<label
								className="form-check-label"
								htmlFor="option-colour-1"
							></label>
						</div>
						<div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-warning">
							<input
								type="radio"
								className="form-check-color-input"
								id="option-colour-2"
								name="option-colour"
								value="Sun Yellow"
							/>
							<label
								className="form-check-label"
								htmlFor="option-colour-2"
							></label>
						</div>
						<div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-info">
							<input
								type="radio"
								className="form-check-color-input"
								id="option-colour-3"
								name="option-colour"
								value="Crimson Blue"
								checked
							/>
							<label
								className="form-check-label"
								htmlFor="option-colour-3"
							></label>
						</div>
						<div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-danger">
							<input
								type="radio"
								className="form-check-color-input"
								id="option-colour-4"
								name="option-colour"
								value="Cherry Red"
							/>
							<label
								className="form-check-label"
								htmlFor="option-colour-4"
							></label>
						</div>
					</div>
				</div>
				<div className="product-option">
					<small className="text-uppercase d-block fw-bolder mb-2">
						Size (UK) : <span className="selected-option fw-bold"></span>
					</small>
					<div className="form-group">
						<select
							name="selectSize"
							className="form-control"
							data-choices
						>
							<option value="">Please Select Size</option>
							<option value="Extra Small">XS</option>
							<option value="Medium">M</option>
							<option value="Large">L</option>
							<option value="Extra Large">XL</option>
						</select>
					</div>
				</div>
			</div>

			<div className="d-flex justify-content-between mt-3">
				<button className="btn btn-dark btn-dark-chunky flex-grow-1 me-2 text-white">
					Add To Cart
				</button>
				<button className="btn btn-orange btn-orange-chunky">
					<i className="ri-heart-line"></i>
				</button>
			</div>

			<div className="my-4">{/* {{> socials/share }} */}</div>

			<div className="bg-light rounded py-2 px-3">
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex border-0 px-0 bg-transparent">
						<i className="ri-truck-line"></i>
						<span className="fs-6 ms-3">
							Standard delivery free for orders over $99. Next day delivery $9.99
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

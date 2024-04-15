import filters_one from "../data/filters-one.json";
export const AsideMenuOne = () => {
	return (
		<aside>
			{filters_one.categories && (
				<div className="mb-4">
					<h2 className="mb-4 fs-6 mt-2 fw-bolder">Jacket Category</h2>
					<nav>
						<ul className="list-unstyled list-default-text">
							{filters_one.categories.map((i) => {
								return null;
								("{{> filters/filter-text this }}");
							})}
						</ul>
					</nav>
				</div>
			)}

			<div className="py-4 widget-filter widget-filter-price border-top">
				<a
					className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
					data-bs-toggle="collapse"
					href="#filter-price"
					role="button"
					aria-expanded="true"
					aria-controls="filter-price"
				>
					Price
				</a>
				<div
					id="filter-price"
					className="collapse show"
				>
					{/* {{> filters/filter-price }} */}
				</div>
			</div>

			{filters_one.brands && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-brands"
						role="button"
						aria-expanded="true"
						aria-controls="filter-brands"
					>
						Brands
					</a>
					<div
						id="filter-brands"
						className="collapse show"
					>
						<div className="input-group my-3 py-1">
							<input
								type="text"
								className="form-control py-2 filter-search rounded"
								placeholder="Search"
								aria-label="Search"
							/>
							<span className="input-group-text bg-transparent px-2 position-absolute top-7 end-0 border-0 z-index-20">
								<i className="ri-search-2-line text-muted"></i>
							</span>
						</div>
						<div className="simplebar-wrapper">
							<div
								className="filter-options"
								data-pixr-simplebar
							>
								{filters_one.brands.map((i) => {
									return null;
									/* {{> filters/filter-checkbox this type="brand" }} */
								})}
							</div>
						</div>
					</div>
				</div>
			)}

			{filters_one.type && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-type"
						role="button"
						aria-expanded="true"
						aria-controls="filter-type"
					>
						Type
					</a>
					<div
						id="filter-type"
						className="collapse show"
					>
						<div className="input-group my-3 py-1">
							<input
								type="text"
								className="form-control py-2 filter-search rounded"
								placeholder="Search"
								aria-label="Search"
							/>
							<span className="input-group-text bg-transparent px-2 position-absolute top-7 end-0 border-0 z-index-20">
								<i className="ri-search-2-line text-muted"></i>
							</span>
						</div>
						<div className="filter-options">
							{filters_one.type.map((i) => {
								return null;
								/* {{> filters/filter-checkbox this type="type" }} */
							})}{" "}
						</div>
					</div>
				</div>
			)}

			{filters_one.sizes && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-sizes"
						role="button"
						aria-expanded="true"
						aria-controls="filter-sizes"
					>
						Sizes
					</a>
					<div
						id="filter-sizes"
						className="collapse show"
					>
						<div className="filter-options mt-3">
							{filters_one.sizes.map((i) => {
								return null;
								/*  {{> filters/filter-checkbox-two this type="sizes" }} */
							})}
						</div>
					</div>
				</div>
			)}

			{filters_one.colours && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-colour"
						role="button"
						aria-expanded="true"
						aria-controls="filter-colour"
					>
						Colour
					</a>
					<div
						id="filter-colour"
						className="collapse show"
					>
						<div className="filter-options mt-3">
							{filters_one.colours.map((i) => {
								return null;
								/*  {{> filters/filter-colour this type="colours" }} */
							})}
						</div>
					</div>
				</div>
			)}
		</aside>
	);
};

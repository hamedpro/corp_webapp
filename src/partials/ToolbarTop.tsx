export const ToolbarTop = () => {
	return (
		<div className="mb-4 d-md-flex justify-content-between align-items-center">
			<div className="d-flex justify-content-start align-items-center flex-grow-1 mb-4 mb-md-0">
				<small className="d-inline-block fw-bolder">Filtered by:</small>
				<ul className="list-unstyled d-inline-block mb-0 ms-2">
					<li className="bg-light py-1 fw-bolder px-2 cursor-pointer d-inline-block me-1 small">
						Type: Slip On <i className="ri-close-circle-line align-bottom ms-1"></i>
					</li>
				</ul>
				<span className="fw-bolder text-muted-hover text-decoration-underline ms-2 cursor-pointer small">
					Clear All
				</span>
			</div>
			<div className="d-flex align-items-center flex-column flex-md-row">
				<button
					className="btn bg-light p-3 d-flex d-lg-none align-items-center fs-xs fw-bold text-uppercase w-100 mb-2 mb-md-0 w-md-auto"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasFilters"
					aria-controls="offcanvasFilters"
				>
					<i className="ri-equalizer-line me-2"></i> Filters
				</button>

				<div className="dropdown ms-md-2 lh-1 p-3 bg-light w-100 mb-2 mb-md-0 w-md-auto">
					<p
						className="fs-xs fw-bold text-uppercase text-muted-hover p-0 m-0"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Sort By <i className="ri-arrow-drop-down-line ri-lg align-bottom"></i>
					</p>
					<ul className="dropdown-menu">
						<li>
							<a
								className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2"
								href="#"
							>
								Price: Hi Low
							</a>
						</li>
						<li>
							<a
								className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2"
								href="#"
							>
								Price: Low Hi
							</a>
						</li>
						<li>
							<a
								className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2"
								href="#"
							>
								Name
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

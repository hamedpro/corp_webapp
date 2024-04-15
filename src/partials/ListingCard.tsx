export const ListingCard = ({
	discountPercentage,
	img_hover,
	review_count,
	title,
	sale_price,
	currency,
	price,
}: {
	discountPercentage: any;
	img_hover: any;
	review_count: any;
	title: any;
	sale_price: any;
	currency: any;
	price: any;
}) => {
	return (
		<div className="card position-relative h-100 card-listing hover-trigger">
			{discountPercentage && (
				<span className="badge card-badge bg-secondary">{discountPercentage}</span>
			)}

			<div className="card-header">
				<picture className="position-relative overflow-hidden d-block bg-light">
					<img
						className="w-100 img-fluid position-relative z-index-10"
						title=""
						src="{{ img }}"
						alt="{{config.defaultImgAlt}}"
					/>
				</picture>
				{img_hover && (
					<picture className="position-absolute z-index-20 start-0 top-0 hover-show bg-light">
						<img
							className="w-100 img-fluid"
							title=""
							src="{{ img-hover }}"
							alt="{{config.defaultImgAlt}}"
						/>
					</picture>
				)}

				<div className="card-actions">
					<span className="small text-uppercase tracking-wide fw-bolder text-center d-block">
						Quick Add
					</span>
					<div className="d-flex justify-content-center align-items-center flex-wrap mt-3">
						<button className="btn btn-outline-dark btn-sm mx-2">S</button>
						<button className="btn btn-outline-dark btn-sm mx-2">M</button>
						<button className="btn btn-outline-dark btn-sm mx-2">L</button>
					</div>
				</div>
			</div>
			<div className="card-body px-0 text-center">
				<div className="d-flex justify-content-center align-items-center mx-auto mb-1">
					{/* {{> reviews/review-stars-small width=review-width }} */}{" "}
					<span className="small fw-bolder ms-2 text-muted"> {review_count}</span>
				</div>
				<a
					className="mb-0 mx-2 mx-md-4 fs-p link-cover text-decoration-none d-block text-center"
					href="/product.html"
				>
					{title}
				</a>
				{sale_price ? (
					<div className="d-flex justify-content-center align-items-center mt-2">
						<p className="mb-0 me-2 text-danger fw-bolder">
							{currency}
							<span>{sale_price}</span>
						</p>
						<p className="mb-0 text-muted fw-bolder">
							<s>
								{currency}
								<span>{price}</span>
							</s>
						</p>
					</div>
				) : (
					<p className="fw-bolder m-0 mt-2">
						{currency}
						{price}
					</p>
				)}
			</div>
		</div>
	);
};

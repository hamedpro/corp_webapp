export const Share = () => {
	return (
		<div className="d-flex justify-content-start align-items-center">
			<p className="fw-bolder lh-1 mb-0 me-3">Share</p>
			<ul className="list-unstyled p-0 m-0 d-flex justify-content-start lh-1 align-items-center mt-1">
				<li className="me-2">
					<a
						className="text-decoration-none"
						href="#"
						role="button"
					>
						<i className="ri-facebook-box-fill"></i>
					</a>
				</li>
				<li className="me-2">
					<a
						className="text-decoration-none"
						href="#"
						role="button"
					>
						<i className="ri-instagram-fill"></i>
					</a>
				</li>
				<li className="me-2">
					<a
						className="text-decoration-none"
						href="#"
						role="button"
					>
						<i className="ri-pinterest-fill"></i>
					</a>
				</li>
				<li className="me-2">
					<a
						className="text-decoration-none"
						href="#"
						role="button"
					>
						<i className="ri-twitter-fill"></i>
					</a>
				</li>
			</ul>
		</div>
	);
};

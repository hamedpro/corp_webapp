export const Pagination = () => {
	return (
		<nav
			className="border-top mt-5 pt-5 d-flex justify-content-between align-items-center"
			aria-label="Category Pagination"
		>
			<ul className="pagination">
				<li className="page-item">
					<a
						className="page-link"
						href="#"
					>
						<i className="ri-arrow-left-line align-bottom"></i> Prev
					</a>
				</li>
			</ul>
			<ul className="pagination">
				<li className="page-item active mx-1">
					<a
						className="page-link"
						href="#"
					>
						1
					</a>
				</li>
				<li className="page-item mx-1">
					<a
						className="page-link"
						href="#"
					>
						2
					</a>
				</li>
				<li className="page-item mx-1">
					<a
						className="page-link"
						href="#"
					>
						3
					</a>
				</li>
			</ul>
			<ul className="pagination">
				<li className="page-item">
					<a
						className="page-link"
						href="#"
					>
						Next <i className="ri-arrow-right-line align-bottom"></i>
					</a>
				</li>
			</ul>
		</nav>
	);
};

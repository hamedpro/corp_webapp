import { Link } from "react-router-dom";

export const Pagination = () => {
	return (
		<nav
			className="border-top mt-5 pt-5 d-flex justify-content-between align-items-center"
			aria-label="Category Pagination"
		>
			<ul className="pagination">
				<li className="page-item">
					<Link
						className="page-link"
						to="#"
					>
						<i className="ri-arrow-left-line align-bottom"></i> Prev
					</Link>
				</li>
			</ul>
			<ul className="pagination">
				<li className="page-item active mx-1">
					<Link
						className="page-link"
						to="#"
					>
						1
					</Link>
				</li>
				<li className="page-item mx-1">
					<Link
						className="page-link"
						to="#"
					>
						2
					</Link>
				</li>
				<li className="page-item mx-1">
					<Link
						className="page-link"
						to="#"
					>
						3
					</Link>
				</li>
			</ul>
			<ul className="pagination">
				<li className="page-item">
					<Link
						className="page-link"
						to="#"
					>
						Next <i className="ri-arrow-right-line align-bottom"></i>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

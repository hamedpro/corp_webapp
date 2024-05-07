import { Link } from "react-router-dom";

export const BreadcrumbsOne = () => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<Link to="#">Home</Link>
				</li>
				<li className="breadcrumb-item">
					<Link to="#">Activities</Link>
				</li>
				<li
					className="breadcrumb-item active"
					aria-current="page"
				>
					Clothing
				</li>
			</ol>
		</nav>
	);
};

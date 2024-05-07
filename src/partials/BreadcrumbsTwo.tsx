import { Link } from "react-router-dom";

export const BreadcrumbsTwo = () => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item breadcrumb-light">
					<Link to="#">Home</Link>
				</li>
				<li className="breadcrumb-item breadcrumb-light">
					<Link to="#">Activities</Link>
				</li>
				<li
					className="breadcrumb-item active breadcrumb-light"
					aria-current="page"
				>
					Clothing
				</li>
			</ol>
		</nav>
	);
};

export const BreadcrumbsOne = () => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
					<a href="#">Home</a>
				</li>
				<li className="breadcrumb-item">
					<a href="#">Activities</a>
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

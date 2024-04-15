export const BreadcrumbsTwo = () => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				<li className="breadcrumb-item breadcrumb-light">
					<a href="#">Home</a>
				</li>
				<li className="breadcrumb-item breadcrumb-light">
					<a href="#">Activities</a>
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

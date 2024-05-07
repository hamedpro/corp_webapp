import { Link } from "react-router-dom";

export const DropdownLinks = ({ model }: { model: { title: string; items: string[] }[] }) => {
	return (
		<div className="row py-lg-5">
			{model.map(({ title, items }, index) => (
				<div
					className="col col-lg-6"
					key={index}
				>
					<h6
						className="dropdown-heading"
						style={{ textAlign: "right" }}
					>
						{title}
					</h6>
					<ul className="list-unstyled">
						{items.map((item, index) => (
							<li
								className="dropdown-list-item"
								key={index}
							>
								<Link
									className="dropdown-item"
									to="/product"
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

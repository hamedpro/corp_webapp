import { Link } from "react-router-dom";

export const DropdownLinks = () => {
	return (
		<div className="row py-lg-5">
			<div className="col col-lg-6 mb-5 mb-sm-0">
				<h6 className="dropdown-heading">Waterproof Layers</h6>
				<ul className="list-unstyled">
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Waterproof Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Insulated Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Down Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Softshell Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Casual Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Windproof Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Breathable Jackets
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Cleaning & Proofing
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item dropdown-link-all"
							to="/category"
						>
							View All
						</Link>
					</li>
				</ul>
			</div>

			<div className="col col-lg-6">
				<h6 className="dropdown-heading">Brands</h6>
				<ul className="list-unstyled">
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Lifestyle & Casual
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Walking Shoes
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Running Shoes
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Military Boots
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Fabric Walking Boots
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Leather Walking Boots
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Wellies
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item"
							to="/category"
						>
							Winter Footwear
						</Link>
					</li>
					<li className="dropdown-list-item">
						<Link
							className="dropdown-item dropdown-link-all"
							to="/category"
						>
							View All
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

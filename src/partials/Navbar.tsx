import { Link } from "react-router-dom";
import { LogoFull } from "./LogoFull";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { OffcanvasCart } from "./OffcanvasCart";

export const Navbar = ({
	configClassList,
	classList,
}: {
	configClassList: any;
	classList: any;
}) => {
	var [off_canvas_cart, set_off_canvas_cart] = useState(false);
	var [search_overlay, set_search_overlay] = useState(false);
	return (
		<>
			<SearchOverlay
				visible={search_overlay}
				onHide={() => set_search_overlay(false)}
			/>
			<OffcanvasCart
				visible={off_canvas_cart}
				onHide={() => set_off_canvas_cart(false)}
			/>
			<nav
				className={`navbar navbar-expand-lg navbar-light bg-white border-bottom mx-0 p-0 flex-column ${configClassList} ${classList}`}
			>
				<div className="w-100 pb-lg-0 pt-lg-0 pt-4 pb-3">
					<div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
						<Link
							className="navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0"
							to="/"
						>
							<LogoFull />
						</Link>

						<div
							className="flex-shrink-0 collapse navbar-collapse navbar-collapse-light w-auto flex-grow-1"
							id="navbarNavDropdown"
						>
							<button
								className="btn btn-link px-2 text-decoration-none navbar-toggler border-0 position-absolute top-0 end-0 mt-3 me-2"
								data-bs-toggle="collapse"
								data-bs-target="#navbarNavDropdown"
								aria-controls="navbarNavDropdown"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<i className="ri-close-circle-line ri-2x"></i>
							</button>

							<Menu />
						</div>

						<ul
							className="list-unstyled mb-0 d-flex align-items-center"
							style={{ paddingRight: "0px" }}
						>
							<li className="d-inline-block d-lg-none">
								<button
									className="btn btn-link px-2 text-decoration-none navbar-toggler border-0 d-flex align-items-center"
									data-bs-toggle="collapse"
									data-bs-target="#navbarNavDropdown"
									aria-controls="navbarNavDropdown"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<i className="ri-menu-line ri-lg align-middle"></i>
								</button>
							</li>

							<li className="ms-1 d-inline-block">
								<button
									onClick={() => set_search_overlay(true)}
									className="btn btn-link px-2 text-decoration-none d-flex align-items-center"
									data-pr-search
								>
									<i className="ri-search-2-line ri-lg align-middle"></i>
								</button>
							</li>

							<li className="ms-1 d-inline-block">
								<Link
									className="btn btn-link px-2 py-0 text-decoration-none d-flex align-items-center"
									to="#"
								>
									<i className="ri-heart-line ri-lg align-middle"></i>
								</Link>
							</li>

							{/* <li className="ms-1 d-none d-lg-inline-block">
        <Link
            className="btn btn-link px-2 text-decoration-none d-flex align-items-center"
            to="#"
        >
            <i className="ri-user-line ri-lg align-middle"></i>
        </Link>
    </li> */}

							<li className="ms-1 d-inline-block position-relative">
								<button
									className="btn btn-link px-2 text-decoration-none d-flex align-items-center disable-child-pointer"
									data-bs-toggle="offcanvas"
									data-bs-target="#offcanvasCart"
									aria-controls="offcanvasCart"
								>
									<i className="ri-shopping-cart-2-line ri-lg align-middle position-relative z-index-10"></i>
									<span className="fs-xs fw-bolder f-w-5 f-h-5 bg-orange rounded-lg d-block lh-1 pt-1 position-absolute top-0 end-0 z-index-20 mt-2 text-white">
										2
									</span>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

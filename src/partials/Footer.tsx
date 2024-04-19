import React from "react";
import config from "../data/config.json";
import { InstagramPhotos } from "./InstagramPhotos";
import { InfoBoxes } from "./InfoBoxes";
import { Link } from "react-router-dom";
export const Footer = ({
	configClassList,
	classList,
}: {
	configClassList: any;
	classList: any;
}) => {
	return (
		<footer className={`bg-dark mt-10 ${configClassList} ${classList}`}>
			<div className="bg-light py-4">
				<div className="container d-flex justify-content-center align-items-center py-2">
					<p className="lead fw-bolder mb-0 lh-1">Find us online</p>
					<ul className="list-unstyled d-flex justify-content-start align-items-center mb-0 ms-3 lh-1">
						<li className="mx-1 mb-0 lh-1">
							<a
								className="text-muted text-decoration-none opacity-75-hover transition-all lh-1"
								href="#"
							>
								<i className="ri-instagram-fill ri-xl lh-1"></i>
							</a>
						</li>
						<li className="mx-1 mb-0 lh-1">
							<a
								className="text-muted text-decoration-none opacity-75-hover transition-all lh-1"
								href="#"
							>
								<i className="ri-facebook-fill ri-xl lh-1"></i>
							</a>
						</li>
						<li className="mx-1 mb-0 lh-1">
							<a
								className="text-muted text-decoration-none opacity-75-hover transition-all lh-1"
								href="#"
							>
								<i className="ri-twitter-fill ri-xl lh-1"></i>
							</a>
						</li>
						<li className="mx-1 mb-0 lh-1">
							<a
								className="text-muted text-decoration-none opacity-75-hover transition-all lh-1"
								href="#"
							>
								<i className="ri-snapchat-fill ri-xl lh-1"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="container pt-8">
				<InstagramPhotos />

				<div className="d-flex justify-content-between align-items-center mt-3">
					<p className="text-muted m-0">
						Follow us on Instragram{" "}
						<span className="text-lowercase">@{config.templateName}</span>
					</p>
					<a
						className="text-link-border fw-bolder m-0 text-white"
						href="#"
					>
						More On Instagram <i className="ri-external-link-line align-bottom"></i>
					</a>
				</div>
			</div>

			<div className="container mt-7">
				<InfoBoxes />
			</div>

			<div className="border-top-white-opacity py-7 mt-7 text-white">
				<div
					className="container"
					data-aos="fade-in"
				>
					<div className="row my-4 flex-wrap">
						<nav className="col-6 col-md mb-4 mb-md-0">
							<h6 className="mb-4 fw-bolder fs-6">Shop</h6>
							<ul className="list-unstyled">
								<li className="mb-2">
									<Link
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										to="/category"
									>
										Menswear
									</Link>
								</li>
								<li className="mb-2">
									<Link
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										to="/category"
									>
										Womenswear
									</Link>
								</li>
								<li className="mb-2">
									<Link
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										to="/category"
									>
										Kidswear
									</Link>
								</li>
								<li className="mb-2">
									<Link
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										to="/category"
									>
										New Arrivals
									</Link>
								</li>
							</ul>
						</nav>

						<nav className="col-6 col-md mb-4 mb-md-0">
							<h6 className="mb-4 fw-bolder fs-6">Company</h6>
							<ul className="list-unstyled">
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										About Us
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Our Blog
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										FAQs
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Contact
									</a>
								</li>
							</ul>
						</nav>

						<nav className="d-none d-md-block col-md">
							<h6 className="mb-4 fw-bolder fs-6">Navigation</h6>
							<ul className="list-unstyled">
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Register
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Cart
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Checkout
									</a>
								</li>
								<li className="mb-2">
									<a
										className="text-decoration-none text-white opacity-75 opacity-25-hover transition-all"
										href="#"
									>
										Account
									</a>
								</li>
							</ul>
						</nav>

						<div className="col-12 col-md-5">
							<h6 className="mb-4 fw-bolder fs-6">Join Our Newsletter</h6>
							<p className="opacity-75">
								Sign up to our newsletter and we'll email you a code worth 15% off
								your first order. By subscribing to our mailing list you agree to
								our terms and conditions.
							</p>
							<form className="bg-white d-flex justify-content-start align-items-center border-dark-focus-within transition-all mt-4">
								<div className="input-group m-0">
									<input
										type="text"
										className="form-control d-flex flex-grow-1 border-0 bg-transparent py-3"
										placeholder="Enter your email"
										aria-label="Enter your email"
									/>
									<span className="input-group-text bg-transparent border-0">
										<i className="ri-arrow-right-line align-middle"></i>
									</span>
								</div>
							</form>
						</div>
					</div>
					<div className="border-top-white-opacity justify-content-between flex-column flex-md-row align-items-center d-flex pt-6 mt-6 px-0">
						<p className="small opacity-75">
							&copy; 2021 {config.templateName} All Rights Reserved. Template by{" "}
							<a
								className="text-white"
								href="https://www.pixelrocket.store"
							>
								Pixel Rocket
							</a>
						</p>
						<nav>
							<ul className="list-unstyled">
								<li className="d-inline-block me-1 bg-white rounded px-2 pt-1">
									<i className="pi pi-paypal pi-sm"></i>
								</li>
								<li className="d-inline-block me-1 bg-white rounded px-2 pt-1">
									<i className="pi pi-mastercard pi-sm"></i>
								</li>
								<li className="d-inline-block me-1 bg-white rounded px-2 pt-1">
									<i className="pi pi-american-express pi-sm"></i>
								</li>
								<li className="d-inline-block bg-white rounded px-2 pt-1">
									<i className="pi pi-visa pi-sm"></i>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};

import config from "../data/config.json";
import svg_divider_top_lr from "../assets/svg-divider-top-lr.svg";
import { ReviewStarsSmall } from "./ReviewStarsSmall";
import { Link } from "react-router-dom";
export const BannerImageHotspot = () => {
	return (
		<>
			<div className="position-absolute z-index-50 text-white top-0 start-0 end-0">
				<img src="/svg-divider-top-lr.svg" />
				{/* {{> svg/svg-divider-top-lr colorclassName="text-white" positionclassName="top-0 start-0 end-0" }} */}
			</div>

			<div
				className="w-100 h-100 bg-img-cover bg-pos-center-center hotspot-container py-5 py-md-7 py-lg-10"
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
				}}
			>
				<div
					className="hotspot d-none d-lg-block"
					data-options='{
        "placement": {
            "left": "68%",
            "bottom": "40%"
        },
        "alwaysVisible": true,
        "alwaysAnimate": true,
        "contentTarget": "#hotspot-one",
        "trigger": "mouseenter"
    }'
				></div>
				<div
					className="hotspot d-none d-lg-block"
					data-options='{
        "placement": {
            "left": "53%",
            "top": "40%"
        },
        "alwaysVisible": true,
        "alwaysAnimate": true,
        "contentTarget": "#hotspot-one"
    }'
				></div>
				<div
					className="container py-lg-8 position-relative z-index-10 d-flex align-items-center"
					data-aos="fade-left"
				>
					<div className="py-8 d-flex justify-content-end align-items-start align-items-lg-end flex-column col-lg-4 text-lg-end">
						<p className="small fw-bolder text-uppercase tracking-wider mb-2 text-muted">
							Extreme Performance
						</p>
						<h2 className="display-5 fw-bold mb-3">The North Face</h2>
						<p className="lead d-none d-lg-block">
							Be ready all year round with our selection of North Face outdoor jackets
							— perfect for any time of the year and year round. Choose from a variety
							of colour shades and styles to warm you up in cold conditions.
						</p>
						<a
							className="text-decoration-none fw-bolder"
							href="#"
						>
							Shop The North Face &rarr;
						</a>
					</div>
				</div>

				<div
					id="hotspot-one"
					className="d-none"
				>
					<div className="m-n2 rounded overflow-hidden">
						<div className="mb-1 bg-light d-flex justify-content-center">
							<div className="f-w-48 px-3 pt-3">
								<img
									className="img-fluid"
									src="/assets/images/products/product-3.jpg"
									alt={config.defaultImgAlt}
								/>
							</div>
						</div>
						<div className="px-4 py-4 text-center">
							<div className="d-flex justify-content-center align-items-center mx-auto mb-1">
								<ReviewStarsSmall width={"80%"} />{" "}
								<span className="small fw-bolder ms-2 text-muted"> 4.4 (1289)</span>
							</div>
							<p className="mb-0 mx-4">Pusher Outdoor Jeans Black Women</p>
							<p className="lead lh-1 m-0 fw-bolder mt-2 mb-3">$199.87</p>
							<Link
								to="/product"
								className="fw-bolder text-link-border pb-1 fs-6"
							>
								Full details <i className="ri-arrow-right-line align-bottom"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="position-absolute z-index-50 text-white bottom-0 start-0 end-0">
				<img src="/svg-divider-bottom-rl.svg" />
				{/* {{> svg/svg-divider-bottom-rl colorclassName="text-white" positionclassName="bottom-0 start-0 end-0" }} */}
			</div>
		</>
	);
};

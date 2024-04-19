import { Navbar } from "../partials/Navbar";
import config from "../data/config.json";
import { CartItems } from "../partials/CartItems";
import { CartSummary } from "../partials/CartSummary";
import { Footer } from "../partials/Footer";
import { Offcanvas } from "../partials/Offcanvas";
import { SearchOverlay } from "../partials/SearchOverlay";
export const Cart = () => {
	return (
		<>
			<Navbar
				configClassList={""}
				classList={""}
			/>
			<section className={`mt-5 container ${config.classes.content}`}>
				<h1 className="mb-6 display-5 fw-bold text-center">Your Cart</h1>

				<div className="row g-4 g-md-8">
					<div className="col-12 col-lg-6 col-xl-7">
						<div className="table-responsive">
							<CartItems />
						</div>
					</div>
					<div className="col-12 col-lg-6 col-xl-5">
						<CartSummary />
					</div>
				</div>
			</section>

			<Footer
				configClassList={config.classes.footer}
				classList=""
			/>
			<Offcanvas />
			<SearchOverlay />
		</>
	);
};

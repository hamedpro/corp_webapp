import { Navbar } from "../partials/Navbar";
import config from "../data/config.json";
import { CartItems } from "../partials/CartItems";
import { CartSummary } from "../partials/CartSummary";
import { Footer } from "../partials/Footer";
import { Offcanvas } from "../partials/Offcanvas";
import { SearchOverlay } from "../partials/SearchOverlay";
import { BreadcrumbsTwo } from "../partials/BreadcrumbsTwo";
import { AsideMenuOne } from "../partials/AsideMenuOne";
import { ToolbarTop } from "../partials/ToolbarTop";
import s from "../data/category-products.json";
import { ListingCard } from "../partials/ListingCard";
import { Pagination } from "../partials/Pagination";
import { CheckoutContact } from "../partials/CheckoutContact";
import { CheckoutShipping } from "../partials/CheckoutShipping";
import { CheckoutBilling } from "../partials/CheckoutBilling";
import { CheckoutShippingMethod } from "../partials/CheckoutShippingMethod";
import { CheckoutPayment } from "../partials/CheckoutPayment";
import { CheckoutSummary } from "../partials/CheckoutSummary";
export const Checkout = () => {
	return (
		<>
			<Navbar
				configClassList={config.classes.navbar}
				classList="border-0"
			/>

			<section className={`mt-5 container ${config.classes.content}`}>
				<h1 className="mb-4 display-5 fw-bold text-center">Checkout Securely</h1>
				<p className="text-center mx-auto">
					Please fill in the details below to complete your order. Already registered?
					<a href="#">Login here.</a>
				</p>

				<div className="row g-md-8 mt-4">
					<div className="col-12 col-lg-6 col-xl-7">
						<CheckoutContact />
						<CheckoutShipping />
						<CheckoutBilling />
						<CheckoutShippingMethod />
						<CheckoutPayment />
					</div>

					<div className="col-12 col-lg-6 col-xl-5">
						<CheckoutSummary />
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

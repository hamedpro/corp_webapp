import { OffcanvasCart } from "./OffcanvasCart";
import { OffcanvasFilters } from "./OffcanvasFilters";
import { OffcanvasReview } from "./OffcanvasReview";

export const Offcanvas = () => {
	return (
		<>
			<OffcanvasCart />
			<OffcanvasFilters />
			<OffcanvasReview />
		</>
	);
};

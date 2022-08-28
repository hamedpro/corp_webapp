import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../image_slider/comp";
import { ProductsRow } from "./products_row";
import { Circle, Discount } from "@mui/icons-material";
export default function Root() {
	var nav = useNavigate();
	return (
		<>
			<ImageSlider className="mt-1 bg-sky-500" image_sources={[]} />
			<ProductsRow icon={<Discount />} title={"discounted products"} products={[]} />
		</>
	);
}

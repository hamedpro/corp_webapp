import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../image_slider/comp";
import { ProductsRow } from "./products_row";
import { Circle, Discount } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { Loading } from "../loading/comp";
export default function Root() {
	var [products, set_products] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	var discounted_products = () =>
		products === null ? null : products.filter((p) => p.discount_percent !== 0);
	var nav = useNavigate();
	useEffect(fetch_data, []);
	return (
		<>
			<ImageSlider className="mt-1 bg-sky-500" image_sources={[]} />
			<ProductsRow
				icon={<Discount />}
				title={"discounted products"}
				products={discounted_products()}
			/>
		</>
	);
}

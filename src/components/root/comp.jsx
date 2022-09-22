import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../image_slider/comp";
import { ProductsRow } from "./products_row";
import { Discount, InfoRounded, Stars } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { multi_lang_helper as ml, shuffle } from "../../common";
import { DiffrentSections } from "./diffrent_sections";
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
		products === null ? null : products.filter((p) => p.discount_percent !== 0).slice(0, 7);

	var suggested_products = () => (products === null ? null : shuffle(products).slice(0, 7));
	var nav = useNavigate();
	useEffect(fetch_data, []);
	return (
		<>
			<ImageSlider className="mt-1 bg-sky-600" image_sources={[]} />
			<ProductsRow
				icon={<Discount sx={{color:"darkblue"}} />}
				title={ml({
					en: "discounted products",
					fa: "محصولات دارای تخفیف",
				})}
				products={discounted_products()}
			/>
			<DiffrentSections />
			<ProductsRow
				icon={<Stars sx={{color:"darkblue"}} />}
				title={ml({
					en: "suggested products for you",
					fa: "کالاهای پیشنهادی برای شما",
				})}
				products={suggested_products()}
			/>
		</>
	);
}

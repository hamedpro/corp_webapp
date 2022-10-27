import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../image_slider/comp";
import { ProductsRow } from "./products_row";
import { Discount, InfoRounded, Stars } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { multi_lang_helper as ml, shuffle } from "../../common";
import { DiffrentSections } from "./diffrent_sections";
import { StyledDiv } from "../styled_elements";
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
			<div className="bg-blue-500 h-60 w-full p-4">
				<h1 className="text-3xl text-white">{ml({
					en: "online panel address :",
					fa : "آدرس پنل اینترنتی :"
				})}</h1>
				<button onClick={() => {
					window.location.assign('http://mpkchiller.com/dimmer')
				}}>
					<StyledDiv
						className="mt-3 px-2 py-1 text-xl bg-blue-600 text-white hover:bg-blue-800 duration-300"
					>{ml({
						en: "open link",
						fa : "باز کردن پیوند"
					})} (http://mpkchiller.com/dimmer) </StyledDiv>
				</button>
			</div>
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

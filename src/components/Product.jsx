import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../custom_ajax.js";
import { AddToShoppingBagBar } from "./AddToShoppingBagBar";
import { Section } from "./Section.jsx";
import { ImageSlider } from "./ImageSlider.jsx";
import { is_this_valid_json, multi_lang_helper as ml } from "../common.js";
import parse from "html-react-parser";
import editor_js_to_html from "editorjs-html";
import { ZoomInRounded } from "@mui/icons-material";
import { CustomImageSlider } from "./CustomImageSlider.jsx";

export function Product() {
	var nav = useNavigate();
	var product_id = useParams().product_id;
	var [image_sources, set_image_sources] = useState(null);
	var [product, set_product] = useState(null);

	async function init() {
		var tmp = await customAjax({
			params: {
				task_name: "get_products",
			},
		});
		let product = tmp.result.filter((i) => i.id == Number(product_id))[0];
		set_product(product);
		set_image_sources(
			JSON.parse(product.image_file_ids).map(
				(image_file_id) => new URL(`/files/${image_file_id}`, vite_api_endpoint).href
			)
		);
	}
	useEffect(() => {
		init();
	}, []);

	if (product === null || image_sources === null) return;

	var editor_js_to_html_parser = editor_js_to_html({
		table: (block) => {
			if (block.data.content.length === 0) return <b>[empty table]</b>;
			return renderToString(
				<table>
					<thead>
						<tr>
							{block.withHeadings &&
								block.data.content[0].map((i, index) => <th key={index}>{i}</th>)}
						</tr>
						<tr>
							{!block.withHeadings &&
								block.data.content[0].map((i, index) => <td key={index}>{i}</td>)}
						</tr>
					</thead>
					<tbody>
						{block.data.content.slice(1, block.data.content.length).map((i, index1) => (
							<tr key={index1}>
								{i.map((i, index2) => (
									<td key={index2}>{i}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);
		},
		checklist: (block) => {
			return renderToString(
				<>
					{block.data.items.map((i, index) => (
						<Fragment key={index}>
							<i className={i.checked ? "bi-toggle-on" : "bi-toggle-off"} />
							{i.text}
							<br />
						</Fragment>
					))}
				</>
			);
		},
	});

	if (is_this_valid_json(product.description)) {
		var parsed_description = parse(
			editor_js_to_html_parser.parse(JSON.parse(product.description)).join("")
		);
	} else {
		var parsed_description = <h1>{product.description}</h1>;
	}
	return (
		<>
			<div className="flex flex-col md:flex-row border border-blue-400 mt-2 p-2 mx-1 justify-end">
				<div className="md:w-5/12">
					{image_sources.length == 0 ? (
						<div className="w-full h-20 bg-blue-400 text-white flex justify-center items-center">
							{ml({
								en: "there is not any product image uploaded for this product",
								fa: "برای این محصول هیچ تصویری بارگذاری نشده است",
							})}
						</div>
					) : (
						<div className="relative">
							<div
								onClick={() => nav("images")}
								className="flex justify-center items-center absolute top-0 left-0 h-10 w-10 bg-blue-500 z-20"
							>
								<ZoomInRounded />
							</div>
							<div className="h-60">
								<CustomImageSlider images_sources={image_sources} />
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-col md:w-1/3 px-2 space-between justify-between">
					<div className="mx-2 w-full mt-2">
						<h1 className="text-2xl">نام کالا : {product.name}</h1>
					</div>

					<AddToShoppingBagBar price={product.price} product_id={product.id} />
				</div>
				<div className="w-1/3"></div>
			</div>
			{/* todo add a div h full w full into Section comp and inject styles into that */}
			<Section
				title={ml({
					en: "description",
					fa: "معرفی محصول :",
				})}
				className="mx-1 mt-2"
			>
				<div className="mx-2">{parsed_description}</div>
			</Section>
			<Section
				title={ml({
					en: "product specifications:",
					fa: "مشخصات محصول :",
				})}
				className="mx-1 mt-2"
			>
				<div className="mx-2">
					{/*todo add option for report data incorrect which opens pop up to open a new support ticket */}
					{JSON.parse(product.product_specs).map((spec) => {
						return (
							<div className="flex" key={spec.id}>
								<p className="text-stone-600 mr-1">{spec.key}</p>:
								<p className="ml-1">{spec.value}</p>
							</div>
						);
					})}
				</div>
			</Section>
		</>
	);
}

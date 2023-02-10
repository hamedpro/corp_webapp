import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import "./styles.css";
import AddToShoppingBagBar from "./AddToShoppingBagBar";
import Section from "../section/comp.jsx";
import { ImageSlider } from "../image_slider/comp.jsx";
import { gen_link_to_file, is_this_valid_json, multi_lang_helper as ml } from "../../common.js";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import { FullScreenImageSlider } from "./components/FullScreenImageSlider.jsx";
import { ZoomInRounded } from "@mui/icons-material";
export default function Product() {
	var nav = useNavigate();
	var product_id = useParams().product_id;
	var [editor_js_instance, set_editor_js_instance] = useState(null);
	var [image_sources, set_image_sources] = useState(null);
	var [product, set_product] = useState(null);
	useEffect(() => {
		if (product === null || image_sources === null) return;
		if (is_this_valid_json(product.description)) {
			var conf = {
				holder: "editor-js-div",
				readOnly: true,
				tools: {
					header: Header,
					list: List,
					attach: Attach,
					table: Table,
					image: ImageTool,
					checkList: Checklist,
				},
				data: JSON.parse(product.description),
			};
			set_editor_js_instance(new EditorJS(conf));
		}
	}, [product, image_sources]);
	async function init() {
		var tmp = await customAjax({
			params: {
				task_name: "get_products",
			},
		});
		set_product(tmp.result.filter((i) => i.id == Number(product_id))[0]);
		customAjax({
			params: {
				task_name: "get_paths_of_images_of_a_product",
				product_id,
			},
		}).then((data) => {
			set_image_sources(
				data.result.map((file_name) => gen_link_to_file("./product_images/" + file_name))
			);
		});
	}
	useEffect(() => {
		init();
	}, []);

	if (product === null || image_sources === null) return;
	return (
		<>
			<div className="flex flex-col md:flex-row border border-blue-400 mt-2 p-2 mx-1">
				<div className="md:w-2/3">
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
							<ImageSlider image_sources={image_sources} />
						</div>
					)}
				</div>

				<div className="flex flex-col md:w-1/3 px-2 space-between justify-between">
					<div className="mx-2 w-full mt-2">
						<h1>
							#{product.id} : {product.name}
						</h1>
					</div>

					<AddToShoppingBagBar price={product.price} product_id={product.id} />
				</div>
			</div>
			{/* todo add a div h full w full into Section comp and inject styles into that */}
			<Section
				title={ml({
					en: "description",
					fa: "معرفی محصول :",
				})}
				className="mx-1 mt-2"
			>
				<div className="mx-2">
					<div id="editor-js-div"></div>
					{!is_this_valid_json(product.description) && <h1>{product.description}</h1>}
				</div>
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

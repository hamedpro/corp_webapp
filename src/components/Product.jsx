import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Section } from "./Section.jsx";
import parse from "html-react-parser";
import editor_js_to_html from "editorjs-html";
import { ZoomInRounded } from "@mui/icons-material";
import { CustomImageSlider } from "./CustomImageSlider.jsx";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils.js";
import { FullScreenImageSlider } from "./FullScreenImageSlider.jsx";

export function Product() {
	var { cache, profiles_seed, rest_endpoint } = useContext(context);
	var nav = useNavigate();
	var product_id = Number(useParams().product_id);
	var product = cache.find((ci) => ci.thing_id === product_id);
	var [parsed_description, set_parsed_description] = useState("");
	useEffect(() => {
		if (product?.thing.value.description !== undefined) {
			set_parsed_description(
				editor_js_to_html_parser.parse(JSON.parse(product.thing.value.description)).join("")
			);
		}
	});
	useEffect(() => {
		console.log(typeof parsed_description);
	});
	if (isNaN(product_id) === true) return "Invalid Product Id";
	if (product === undefined) return `Couldn't find a product with id = ${product_id}`;

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
	return (
		<>
			<Routes>
				<Route
					path="images"
					element={
						<FullScreenImageSlider
							product_id={product.thing_id}
							image_urls={product.thing.value.image_file_ids.map((image_file_id) =>
								calc_file_url(profiles_seed, rest_endpoint, image_file_id)
							)}
						/>
					}
				/>
			</Routes>

			<div className="flex flex-col md:flex-row border border-blue-400 mt-2 p-2 mx-1 justify-end">
				<div className="md:w-5/12">
					{product.thing.value.image_file_ids.length == 0 ? (
						<div className="w-full h-20 bg-blue-400 text-white flex justify-center items-center">
							{"برای این محصول هیچ تصویری بارگذاری نشده است"}
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
								<CustomImageSlider
									images_sources={product.thing.value.image_file_ids.map(
										(image_file_id) =>
											calc_file_url(
												profiles_seed,
												rest_endpoint,
												image_file_id
											)
									)}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-col md:w-1/3 px-2 space-between justify-between">
					<div className="mx-2 w-full mt-2">
						<h1 className="text-2xl">نام کالا : {product.thing.value.name}</h1>
					</div>
				</div>
				<div className="w-1/3"></div>
			</div>
			{/* todo add a div h full w full into Section comp and inject styles into that */}
			<Section
				title={"معرفی محصول :"}
				className="mx-1 mt-2"
			>
				<div className="mx-2">{parse(parsed_description || "")}</div>
			</Section>
			<Section
				title={"مشخصات محصول :"}
				className="mx-1 mt-2"
			>
				<div className="mx-2">
					{/*todo add option for report data incorrect which opens pop up to open a new support ticket */}
					{product.thing.value.product_specs.map((spec) => {
						return (
							<div
								className="flex"
								key={spec.id}
							>
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

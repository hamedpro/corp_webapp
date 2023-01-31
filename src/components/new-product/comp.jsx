import React, { useContext, useState, useEffect } from "react";
import "./s.css";
import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
function CustomInput({ id }) {
	return <input id={id} className="border border-green-400 rounded px-2 py-1" />;
}
function cloned_array(arr) {
	var tmp = [];
	arr.forEach((item) => {
		tmp.push(item);
	});
	return tmp;
}
export default function NewProduct() {
	const [specs, set_specs] = useState([]);
	const [count, set_count] = useState(0);
	var [editor_js_instance, set_editor_js_instance] = useState(null);
	useEffect(() => {
		var editor_js_conf = {
			holder: "editor-js-div",
			tools: {
				header: Header,
				list: List,
				attach: Attach,
				table: Table,
				image: ImageTool,
				checkList: Checklist,
			},
			placeholder: "محصول خود را معرفی کنید ",
		};
		set_editor_js_instance(new EditorJS(editor_js_conf));
	}, []);
	async function submit_new_product() {
		var entered_price = document.getElementById("price_input").value;
		if (isNaN(Number(entered_price))) {
			alert(
				"مقداری که به عنوان قیمت محصول وارد کرده اید یا به طور کلی عدد نیست یا شامل اعداد فارسی است"
			);
			return;
		}
		var params = {
			task_name: "new_product",
			name: document.getElementById("name_input").value,
			description: JSON.stringify(await editor_js_instance.save()),
			product_specs: JSON.stringify(specs),
			price: entered_price,
		};
		customAjax({
			//todo check if required param is not given in all app
			params,
		}).then(
			(data) => {
				var form = new FormData();
				var files = Object.keys(document.getElementById("images_input").files).map(
					(key) => {
						return document.getElementById("images_input").files[key];
					}
				);
				customAjax({
					params: {
						task_name: "upload_product_images",
						product_id: data.result,
					},
					files,
				}).then(
					(data) => {
						alert("done successfuly!");
					},
					(e) => {
						alert("something went wrong");
						console.log(e);
					}
				);
			},
			(error) => {
				console.log(error);
				alert(
					"something went wrong when uploading text fields of this form \n more details in dev console"
				);
			}
		);
	}

	function remove_spec(id) {
		if (!window.confirm(ml({ en: "are you sure ?", fa: "آیا اطمینان دارید ؟" }))) {
			return;
		}
		var tmp = cloned_array(specs);
		set_specs(tmp.filter((i) => i.id != id));
	}
	function add_spec() {
		var tmp = cloned_array(specs);
		tmp.push({
			id: count,
			key: window.prompt(
				ml({ en: "enter specification key :", fa: "نام مشخصه را وارد کنید: " })
			),
			value: window.prompt(ml({ en: "enter its value:", fa: "مقدار مشخصه را وارد کنید: " })),
		});
		set_specs(tmp);
		set_count((count) => count + 1);
	}
	if (editor_js_instance === null) return;
	return (
		<Section
			title={ml({
				en: "new product page",
				fa: "بخش تعریف کالای جدید",
			})}
			className="mx-1 mt-2"
		>
			<div id="new_product" className="px-2">
				<p className="text-lg">
					{ml({
						en: "name:",
						fa: "نام کالا :",
					})}
				</p>
				<CustomInput id="name_input" />

				<p className="mt-2 text-lg">
					{ml({
						en: "description:",
						fa: "متن معرفی کالا:",
					})}
				</p>

				<div id="editor-js-div"></div>
				<p className="mt-2 text-lg">
					{ml({
						en: "product specifictions:",
						fa: "مشخصات محصول :",
					})}{" "}
				</p>
				<table>
					<tbody>
						<tr>
							<th>
								{ml({
									en: "id",
									fa: "شناسه",
								})}
							</th>

							<th>
								{ml({
									en: "key",
									fa: "نام مشخصه",
								})}
							</th>
							<th>
								{ml({
									en: "value",
									fa: "مقدار مشخصه",
								})}
							</th>
							<th>
								{ml({
									en: "options",
									fa: "گزینه ها",
								})}
							</th>
						</tr>
						{specs.map((spec) => {
							return (
								<tr key={spec.id}>
									<td>{spec.id}</td>
									<td>{spec.key}</td>
									<td>{spec.value}</td>
									<td onClick={() => remove_spec(spec.id)}>
										{ml({
											en: "remove",
											fa: "حذف این مورد",
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<button className="mt-2 px-1 border border-blue-400 rounded " onClick={add_spec}>
					مورد جدید
				</button>
				<p className="mt-2 text-lg">
					{ml({
						en: "price:",
						fa: "قیمت (تومان):",
					})}
				</p>
				<CustomInput id="price_input" />
				<p className="mt-2 text-lg">
					{ml({
						en: "images : ",
						fa: "عکس ها:",
					})}
				</p>
				<input id="images_input" type="file" multiple />
				<button
					onClick={submit_new_product}
					className="block border text-lg border-blue-400 rounded mt-4 hover:text-white hover:bg-blue-600 px-2 py-1"
				>
					{ml({
						en: "add new product as ",
						fa: "اضافه کردن کالای جدید به عنوان ",
					})}{" "}
					@{window.localStorage.getItem("username")}
				</button>
			</div>
		</Section>
	);
}

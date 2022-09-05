import React, { useContext, useState } from "react";
import "./s.css";
import { customAjax } from "../../../src/custom_ajax.js";
import { MenuItem, Select } from "@mui/material";
import { SelectCategory } from "./select_category";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
function CustomInput({ id }) {
	return <input id={id} className="border border-green-400 rounded px-2 py-1" />;
}

function cloned_obj(obj) {
	var tmp = {};
	for (key in obj) {
		tmp[key] = obj[key];
	}
	return tmp;
}
function cloned_array(arr) {
	var tmp = [];
	arr.forEach((item) => {
		tmp.push(item);
	});
	return tmp;
}
export default function NewProduct() {
	var [category, set_category] = useState(null);
	const [specs, set_specs] = useState([]);
	const [count, set_count] = useState(0);
	var [select_category_tab, set_select_category_tab] = useState("existing");

	async function submit_new_product() {
		customAjax({
			//todo check if category is null or required param is not given in all app
			params: {
				task_name: "new_product",
				name: document.getElementById("name_input").value,
				description: document.getElementById("description_input").value,
				product_specs: JSON.stringify(specs),
				price: document.getElementById("price_input").value,
				category:
					select_category_tab == "existing"
						? category
						: document.getElementById("new_category_input").value,
				discount_percent: Number(document.getElementById("discount_percent").value),
			},
		}).then(
			(data) => {
				var form = new FormData();
				var files = document.getElementById("images_input").files;
				var files_length = files.length;
				for (var i = 0; i < files_length; i++) {
					form.append(i, files[i]);
				}
				fetch(
					"http://" +
						window.location.hostname +
						":4000?task_name=upload_product_images&product_id=" +
						data.result,
					{
						method: "POST",
						body: form,
					}
				)
					.then((data) => data.text())
					.then((data) => console.log(data));
			},
			(error) => {
				console.log(error);
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

	return (
		<Section
			title={ml({
				en: "new product page",
				fa: "بخش تعریف کالای جدید",
			})}
		>
			<div id="new_product" className="px-2">
				<p className="text-xl">
					{ml({
						en: "name:",
						fa: "نام کالا :",
					})}
				</p>
				<CustomInput id="name_input" />

				<p className="mt-2 text-xl">
					{ml({
						en: "description:",
						fa: "متن معرفی کالا:",
					})}
				</p>
				<CustomInput id="description_input" />

				<p className="mt-2 text-lg">
					{ml({
						en: "product specifictions:",
						fa: "مشخصات محصول :",
					})}{" "}
					<button
						className="text-sm border border-blue-400 rounded inline"
						onClick={add_spec}
					>
						{ml({
							en: "add new",
							fa: "مورد جدید",
						})}
					</button>
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
				<p className="mt-2 text-xl">
					{ml({
						en: "price:",
						fa: "قیمت (تومان):",
					})}
				</p>
				<CustomInput id="price_input" />
				<p className="mt-2 text-xl">
					{ml({
						en: "discount percent:",
						fa: "درصد تخفیف",
					})}
				</p>
				<CustomInput id="discount_percent" />
				<SelectCategory
					select_category_tab={select_category_tab}
					set_select_category_tab={set_select_category_tab}
					set_category={set_category}
					category={category}
				/>

				<p className="mt-2 text-xl">
					{ml({
						en: "images : ",
						fa: "عکس ها:",
					})}
				</p>
				<input id="images_input" type="file" multiple />
				<button
					onClick={submit_new_product}
					className="block border text-xl border-blue-400 rounded mt-4 hover:text-white hover:bg-blue-600 px-2 py-1"
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

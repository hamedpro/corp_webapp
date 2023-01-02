import React, { useContext, useState } from "react";
import "./s.css";
import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
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
	async function submit_new_product() {
		customAjax({
			//todo check if required param is not given in all app
			params: {
				task_name: "new_product",
				name: document.getElementById("name_input").value,
				description: document.getElementById("description_input").value,
				product_specs: JSON.stringify(specs),
				price: document.getElementById("price_input").value,
				discount_percent: Number(document.getElementById("discount_percent").value),
			},
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
				<p className="mt-2 text-lg">
					{ml({
						en: "price:",
						fa: "قیمت (تومان):",
					})}
				</p>
				<CustomInput id="price_input" />
				<p className="mt-2 text-lg">
					{ml({
						en: "discount percent:",
						fa: "درصد تخفیف",
					})}
				</p>
				<CustomInput id="discount_percent" />
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

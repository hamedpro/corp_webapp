import React, { useState, useEffect } from "react";
import { customAjax } from "../custom_ajax.js";
import { Section } from "./Section";
import { multi_lang_helper as ml } from "../common";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import { custom_axios } from "../../api/client";
import { ProgressBarModal } from "./ProgressBarModal.jsx";
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
export function NewProduct() {
	const [specs, set_specs] = useState([]);
	const [count, set_count] = useState(0);
	var [upload_status, set_upload_status] = useState({
		is_uploading: false,
		upload_percentage: undefined,
	});
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
		var file_ids = [];
		//first we upload files one by one and store their keys inside file_ids variable
		for (var file of document.getElementById("images_input").files) {
			var form = new FormData();
			form.append("file", file);
			var { inserted_id } = (
				await custom_axios({
					url: "files?type=product_image",
					method: "post",
					data: form,
					onUploadProgress: (progressEvent) => {
						set_upload_status({
							is_uploading: true,
							upload_percentage: Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							),
						});
					},
				})
			).data;
			set_upload_status({
				is_uploading: false,
				upload_percentage: undefined,
			});
			file_ids.push(inserted_id);
		}
		var params = {
			task_name: "new_product",
			name: document.getElementById("name_input").value,
			description: JSON.stringify(await editor_js_instance.save()),
			product_specs: JSON.stringify(specs),
			price: entered_price,
			image_file_ids: JSON.stringify(file_ids),
		};
		await customAjax({
			//todo check if required param is not given in all app
			params,
		});
		alert("با موفقیت انجام شد");
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
		<>
			{upload_status.is_uploading && (
				<ProgressBarModal
					title={"بارگذاری عکس محصول"}
					info="یکی از عکس های این محصول در حال آپلود است."
					percentage={upload_status.upload_percentage}
				/>
			)}
			<Section
				title={ml({
					en: "new product page",
					fa: "بخش تعریف کالای جدید",
				})}
				className="mx-1 mt-2 w-full"
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
					<button
						className="mt-2 px-1 border border-blue-400 rounded "
						onClick={add_spec}
					>
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
		</>
	);
}

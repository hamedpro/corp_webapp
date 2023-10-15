import { useState, useEffect, useContext } from "react";
import { Section } from "./Section";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import { ProgressBarModal } from "./ProgressBarModal.jsx";
import { context } from "freeflow-react";
function CustomInput({ id }) {
	return (
		<input
			id={id}
			className="border border-green-400 rounded px-2 py-1 text-black"
		/>
	);
}
const cloned_array = (arr) => [...arr];
export function NewProduct() {
	var { cache, configured_axios, request_new_thing } = useContext(context);
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
				table: Table,
				checkList: Checklist,
			},
			placeholder: "محصول خود را معرفی کنید ",
		};
		set_editor_js_instance(new EditorJS(editor_js_conf));
	}, []);
	async function submit_new_product() {
		if (document.getElementById("images_input").files.length === 0) {
			alert("حداقل یک تصویر برای این کالا باید انتخاب کنید");
			return;
		}
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
			form.append("file_privileges", JSON.stringify({ read: "*", write: [-1] }));
			var { new_file_id } = (
				await configured_axios({
					url: "/files",
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
			file_ids.push(new_file_id);
		}
		var value = {
			name: document.getElementById("name_input").value,
			description: JSON.stringify(await editor_js_instance.save()),
			product_specs: specs,
			price: entered_price,
			image_file_ids: file_ids,
		};
		await request_new_thing({
			thing: {
				type: "product",
				value,
			},
			thing_privileges: { read: "*", write: [-1] },
		});

		alert("با موفقیت انجام شد");
	}

	function remove_spec(id) {
		if (!window.confirm("آیا اطمینان دارید ؟")) {
			return;
		}
		var tmp = cloned_array(specs);
		set_specs(tmp.filter((i) => i.id != id));
	}
	function add_spec() {
		var tmp = cloned_array(specs);
		tmp.push({
			id: count,
			key: window.prompt("نام مشخصه را وارد کنید: "),
			value: window.prompt("مقدار مشخصه را وارد کنید: "),
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
				title={"بخش تعریف کالای جدید"}
				className="mx-1 mt-2 w-full"
			>
				<div
					id="new_product"
					className="px-2"
				>
					<p className="text-lg ">{"نام کالا :"}</p>
					<CustomInput id="name_input" />

					<p className="mt-2 text-lg">{"متن معرفی کالا:"}</p>

					<div id="editor-js-div"></div>
					<p className="mt-2 text-lg">{"مشخصات محصول :"} </p>
					<table>
						<tbody>
							<tr>
								<th>{"شناسه"}</th>

								<th>{"نام مشخصه"}</th>
								<th>{"مقدار مشخصه"}</th>
								<th>{"گزینه ها"}</th>
							</tr>
							{specs.map((spec) => {
								return (
									<tr key={spec.id}>
										<td>{spec.id}</td>
										<td>{spec.key}</td>
										<td>{spec.value}</td>
										<td onClick={() => remove_spec(spec.id)}>
											{"حذف این مورد"}
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
					<p className="mt-2 text-lg">{"قیمت (تومان):"}</p>
					<CustomInput id="price_input" />
					<p className="mt-2 text-lg">{"عکس ها:"}</p>
					<input
						id="images_input"
						type="file"
						multiple
					/>
					<button
						onClick={submit_new_product}
						className="block border text-lg border-blue-400 rounded mt-4 hover:text-white hover:bg-blue-600 px-2 py-1"
					>
						{"اضافه کردن کالای جدید به عنوان "} @
						{window.localStorage.getItem("username")}
					</button>
				</div>
			</Section>
		</>
	);
}

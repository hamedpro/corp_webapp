import React, { useEffect, useState } from "react";
import Select from "react-select";
import { custom_axios, get_collection, get_data_pair, put_pair } from "../../../api/client";
import { customAjax } from "../../custom_ajax";
import { Section } from "../index.js";
import { StyledDiv } from "../styled_elements";
export const ManageContentSlider = () => {
	var [all_products, set_all_products] = useState();
	var [all_writings, set_all_writings] = useState();

	var [content_slider_content, set_content_slider_content] = useState();

	async function upload_new_image() {
		var file = document.getElementById("new_image_input").files[0];
		if (file === undefined) {
			alert("عکسی انتخاب کنید");
			return;
		}
		var f = new FormData();
		f.append("file", file);
		var { inserted_id } = (
			await custom_axios({
				data: f,
				url: "/files",
			})
		).data;
		var new_content_slider_content = JSON.parse(JSON.stringify(content_slider_content));
		new_content_slider_content.image_file_ids.push(inserted_id);
		await put_pair("content_slider_content", new_content_slider_content);
		await get_data();
	}
	async function delete_image(file_id) {
		//gets a file_id and deletes it from files collection and disk and also
		// from image_file_ids prop of content_slider_content
		if (window.confirm("ایا اطمینان دارید میخواهید این عکس را حذف کنید ؟؟") !== true) return;
		var new_content_slider_content = JSON.parse(JSON.stringify(content_slider_content));
		new_content_slider_content.image_file_ids.splice(
			new_content_slider_content.image_file_ids.indexOf(file_id),
			1
		);
		await put_pair("content_slider_content", new_content_slider_content);
		await custom_axios({
			method: "delete",
			url: `/files/${file_id}`,
		});
		await get_data();
		alert("با موفقیت انجام شد");
	}
	async function products_select_onchange(new_value) {
		var new_content_slider_content = JSON.parse(JSON.stringify(content_slider_content));
		new_content_slider_content.product_ids = new_value.map((i) => i.value);
		await put_pair("content_slider_content", new_content_slider_content);
		await get_data();
	}
	async function writings_select_onchange(new_value) {
		var new_content_slider_content = JSON.parse(JSON.stringify(content_slider_content));
		new_content_slider_content.writing_ids = new_value.map((i) => i.value);
		await put_pair("content_slider_content", new_content_slider_content);
		await get_data();
	}
	async function get_data() {
		let content_slider_content = (await get_data_pair("content_slider_content")) || {
			product_ids: [],
			writing_ids: [],
			image_file_ids: [],
		};
		set_content_slider_content(content_slider_content);
		set_all_products(
			(
				await customAjax({
					params: {
						task_name: "get_products",
					},
				})
			).result
		);
		set_all_writings(
			(
				await get_collection({
					collection_name: "writings",
					filters: {},
				})
			).data
		);
	}
	useEffect(() => {
		get_data();
	}, []);
	if ([all_products, all_writings, content_slider_content].some((i) => i === undefined))
		return <h1>loading ... </h1>;
	return (
		<div className="flex flex-col w-full ">
			<Section title="بخش مدیریت اسلایدر صفحه اصلی" className="w-full" innerClassName="p-2">
				<h1 className="text-lg">کالا های انتخاب شده: </h1>
				<p className="text-sm mb-2">کالا های مورد نظر خود را علامت بزنید</p>
				<Select
					isMulti
					isSearchable
					options={all_products.map((product, index) => {
						return {
							value: product.id,
							label: product.name,
						};
					})}
					value={all_products
						.filter((product) =>
							content_slider_content.product_ids.includes(product.id)
						)
						.map((i) => {
							return { value: i.id, label: i.name };
						})}
					onChange={products_select_onchange}
				/>
				<h1 className="text-lg mt-2">نوشته های انتخاب شده:</h1>
				<p className="text-sm mb-2">
					نوشته های مورد نظر خود را از بین همه موارد ثبت شده زیر انتخاب کنید:{" "}
				</p>
				<Select
					isMulti
					isSearchable
					options={all_writings.map((writing, index) => {
						return {
							value: writing._id,
							label: writing.title,
						};
					})}
					onChange={writings_select_onchange}
					value={all_writings
						.filter((w) => content_slider_content.writing_ids.includes(w._id))
						.map((w) => {
							return { value: w._id, label: w.title };
						})}
				/>
			</Section>
			<Section title="عکس های فعلی" className="mt-2" innerClassName="p-2 flex space-x-2">
				{content_slider_content.image_file_ids.map((image_file_id) => {
					return (
						<div
							key={image_file_id}
							className="border border-blue-400 rounded w-40 aspect-auto mx-1"
						>
							<h1 className="text-center">#{image_file_id}</h1>
							<img src={new URL(`/files/${image_file_id}`, vite_api_endpoint).href} />
							<button
								onClick={() => delete_image(image_file_id)}
								className="text-center w-full h-6 bg-red-500 text-white duration-300 hover:bg-red-600 rounded-b"
							>
								حذف کردن این عکس
							</button>
						</div>
					);
				})}
			</Section>
			<Section title="اپلود عکس جدید" className="mt-2" innerClassName="p-2">
				<input id="new_image_input" type="file" />
				<br />
				<StyledDiv onClick={upload_new_image} className="mt-2">
					اپلود این عکس
				</StyledDiv>
			</Section>
		</div>
	);
};

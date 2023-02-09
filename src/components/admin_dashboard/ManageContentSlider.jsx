import React, { useEffect, useState } from "react";
import Select from "react-select";
import { custom_axios, get_collection, get_data_pair, put_pair } from "../../../api/client";
import { customAjax } from "../../custom_ajax";
export const ManageContentSlider = () => {
	var [all_products, set_all_products] = useState();
	var [all_writings, set_all_writings] = useState();

	var [content_slider_content, set_content_slider_content] = useState();

	async function upload_new_image() {
		var file = document.getElementById("new_image_input").files[0];
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
		<div>
			<h1>ManageContentSlider</h1>
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
					.filter((product) => content_slider_content.product_ids.includes(product.id))
					.map((i) => {
						return { value: i.id, label: i.name };
					})}
				onChange={products_select_onchange}
			/>

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
			<div className="border border-blue-400 ">
				{content_slider_content.image_file_ids.map((image_file_id) => {
					return (
						<div
							key={image_file_id}
							className="border border-blue-400 w-40 aspect-auto"
						>
							<h1>there is an image with this id : {image_file_id}</h1>
							<img src={new URL(`/files/${image_file_id}`, vite_api_endpoint).href} />
							<button onClick={() => delete_image(image_file_id)}>
								delete this image
							</button>
						</div>
					);
				})}
				<br />
				---------
				<input id="new_image_input" type="file" />
				<button onClick={upload_new_image}>add this new image</button>
			</div>
		</div>
	);
};

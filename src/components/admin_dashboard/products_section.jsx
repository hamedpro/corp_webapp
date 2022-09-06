import { AddAPhoto, Delete } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import { CustomTable } from "../../components/custom_table/comp";
export default function ProductsSection() {
	const [products, set_products] = useState([]);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	var modify_product = ({ task, payload }) => {
		if (task === "name") {
			var new_name = window.prompt(
				ml({
					en: "enter the new name of this product:",
					fa: "نام این محصول را وارد کنید: ",
				})
			);

			customAjax({
				params: {
					task_name: "change_product_name",
					new_name,
					product_id: payload.product_id,
				},
			})
				.then(
					(data) => {
						alert(
							ml({
								en: "done",
								fa: "انجام شد",
							})
						);
					},
					(error) => {
						console.log(error);
					}
				)
				.finally(() => {
					fetch_data();
				});
		} else if (task === "description") {
			var new_description = window.prompt(
				ml({
					en: "enter the new description of this product:",
					fa: "توضیحات این محصول را وارد کنید: ",
				})
			);

			customAjax({
				params: {
					task_name: "change_product_description",
					product_id: payload.product_id,
					new_description,
				},
			})
				.then(
					(data) => {
						alert(
							ml({
								en: "done",
								fa: "انجام شد",
							})
						);
					},
					(error) => {
						console.log(error);
					}
				)
				.finally(() => {
					fetch_data();
				});
		} else if (task === "price") {
			var new_price = window.prompt(
				ml({
					en: "enter the new price of this product:",
					fa: "قیمت جدید این محصول را وارد کنید: ",
				})
			);
			if (isNaN(Number(new_price))) {
				window.alert(
					ml({
						en: "given price was not a number",
						fa: "مقدار وارد شده به عنوان قیمت یک عدد نبود",
					})
				);
				return;
			}
			customAjax({
				params: {
					task_name: "change_product_price",
					product_id: payload.product_id,
					new_price: Number(new_price),
				},
			})
				.then(
					(data) => {
						alert(
							ml({
								en: "done",
								fa: "انجام شد",
							})
						);
					},
					(error) => {
						console.log(error);
					}
				)
				.finally(() => {
					fetch_data();
				});
		}
	};
	return (
		<div className="flex flex-col">
			{ml({
				en: "products:",
				fa: "محصولات",
			})}
			{products.map((product, index) => {
				return (
					<React.Fragment key={index}>
						<CustomTable
							className={"mt-2"}
							headerItems={[
								ml({
									en: "id",
									fa: "شناسه",
								}),
								,
								ml({
									en: "name",
									fa: "نام",
								}),
								ml({
									en: "description",
									fa: "توضیحات",
								}),
								ml({
									en: "price",
									fa: "قیمت",
								}),
							]}
							rows={[
								[
									{
										value: product.id,
										onClick: () => {
											alert("product id can't be changed");
										},
									},
									{
										value: product.name,
										onClick: () => {
											modify_product({
												task: "name",
												payload: {
													product_id: product.id,
												},
											});
										},
									},
									{
										value: product.description,
										onClick: () => {
											modify_product({
												task: "description",
												payload: {
													product_id: product.id,
												},
											});
										},
									},
									{
										value: product.price,
										onClick: () => {
											modify_product({
												task: "price",
												payload: {
													product_id: product.id,
												},
											});
										},
									},
								],
							]}
						>
							<h1>product specifications :</h1>

							<h1>photos :</h1>
							<div className="flex space-x-2">
								{product.images_path_names.map((image_path_name, index) => {
									return (
										<div
											key={index}
											className="h-16 w-16 shrink-0 flex justify-center items-center"
										>
											<img
												style={{ objectFit: "contain" }}
												className="w-full"
												src={gen_link_to_file(
													"./product_images/" + image_path_name
												)}
											/>
										</div>
									);
								})}
								<div className="h-16 w-16 shrink-0 flex justify-center items-center bg-blue-400 rounded-lg ">
									<AddAPhoto />
								</div>
							</div>
						</CustomTable>
					</React.Fragment>
				);
			})}
		</div>
	);
}

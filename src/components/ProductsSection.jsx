import { AddAPhoto, InfoRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

import { customAjax } from "../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../common.js";
import { CustomTable } from "./CustomTable";
import { Alert } from "./Alert.jsx";
import { Loading } from "./Loading.jsx";
import { StyledDiv } from "./StyledElements";
import { ProgressBarModal } from "./ProgressBarModal.jsx";
export function ProductsSection() {
	const [products, set_products] = useState(null);
	var [upload_state, set_upload_state] = useState({
		is_uploading: false,
		percent: undefined,
	});
	function delete_product(product_id) {
		customAjax({
			params: {
				task_name: "delete_product",
				product_id: Number(product_id),
			},
		})
			.then(
				(data) => {
					alert("done successfuly !");
				},
				(error) => {
					alert("something went wrong. more details are in console");
					console.log(error);
				}
			)
			.finally(() => {
				fetch_data();
			});
	}
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
	async function upload_new_product_image(product_id) {
		var file = document.getElementById("new_product_image_input").files[0];
		var form = new FormData();
		form.append("file", file);
		var { inserted_id } = (
			await custom_axios({
				url: `/files?type=product_image`,
				method: "post",
				data: form,
				onUploadProgress: (e) => {
					set_upload_state({
						percent: Math.round((e.loaded * 100) / e.total),
						is_uploading: true,
					});
				},
			})
		).data;
		set_upload_state({
			is_uploading: false,
			percent: undefined,
		});
		var product = products.find((product) => product.id === Number(product_id));
		customAjax({
			params: {
				task_name: "update_product_data",
				image_file_ids: JSON.stringify(
					JSON.parse(product.image_file_ids).concat(inserted_id)
				),
				product_id: product.id,
			},
		}).then(
			(data) => {
				alert("done successfuly!");
				fetch_data();
			},
			(e) => {
				alert("something went wrong");
				console.log(e);
			}
		);
	}
	function start_upload_progress(product_id) {
		var el = document.getElementById("new_product_image_input");
		el.onchange = () => upload_new_product_image(product_id);
		el.click();
	}
	function del_product_image(current_product, image_file_id) {
		if (!confirm("are you sure that you want to delete this picture?")) return;
		//todo delete all images also from disk
		customAjax({
			params: {
				task_name: "update_product_data",
				image_file_ids: JSON.stringify(
					JSON.parse(current_product.image_file_ids).filter((i) => i !== image_file_id)
				),
				product_id: current_product.id,
			},
		}).then(
			(data) => {
				alert("done");
				fetch_data();
			},
			(e) => {
				alert("something went wrong!");
				console.log(e);
			}
		);
	}
	return (
		<>
			{upload_state.is_uploading && (
				<ProgressBarModal
					title="بارگذاری عکس جدید"
					info="عکس جدید این محصول در حال بارگذاری است ..."
					percentage={upload_state.percent}
				/>
			)}
			<div className="flex flex-col">
				<input
					id="new_product_image_input"
					type="file"
					className="hidden"
				/>
				{ml({
					en: "products:",
					fa: "محصولات",
				})}
				<Loading is_loading={products === null} />
				{products !== null && (
					<>
						{products.length === 0 && (
							<Alert
								icon={<InfoRounded />}
								className="mt-2"
							>
								{ml({
									en: "there is not any product",
									fa: "اینجا هیچ محصولی وجود ندارد",
								})}
							</Alert>
						)}
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
												en: "price",
												fa: "قیمت",
											}),
										]}
										rows={[
											[
												{
													value: product.id,
													onClick: () => {
														alert(
															ml({
																en: `product id can't be changed`,
																fa: "شناسه کالا قابل تغییر نیست",
															})
														);
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
										<h1>
											{ml({
												en: "product specifications :",
												fa: "مشخصات فنی محصول",
											})}
										</h1>

										<h1>
											{ml({
												en: "photos :",
												fa: "عکس های محصول :",
											})}{" "}
											(برای حذف کردن عکس روی آن کلیک کنید)
										</h1>
										<div className="flex space-x-2">
											{JSON.parse(product.image_file_ids).map(
												(image_file_id, index) => {
													return (
														<div
															key={index}
															className="h-16 w-16 shrink-0 flex justify-center items-center"
														>
															<img
																style={{ objectFit: "contain" }}
																className="h-full"
																onClick={() =>
																	del_product_image(
																		product,
																		image_file_id
																	)
																}
																src={
																	new URL(
																		`/files/${image_file_id}`,
																		vite_api_endpoint
																	).href
																}
															/>
														</div>
													);
												}
											)}
											<div
												className="h-16 w-16 shrink-0 flex justify-center items-center bg-blue-400 rounded-lg "
												onClick={() => start_upload_progress(product.id)}
											>
												<AddAPhoto />
											</div>
										</div>
										<StyledDiv
											onClick={() => delete_product(product.id)}
											className="mt-2"
										>
											حذف کردن این کالا
										</StyledDiv>
									</CustomTable>
								</React.Fragment>
							);
						})}
					</>
				)}
			</div>
		</>
	);
}

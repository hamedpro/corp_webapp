import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
export default function ProductsSection() {
	const Specs = (props) => {
		const [specs, set_specs] = useState([]);
		const [staged_specs, set_staged_specs] = useState([]);
		var fetch_data = () => {
			customAjax({
				params: {
					task_name: "get_products",
					product_id: props.product_id,
				},
			}).then((data) => {
				set_specs(
					JSON.parse(
						data.result.filter((product) => product.id == Number(props.product_id))[0]
							.product_specs
					)
				);
				set_staged_specs(
					JSON.parse(
						data.result.filter((product) => product.id == Number(props.product_id))[0]
							.product_specs
					)
				);
			});
		};
		useEffect(() => {
			fetch_data();
		}, []);
		function handle_delete(spec_id) {
			customAjax({
				params: {
					task_name: "delete_spec",
					product_id: props.product_id,
					spec_id,
				},
			}).then(
				(data) => {
					fetch_data();
				},
				(error) => {
					alert(
						ml({
							en: "something went wrong while deleting the spec",
							fa: "در هنگام پاک کردن این مشخصه مشکلی پیش آمد",
						})
					);
					console.log(error);
				}
			);
		}
		function handle_add_new_spec() {
			var spec_key = window.prompt(
				ml({
					en: "enter spec key :",
					fa: "نام مشخصه را وارد کنید :",
				})
			);
			var spec_value = window.prompt(
				ml({
					en: "enter spec value :",
					fa: "مقدار مشخصه را وارد کنید: ",
				})
			);

			customAjax({
				params: {
					task_name: "add_new_spec",
					spec_key,
					spec_value,
					product_id: props.product_id,
				},
			}).then(
				(data) => {
					alert(
						ml({
							en: "done",
							fa: "انجام شد",
						})
					);
					fetch_data();
				},
				(error) => {
					alert(
						ml({
							en: "something went wrong",
							fa: "مشکلی پیش آمد",
						})
					);
					console.log(error);
				}
			);
		}
		function change_spec_value(spec_id) {
			customAjax({
				params: {
					task_name: "change_spec_value",
					product_id: props.product_id,
					spec_id,
					new_spec_value: window.prompt(
						ml({
							en: "enter new spec value here",
							fa: "مقدار جدید مشخصه را وارد کنید",
						})
					),
				},
			})
				.then(
					() => {
						alert(
							ml({
								en: "done",
								fa: "انجام شد",
							})
						);
					},
					(error) => {
						alert(
							ml({
								en: "something went wrong",
								fa: "مشکلی رخ داد",
							})
						);
						console.log(error);
					}
				)
				.finally(() => {
					fetch_data();
				});
		}
		function change_spec_key(spec_id) {
			customAjax({
				params: {
					task_name: "change_spec_key",
					product_id: props.product_id,
					spec_id,
					new_spec_key: window.prompt(
						ml({
							en: "enter new spec key here",
							fa: "مقدار جدید مشخصه را وارد کنید",
						})
					),
				},
			})
				.then(
					() => {
						alert(
							ml({
								en: "done",
								fa: "انجام شد",
							})
						);
					},
					(error) => {
						alert(
							ml({
								en: "something went wrong",
								fa: "مشکلی رخ داد",
							})
						);
						console.log(error);
					}
				)
				.finally(() => {
					fetch_data();
				});
		}
		return (
			<>
				<table>
					<tbody>
						<tr>
							<th>
								{ml({
									en: "key",
									fa: "نام آیتم",
								})}
							</th>
							<th>
								{ml({
									en: "value",
									fa: "مقدار آیتم",
								})}
							</th>
							<th>
								{ml({
									en: "options",
									fa: "گزینه ها",
								})}
							</th>
						</tr>
						{staged_specs.map((spec) => {
							return (
								<tr key={spec.id}>
									<td>
										{spec.key}{" "}
										<b onClick={() => change_spec_key(spec.id)}>
											{ml({
												en: "edit",
												fa: "ویرایش",
											})}
										</b>
									</td>
									<td>
										{spec.value}{" "}
										<b onClick={() => change_spec_value(spec.id)}>
											{ml({
												en: "edit",
												fa: "ویرایش",
											})}
										</b>
									</td>
									<td onClick={() => handle_delete(spec.id)}>
										{ml({
											en: "delete this",
											fa: "حذف این آیتم",
										})}
									</td>
								</tr>
							);
						})}
						<tr>
							<td onClick={handle_add_new_spec}>
								{ml({
									en: "add new spec here",
									fa: "اضافه کردن مشخصه جدید",
								})}
							</td>
						</tr>
					</tbody>
				</table>
			</>
		);
	};

	const [products, set_products] = useState([]);
	function update_products_section() {
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
		update_products_section();
	}, []);
	var modify_product = ({ task, payload }) => {
		switch (task) {
			case "name":
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
						update_products_section();
					});
				break;
			case "description":
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
						update_products_section();
					});
				break;
			case "specs":
				var product_id = Number(payload.product_id);
				window.localStorage.setItem("product_id", product_id);
				set_pop_up_data({
					title:
						ml({
							en: "changing specs of product",
							fa: "تغییر مشخصات محصول",
						}) +
						" #" +
						payload.product_id,
					visibility: true,
				});
				break;
			case "price":
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
						update_products_section();
					});
				break;
		}
	};
	return (
		<>
			<div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
				<h1>
					{ml({
						en: "products:",
						fa: "محصولات",
					})}
				</h1>
				<hr />
				<table className="custom_border">
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
									en: "name",
									fa: "نام",
								})}
							</th>
							<th>
								{ml({
									en: "description",
									fa: "توضیحات",
								})}
							</th>
							<th>
								{ml({
									en: "specs as json",
									fa: "مشخصات در فرمت json",
								})}
							</th>
							<th>
								{ml({
									en: "price",
									fa: "قیمت",
								})}
							</th>
						</tr>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>
										{product.name}
										<b
											onClick={() =>
												modify_product({
													task: "name",
													payload: { product_id: product.id },
												})
											}
										>
											{" "}
											{ml({
												en: "modify",
												fa: "ویرایش",
											})}
										</b>
									</td>
									<td>
										{product.description}
										<b
											onClick={() =>
												modify_product({
													task: "description",
													payload: { product_id: product.id },
												})
											}
										>
											{" "}
											{ml({
												en: "modify",
												fa: "تغییر",
											})}
										</b>
									</td>
									<td>
										<Specs product_id={product.id} />
									</td>
									<td>
										{product.price}
										<b
											onClick={() =>
												modify_product({
													task: "price",
													payload: { product_id: product.id },
												})
											}
										>
											{" "}
											{ml({
												en: "modify",
												fa: "تغییر",
											})}
										</b>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}

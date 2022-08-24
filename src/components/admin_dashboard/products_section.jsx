import React, { useState, useEffect, useContext } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import ShowDataModal from "../show_data_modal/comp";
import { multi_lang_helper } from "../../common.js";
import { AppContext } from "../../AppContext";
export default function ProductsSection() {
	var ml = new multi_lang_helper(useContext(AppContext));
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
						ml.render({
							en: "something went wrong while deleting the spec",
							fa: "",
						})
					);
					console.log(error);
				}
			);
		}
		function handle_add_new_spec() {
			var spec_key = window.prompt(
				ml.render({
					en: "enter spec key :",
					fa: "",
				})
			);
			var spec_value = window.prompt(
				ml.render({
					en: "enter spec value :",
					fa: "",
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
						ml.render({
							en: "done",
							fa: "",
						})
					);
					fetch_data();
				},
				(error) => {
					alert(
						ml.render({
							en: "something went wrong when asking server to add new spec",
							fa: "",
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
						ml.render({
							en: "enter new spec value here",
							fa: "",
						})
					),
				},
			})
				.then(
					() => {
						alert(
							ml.render({
								en: "done",
								fa: "",
							})
						);
					},
					(error) => {
						alert(
							ml.render({
								en: "something went wrong",
								fa: "",
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
						ml.render({
							en: "enter new spec key here",
							fa: "",
						})
					),
				},
			})
				.then(
					() => {
						alert(
							ml.render({
								en: "done",
								fa: "",
							})
						);
					},
					(error) => {
						alert(
							ml.render({
								en: "something went wrong",
								fa: "",
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
								{ml.render({
									en: "key",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "value",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "options",
									fa: "",
								})}
							</th>
						</tr>
						{staged_specs.map((spec) => {
							return (
								<tr key={spec.id}>
									<td>
										{spec.key}{" "}
										<b onClick={() => change_spec_key(spec.id)}>
											{ml.render({
												en: "edit",
												fa: "",
											})}
										</b>
									</td>
									<td>
										{spec.value}{" "}
										<b onClick={() => change_spec_value(spec.id)}>
											{ml.render({
												en: "edit",
												fa: "",
											})}
										</b>
									</td>
									<td onClick={() => handle_delete(spec.id)}>
										{ml.render({
											en: "delete this",
											fa: "",
										})}
									</td>
								</tr>
							);
						})}
						<tr>
							<td onClick={handle_add_new_spec}>
								{ml.render({
									en: "add new spec here",
									fa: "",
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
					ml.render({
						en: "enter the new name of this product:",
						fa: "",
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
								ml.render({
									en: "done",
									fa: "",
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
					ml.render({
						en: "enter the new description of this product:",
						fa: "",
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
								ml.render({
									en: "done",
									fa: "",
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
						ml.render({
							en: "changing specs of product #",
							fa: "",
						}) + payload.product_id,
					visibility: true,
				});
				break;
			case "price":
				var new_price = window.prompt(
					ml.render({
						en: "enter the new price of this product:",
						fa: "",
					})
				);
				if (isNaN(Number(new_price))) {
					window.alert(
						ml.render({
							en: "given price was not a number",
							fa: "",
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
								ml.render({
									en: "done",
									fa: "",
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
					{ml.render({
						en: "products:",
						fa: "",
					})}
				</h1>
				<hr />
				<table className="custom_border">
					<tbody>
						<tr>
							<th>
								{ml.render({
									en: "id",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "name",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "description",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "specs as json",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "price",
									fa: "",
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
											{ml.render({
												en: "modify",
												fa: "",
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
											{ml.render({
												en: "modify",
												fa: "",
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
											{ml.render({
												en: "modify",
												fa: "",
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

import React, { useState, useEffect } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
import ShowDataModal from "../show_data_modal/comp";
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
					alert("something went wrong while deleting the spec");
					console.log(error);
				}
			);
		}
		function handle_add_new_spec() {
			var spec_key = window.prompt("enter spec key :");
			var spec_value = window.prompt("enter spec value :");

			customAjax({
				params: {
					task_name: "add_new_spec",
					spec_key,
					spec_value,
					product_id: props.product_id,
				},
			}).then(
				(data) => {
					alert("done");
					fetch_data();
				},
				(error) => {
					alert("something went wrong when asking server to add new spec");
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
					new_spec_value: window.prompt("enter new spec value here"),
				},
			})
				.then(
					() => {
						alert("done");
					},
					(error) => {
						alert("something went wrong");
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
					new_spec_key: window.prompt("enter new spec key here"),
				},
			})
				.then(
					() => {
						alert("done");
					},
					(error) => {
						alert("something went wrong");
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
							<th>key</th>
							<th>value</th>
							<th>options</th>
						</tr>
						{staged_specs.map((spec) => {
							return (
								<tr key={spec.id}>
									<td>
										{spec.key}{" "}
										<b onClick={() => change_spec_key(spec.id)}>edit</b>
									</td>
									<td>
										{spec.value}{" "}
										<b onClick={() => change_spec_value(spec.id)}>edit</b>
									</td>
									<td onClick={() => handle_delete(spec.id)}>delete this</td>
								</tr>
							);
						})}
						<tr>
							<td onClick={handle_add_new_spec}>add new spec here</td>
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
				var new_name = window.prompt("enter the new name of this product:");

				customAjax({
					params: {
						task_name: "change_product_name",
						new_name,
						product_id: payload.product_id,
					},
				})
					.then(
						(data) => {
							alert("done");
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
				var new_description = window.prompt("enter the new description of this product:");

				customAjax({
					params: {
						task_name: "change_product_description",
						product_id: payload.product_id,
						new_description,
					},
				})
					.then(
						(data) => {
							alert("done");
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
					title: "changing specs of product #" + payload.product_id,
					visibility: true,
				});
				break;
			case "price":
				var new_price = window.prompt("enter the new price of this product:");
				if (isNaN(Number(new_price))) {
					window.alert("given price was not a number");
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
							alert("done");
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
				<h1>products:</h1>
				<hr />
				<table className="custom_border">
					<tbody>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>description</th>
							<th>specs as json</th>
							<th>price</th>
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
											(modify)
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
											(modify)
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
											(modify)
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

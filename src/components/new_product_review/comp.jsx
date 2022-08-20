import { ArrowBackIosNewRounded, DeleteRounded } from "@mui/icons-material";
import { Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import ListItem from "../list_item/comp";
export function NewProductReview({}) {
	var username = window.localStorage.getItem("username");
	var [rating_from_five, set_rating_from_five] = useState(1);
	var product_id = Number(useParams().product_id);
	var [product, setProduct] = useState(null);
	var [pros, set_pros] = useState([]);
	var [cons, set_cons] = useState([]);
	var nav = useNavigate();
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then((data) => {
			setProduct(data.result.find((i) => i.id == product_id));
		});
	}
	useEffect(fetch_data, []);
	function submit() {
		//todo add keyboard events to whole app
		//todo report to vs code that save on windows change maybe
		//doesnt work here on ubuntu for example when switching between apps
		//using alt-tab
		customAjax({
			params: {
				task_name: "new_product_user_review",
				username,
				rating_from_five,
				cons: JSON.stringify(cons),
				pros: JSON.stringify(pros),
				text: document.getElementById("review_text_textarea").value,
				time: new Date().getTime(),
				product_id,
			},
		}).then(
			(data) => {
				alert("done");
			},
			(error) => {
				console.log(error);
			}
		);
	}
	function remove_pro_or_con(mode, index_to_remove) {
		//modes : pro , con
		if (mode == "pro") {
			set_pros(pros.filter((i, index) => index !== index_to_remove));
		}
		if (mode == "con") {
			set_cons(cons.filter((i, index) => index !== index_to_remove));
		}
	}
	function add_a_new_con() {
		var tmp = cons.map((i) => i);
		var el = document.getElementById("new_con_input");
		tmp.push(el.value);
		el.value = "";
		set_cons(tmp);
	}
	function add_a_new_pro() {
		var tmp = pros.map((i) => i);
		var el = document.getElementById("new_pro_input");
		tmp.push(el.value);
		el.value = "";
		console.log(tmp);
		set_pros(tmp);
	}
	return (
		<div
			className="fixed top-0 left-0 w-full h-full z-40 bg-blue-500"
			style={{ overflowY: "scroll" }}
		>
			<div
				className="w-full h-16 bg-blue-600 fixed flex pt-2 flex-col"
				style={{ zIndex: 51 }}
			>
				<div
					className="flex items-center space-x-1"
					onClick={() => nav(`/products/${product_id}/reviews`)}
				>
					<ArrowBackIosNewRounded
						sx={{ color: "white" }}
						className="hover:bg-blue-800 rounded ml-1 p-1 h-14 w-14"
					/>
					<span className="text-xl py-0 my-0 text-white">your review</span>
				</div>
				<div className="flex">
					<p className="left-8 relative text-stone-400">
						about "{product === null ? "loading data..." : product.name}"
					</p>
				</div>
			</div>
			<div className="w-full h-16 relative"></div>
			{/* todo add column : i suggest it to buy or not and submit anynomus */}
			<h1 className="text-lg p-2 text-white">rate this product from 1 to 5 :</h1>
			<div className="flex">
				<Rating
					value={rating_from_five}
					onChange={(event, new_value) => {
						set_rating_from_five(new_value);
					}}
					size="large"
					className="ml-4"
					precision={1}
				/>
			</div>
			<h1 className="m-2 mt-5 text-white">pros:</h1>
			<div className="flex">
				<input id="new_pro_input" type="text" className="w-3/4 ml-2 h-8 rounded px-2" />
				<button
					className="h-8 w-8 p-2 text-white bg-blue-600 rounded ml-2 flex justify-center items-center"
					onClick={add_a_new_pro}
				>
					add
				</button>
			</div>
			{pros.map((pro, index) => {
				return (
					<div key={index} className="flex mt-2">
						<ListItem items={[pro]} remove_arrow={true} className="w-3/4 inline" />
						<button onClick={() => remove_pro_or_con("pro", index)}>
							<DeleteRounded sx={{ color: "white" }} />
						</button>
					</div>
				);
			})}

			<h1 className="m-2 mt-5 text-white">cons:</h1>
			<div className="flex">
				<input id="new_con_input" type="text" className="w-3/4 ml-2 h-8 rounded px-2" />

				<button
					onClick={add_a_new_con}
					className="h-8 w-8 p-2 text-white bg-blue-600 rounded ml-2 flex justify-center items-center"
				>
					add
				</button>
			</div>
			{cons.map((con, index) => {
				return (
					<div key={index} className="flex mt-2">
						<ListItem items={[con]} remove_arrow={true} className="w-3/4 inline" />
						<button onClick={() => remove_pro_or_con("con", index)}>
							<DeleteRounded sx={{ color: "white" }} />
						</button>
					</div>
				);
			})}
			<div className="p-2 mt-2">
				<h1 className="text-lg mb-1 text-white">your review text :</h1>
				<textarea id="review_text_textarea" className="p-1 rounded" />
			</div>

			<div className="w-full border-t border-stone-400 h-1"></div>
			<div className="mx-auto flex items-center justify-center flex-col w-3/4">
				<Button
					variant="contained"
					size="large"
					color="success"
					sx={{ mt: 2 }}
					onClick={submit}
				>
					submit as @{username}
				</Button>
				<p className="text-xs text-center mt-3">
					your review will be shown after it's verified by any of the admins
				</p>
			</div>
		</div>
	);
}

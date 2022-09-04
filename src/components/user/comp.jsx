import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { HideImageRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Section from "../section/comp.jsx";
import { OrdersPageOrder } from "../orders/orders_page_order.jsx";
import React from "react";
import { OptionsSection } from "./options_section.jsx";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import { CheckUserPrivilege } from "../CheckUserPrivilege/comp.jsx";
function Item(props) {
	return (
		<div
			className={
				"flex justify-center items-center rounded-xl px-2 py-1 text-xs cursor-pointer duration-400" +
				(props.primary
					? " bg-blue-600 text-white hover:bg-blue-800 "
					: " bg-white text-blue-800 border border-blue-300 hover:border-blue-800 ")
			}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
}
export default function User() {
	var [orders_to_show, set_orders_to_show] = useState([]);
	var nav = useNavigate();
	var username = useParams().username;
	var translated_loading = ml({
		en: "loading ...",
		fa: "در حال بارگذاری...",
	});
	const [user, set_user] = useState({
		id: translated_loading,
		username: translated_loading,
		is_admin: translated_loading,
	});
	function upload_the_photo() {
		var file_input = document.getElementById("profile_image_input");
		if (file_input.length == 0) {
			alert(ml({ en: "profile image input was empty", fa: "بدون عکس پروفایل" }));
			return;
		}
		var form = new FormData();
		var file = file_input.files[0];
		form.append("image", file);
		fetch(
			"http://" +
				window.location.hostname +
				":4000?task_name=new_user_profile_image&username=" +
				username,
			{
				method: "POST",
				body: form,
			}
		)
			.then(
				(data) => data.json(),
				(error) => {
					alert(
						ml({
							en: "error in uploading photo",
							fa: "مشکلی در هنگام بارگذای عکس ها رخ داد",
						})
					);
					console.log(error);
				}
			)
			.then(
				(data) => {
					if (data.result) {
						alert(ml({ en: "done", fa: "انجام شد" }));
					}
				},
				(error) => {
					//todo handle error here and convert simple fetchs to customAjax
				}
			)
			.finally(() => {
				fetch_data();
			});
	}

	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_user(data.result.filter((i) => i.username == username)[0]);
			},
			(error) => {
				console.log(error);
			}
		);
		customAjax({
			params: {
				task_name: "has_user_profile_image",
				username,
			},
		}).then((data) => {
			set_has_user_profile_image(data.result);
			//handle errors in these cases
		});

		customAjax({
			params: {
				task_name: "get_user_orders",
				username,
			},
		}).then(
			(data) => {
				var orders = data.result;
				set_orders_to_show(orders.slice(0, 3));
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);

	return (
		<CheckUserPrivilege level="specific_user_or_admin" specific_username={username}>
			<>
				<input
					onChange={upload_the_photo}
					id="profile_image_input"
					type="file"
					className="hidden"
				/>
				<div
					className={`mx-1 border 
      border-red-400 rounded mt-4 relative pb-2`}
				>
					<div className="cover_image rounded-t bg-blue-400 h-20 w-full mb-6"></div>
					<div
						style={{ left: Math.round((1 / 8) * 100) + "%" }}
						className="bg-blue-500 flex flex-col justify-center items-center profile_photo_frame absolute -translate-y-4 rounded-full border-2 border-blue-300 overflow-hidden top-0 h-28 w-28"
					>
						{!user.has_profile_image ? (
							<>
								{" "}
								{/* todo add animations add skeleton loading or ... to all app  */}
								<HideImageRounded sx={{ color: "white", mb: 1 }} />
								<h1 className="text-white text-center text-sm">
									{ml({
										en: "profile image is not uploaded",
										fa: "عکس پروفایل آپلود نشده است ",
									})}
								</h1>
							</>
						) : (
							<img
								className="w-full h-full min-h-10 border border-blue-400"
								src={
									/* todo switch to https */
									gen_link_to_file(
										"./profile_images/" + user.profile_image_file_name
									)
								}
							/>
						)}
					</div>
					<div className="px-6">
						<h1 className="text-lg">@{user.username}</h1>
						<h5 className="text-sm text-stone-500">
							{ml({ en: "has subscribed from", fa: "عضو شده است از " })}{" "}
							{new Date(Number(user.time)).toDateString()}
						</h5>
					</div>
					<div className="flex overflow-auto space-x-1 px-6 mt-3">
						<Item onClick={() => nav("/users/" + username + "/orders")} primary={true}>
							{ml({ en: "orders history", fa: "تاریخچه سفارش ها" })}
						</Item>
						<Item
							onClick={() => {
								document.getElementById("profile_image_input").click();
							}}
						>
							{ml({
								en: "set new profile image",
								fa: "تنظیم عکس پروفایل جدید",
							})}
						</Item>
						<Item>...</Item>
					</div>
					<OptionsSection after_options={fetch_data} />
					<Section title={ml({ en: "orders", fa: "سفارش ها" })}>
						{orders_to_show.map((order, index) => {
							return (
								<React.Fragment key={index}>
									<OrdersPageOrder order={order} />
								</React.Fragment>
							);
						})}
					</Section>
				</div>
			</>
		</CheckUserPrivilege>
	);
}

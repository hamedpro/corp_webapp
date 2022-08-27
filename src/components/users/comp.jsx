import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import LinkLikeP from "../LinkLikeP/comp";
import "./styles.css";
import { Button } from "@mui/material";
import { ArrowCircleRightRounded } from "@mui/icons-material";
import { multi_lang_helper as ml } from "../../common";
import { AppContext } from "../../AppContext";
export default () => {
	var [userStatus, setUserStatus] = useState(null);
	var nav = useNavigate();
	var [users, set_users] = useState([]);
	var fetch_data = () => {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_users(data.result);
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
		);
		if (window.localStorage.getItem("username") === null) {
			setUserStatus("not_logged_in");
		} else {
			customAjax({
				params: { task_name: "get_users" },
			}).then(
				(data) => {
					setUserStatus(
						data.result.find(
							(user) => user.username == window.localStorage.getItem("username")
						)["is_admin"] == "true"
							? "admin"
							: "not_admin"
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
			);
		}
	};
	useEffect(fetch_data, []);
	if (userStatus == "not_logged_in") {
		return (
			<div className="border-stone-300 border mx-1 mt-2 p-2 flex justify-center items-center flex-col">
				<span className="text-lg">
					{ml({
						en: "you're not logged in",
						fa: "شما وارد حساب خود نشده اید",
					})}
				</span>
				<span className="text-stone-500 text-center text-sm mb-2">
					{ml({
						en: "we can't determine if you have admin privileges or not",
						fa: "ما نمی توانیم تشخیص دهیم که شما دسترسی مدیر دارید یا نه",
					})}
				</span>
				<Button
					color="primary"
					onClick={() => nav("/login")}
					variant="contained"
					size="small"
				>
					login
				</Button>
			</div>
		);
	}
	if (userStatus == "not_admin") {
		return (
			<div className="border-stone-300 border mx-1 mt-2 p-2 flex justify-center items-center flex-col">
				<span className="text-lg">
					{ml({
						en: "you have not admin privileges",
						fa: "شما دسترسی مدیر سایت ندارید ",
					})}
				</span>
				<span className="text-stone-500 text-center text-sm mb-2">
					this account has not admin privileges to access this part
				</span>
				<Button
					color="primary"
					onClick={() => nav("/login")}
					variant="contained"
					size="small"
				>
					{ml({
						en: "login with another account",
						fa: "ورود به حساب کاربری دیگر",
					})}
				</Button>
			</div>
		);
	}
	if (userStatus == "admin") {
		return (
			<div className="border border-stone-300 mx-1 mt-2 p-2">
				<h1>
					{ml({
						en: "users :",
						fa: "کاربران: ",
					})}
				</h1>
				{users.map((user) => {
					return (
						<div
							key={user.id}
							onClick={() => nav("/users/" + user.username)}
							className="relative  p-2 cursor-pointer border border-blue-400 rounded mx-1 mt-2 text-sx hover:bg-blue-600 hover:text-blue-200 duration-300 users_page_user_item"
						>
							<h6>
								{ml({
									en: "user id:",
									fa: "شناسه کاربر:",
								})}{" "}
								<span>{user.id}</span>
							</h6>
							<h6>
								{ml({
									en: "username:",
									fa: "نام کاربری:",
								})}{" "}
								<span>{user.username}</span>
							</h6>
							<h6>
								{ml({
									en: "email:",
									fa: "آدرس ایمیل: ",
								})}
								:{" "}
								<span>
									{user.email === null
										? ml({
												en: "not available",
												fa: "ناموجود",
										  })
										: user.email}
								</span>
							</h6>
							<h6>
								{ml({
									en: "user phone number:",
									fa: "شماره موبایل کاربر:",
								})}{" "}
								<span>
									{user.phone_number === null
										? ml({ en: "not entered", fa: "وارد نشده است" })
										: user.phone_number}
								</span>
							</h6>
							<h6>
								is_subscribed_to_email:
								<span>{user.is_subscribed_to_email}</span>
							</h6>
							<h6>
								is_subscribed_to_sms :<span>{user.is_subscribed_to_sms}</span>
							</h6>
							<div className="icon">
								<ArrowCircleRightRounded sx={{ color: "white" }} />
							</div>
						</div>
					);
				})}
			</div>
		);
	}
};

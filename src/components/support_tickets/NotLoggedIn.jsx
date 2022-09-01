import React from "react";
import { multi_lang_helper as ml } from "../../common";
const NotLoggedIn = () => {
	return (
		<div className="mx-auto w-full border border-blue-400 rounded p-2 mt-2 flex justify-center items-center flex-col">
			<h1 className="text-center">
				{ml({
					en: "you are not logged in , please login first",
					fa: "شما وارد جساب کاربری خود نشده اید. لطفا ابتدا وارد شوید.",
				})}
			</h1>
			<button
				onClick={() => {
					nav("/login");
				}}
				className="p-1 border border-blue-400 hover:bg-blue-400 hover:text-white"
			>
				{ml({
					en: "login",
					fa: "ورود به حساب کاربری",
				})}
			</button>
		</div>
	);
};

export default NotLoggedIn;

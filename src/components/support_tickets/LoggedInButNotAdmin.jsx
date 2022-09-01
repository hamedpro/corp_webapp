import React from "react";
import { useNavigate } from "react-router-dom";
import { multi_lang_helper as ml } from "../../common";
const LoggedInButNotAdmin = () => {
	var nav = useNavigate();
	return (
		<div className="mx-auto w-full border border-blue-400 rounded p-2 mt-2 flex justify-center items-center flex-col">
			<h1 className="text-center">
				{ml({
					en: "you are logged in as",
					fa: "",
				})}{" "}
				@{window.localStorage.getItem("username")}{" "}
				{ml({
					en: "but this user has not admin privileges",
					fa: "",
				})}
			</h1>
			<p className="text-center">{}</p>
			<button
				onClick={() => {
					nav("/login");
				}}
				className="p-1 border border-blue-400 hover:bg-blue-400 hover:text-white"
			>
				{ml({
					en: "login",
					fa: "",
				})}
			</button>
		</div>
	);
};

export default LoggedInButNotAdmin;

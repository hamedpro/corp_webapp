import React from "react";
import { useNavigate } from "react-router-dom";

const LoggedInButNotAdmin = () => {
	var nav = useNavigate();
	return (
		<div className="mx-auto w-full border border-blue-400 rounded p-2 mt-2 flex justify-center items-center flex-col">
			<h1 className="text-center">
				you are logged in as @{window.localStorage.getItem("username")} but this user has
				not admin privileges
			</h1>
			<p className="text-center">login with an admin user account</p>
			<button
				onClick={() => {
					nav("/login");
				}}
				className="p-1 border border-blue-400 hover:bg-blue-400 hover:text-white"
			>
				login
			</button>
		</div>
	);
};

export default LoggedInButNotAdmin;

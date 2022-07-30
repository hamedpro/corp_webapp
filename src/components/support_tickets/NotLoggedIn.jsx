import React from "react";

const NotLoggedIn = () => {
	return (
		<div className="mx-auto w-full border border-blue-400 rounded p-2 mt-2 flex justify-center items-center flex-col">
			<h1 className="text-center">you are not logged in , please login first</h1>
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

export default NotLoggedIn;

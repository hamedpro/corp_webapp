import React from "react";

const HeaderMenu = (props) => {
	//props : "hide_header_menu : function" , "visibility : boolean"
	if (!props.visibility) {
		return null;
	}
	return (
		<>
			<div
				className="fixed bg-gray-300 h-full w-full z-40"
				onClick={() => props.hide_header_menu()}
			></div>
			<div className="bg-blue-400 w-3/4 h-full p-0 m-0 z-50">
				<h1>corp_webapp</h1>
				<p>something about our company</p>
			</div>
		</>
	);
};

export default HeaderMenu;

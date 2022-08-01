import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import context from "../../global_context";
import HeaderMenu from "./header_menu";
export default function MainHeader() {
	var nav = useNavigate();
	var [header_menu_visibility, set_header_menu_visibility] = useState(false);

	return (
		<>
			<HeaderMenu
				hide_header_menu={() => set_header_menu_visibility(false)}
				visibility={header_menu_visibility}
			/>
			<div className={`w-full flex items-center flex-row p-2 border-b-2 border-gray-300`}>
				<div className="w-3/4 flex flex-row items-center">
					<Button
						variant="outlined"
						sx={{ width: "20px", height: 20 }}
						onClick={() => set_header_menu_visibility(true)}
					></Button>
					<span className="px-2">corp_webapp</span>
				</div>
				<div className="w-1/4 flex flex-row justify-end">
					<div
						onClick={
							window.localStorage.getItem("username") === null
								? () => {
										nav("/login");
								  }
								: () => {
										nav("/user/" + window.localStorage.getItem("username"));
								  }
						}
						className="cursor-pointer px-1 text-white bg-blue-500 border rounded flex justify-center items-center"
					>
						{window.localStorage.getItem("username") === null ? (
							<b>login</b>
						) : (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="white"
									className="bi bi-person-fill mr-2"
									viewBox="0 0 16 16"
								>
									<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<b className="cursor-pointer">
									@{window.localStorage.getItem("username")}
								</b>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

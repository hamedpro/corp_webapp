import {
	LocalMallRounded,
	LoginRounded,
	MenuRounded,
	PersonRounded,
	SearchRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./header_menu";
import { useEffect } from "react";
import SearchModal from "../search_page/comp";
import { multi_lang_helper as ml } from "../../common";
export default function MainHeader() {
	var nav = useNavigate();
	var [header_menu_visibility, set_header_menu_visibility] = useState(false);
	var [username, set_username] = useState(window.localStorage.getItem("username"));
	function CustomButton(props) {
		//todo add hover effect
		return (
			<button
				onClick={props.onClick}
				className={
					"border border-sky-600 rounded-lg flex items-center justify-center h-10 w-10 p-1" +
					" " +
					(typeof props.className == "undefined" ? "" : props.className)
				}
			>
				{props.children}
			</button>
		);
	}
	useEffect(() => {
		setInterval(() => {
			//find a better way to handle this
			set_username(window.localStorage.getItem("username"));
		}, 1000);
	}, []);
	//todo auth use using jwt
	var [is_search_modal_visible, set_is_search_modal_visible] = useState(false);
	return (
		<>
			<SearchModal
				visibility={is_search_modal_visible}
				hide_func={() => set_is_search_modal_visible(false)}
			/>
			<HeaderMenu
				hide_header_menu={() => set_header_menu_visibility(false)}
				visibility={header_menu_visibility}
			/>
			<div className="h-28 w-full"></div>
			<div
				className={`bg-sky-700 z-30 top-0 fixed h-28 w-full flex items-start pt-2 flex-row p-2 border-b border-gray-300`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="w-full flex flex-row items-center">
						<CustomButton
							className="h-10 w-10 border border-stone-300 rounded-xl p-1 flex justify-center items-center"
							onClick={() => set_header_menu_visibility(!header_menu_visibility)}
						>
							<MenuRounded fontSize="large" style={{ color: "lightgray" }} />
						</CustomButton>
						<h1
							onClick={() => nav("/")}
							className="cursor-pointer px-2 text-lg m-0 p-0 bg-sky-600 rounded-lg pb-1 text-white ml-2 rounded h-10 flex items-center"
						>
							corp_webapp
						</h1>
						<div className="ml-auto flex space-x-2">
							{username === null ? (
								<CustomButton onClick={() => nav("/login")}>
									<LoginRounded sx={{ color: "white" }} fontSize="large" />
								</CustomButton>
							) : (
								<>
									<CustomButton
										onClick={() => nav("/users/" + username + "/shopping-card")}
									>
										<LocalMallRounded
											sx={{ color: "white" }}
											fontSize="large"
										/>
									</CustomButton>
									<CustomButton onClick={() => nav("/users/" + username)}>
										<PersonRounded sx={{ color: "white" }} fontSize="large" />
									</CustomButton>
								</>
							)}
						</div>
					</div>

					<div className="flex mt-2 mb-2 w-full">
						<div
							className="border border-gray-400 rounded-lg flex items-center h-10 w-full mt-2 px-2 space-x-1"
							onClick={() => set_is_search_modal_visible(true)}
						>
							<SearchRounded sx={{ color: "blue" }} />
							<h1 className="text-gray-100">
								{ml({
									en: "type something here",
									fa: "چیزی اینجا بنویسید",
								})}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

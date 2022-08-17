import {
	LocalMallRounded,
	LoginRounded,
	MenuRounded,
	PersonRounded,
	SearchRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./header_menu";
import { useEffect } from "react";
import SearchModal from "../search_page/comp";
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
					"border border-stone-400 rounded-lg flex items-center justify-center" +
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
			<div className="h-20 w-full"></div>
			<div
				className={`bg-stone-100 z-30 top-0 fixed h-20 w-full flex items-start pt-2 flex-row p-2 border-b border-gray-300`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="w-full flex flex-row items-center">
						<Button
							variant="outlined"
							sx={{
								minHeight: 0,
								minWidth: 0,
								width: "33px",
								height: "33px",
								padding: 1,
								borderRadius: "10px",
								border: "1px solid lightgray",
							}}
							onClick={() => set_header_menu_visibility(!header_menu_visibility)}
						>
							<MenuRounded />
						</Button>
						<h1 className="px-2 text-lg m-0 p-0 bg-sky-600 rounded-lg pb-1 text-white ml-2 rounded ">
							corp_webapp
						</h1>
						<div className="ml-auto flex space-x-2">
							<CustomButton>
								<LocalMallRounded sx={{ color: "blue" }} />
							</CustomButton>

							{username === null ? (
								<CustomButton onClick={() => nav("/login")}>
									<LoginRounded sx={{ color: "blue" }} />
								</CustomButton>
							) : (
								<CustomButton onClick={() => nav("/users/" + username)}>
									<PersonRounded sx={{ color: "blue" }} />
								</CustomButton>
							)}
						</div>
					</div>

					<div className="flex mt-2 mb-2 w-full">
						<div
							className="border border-gray-300 rounded-lg flex items-center w-full"
							onClick={() => set_is_search_modal_visible(true)}
						>
							<SearchRounded sx={{ color: "blue" }} />
							<h1 className="text-gray-500 text-sm">type something here</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

import {
	KeyboardArrowDownRounded,
	KeyboardArrowUpRounded,
	LoginRounded,
	MenuRounded,
	Person2Rounded,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./header_menu";
import { useEffect } from "react";
import SearchModal from "../search_page/comp";
import { SearchRow } from "./SearchRow";
import { header_options_array } from "./HeaderOptionsArray";
import { get_collection, get_company_info } from "../../../api/client";
function MainHeaderLeftDropDown() {
	var nav = useNavigate();
	var [is_open, set_is_open] = useState(false);
	return (
		<div className="mx-2 w-36 h-10 relative">
			<div
				className={`text-white overflow-hidden absolute duration-300 w-36 z-20 bg-blue-500 top-0 left-0 ${
					is_open ? "h-32" : "h-8"
				}`}
				onClick={() => set_is_open((prev) => !prev)}
			>
				<div className="hover:bg-blue-600 duration-300 h-8 w-full flex items-center">
					<Person2Rounded sx={{ color: "white" }} />
					<h1>{localStorage.getItem("username")}</h1>
					{is_open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
				</div>
				<div
					className="hover:bg-blue-600 duration-300 h-8 w-full px-2"
					onClick={() =>
						nav(`/users/${window.localStorage.getItem("username")}/shopping-card`)
					}
				>
					سبد خرید من
				</div>
				<div
					className="hover:bg-blue-600 duration-300 h-8 w-full px-2"
					onClick={() => nav(`/users/${window.localStorage.getItem("username")}`)}
				>
					حساب کاربری من
				</div>
				<div
					className="hover:bg-blue-600 duration-300 h-8 w-full px-2"
					onClick={() => {
						window.localStorage.removeItem("username");
						window.location.replace("/");
					}}
				>
					خروج از حساب کاربری
				</div>
			</div>
		</div>
	);
}
function LandscapeHeaderOption({ icon, content, url }) {
	var nav = useNavigate();
	return (
		<div
			className="shrink-0 flex-wrap flex space-x-2 p-2 text-white hover:bg-blue-700 duration-300 cursor-pointer"
			onClick={url.startsWith("http") ? () => window.location.assign(url) : () => nav(url)}
		>
			{icon}
			<h1>{content}</h1>
		</div>
	);
}
export default function MainHeader() {
	var [company_name, set_company_name] = useState("loading...");
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
	async function get_data() {
		var company_info = await get_company_info();
		set_company_name("name" in company_info ? company_info.name : "بدون نام");
	}
	useEffect(() => {
		setInterval(() => {
			//todo find a better way to handle this
			set_username(window.localStorage.getItem("username"));
		}, 2000);
		get_data();
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
			<div
				className={`bg-sky-700 z-30 top-0 w-full flex items-start pt-2 flex-row p-2 pb-0 border-b border-gray-300`}
			>
				<div className="flex flex-col w-full h-full">
					<div className="w-full flex flex-row items-center justify-between">
						<div className="flex">
							<CustomButton
								className="sm:hidden h-10 w-10 border border-stone-500 rounded-xl p-1 flex justify-center items-center"
								onClick={() => set_header_menu_visibility(!header_menu_visibility)}
							>
								<MenuRounded fontSize="large" style={{ color: "lightgray" }} />
							</CustomButton>
							<h1
								onClick={() => nav("/")}
								className="cursor-pointer px-2 text-lg p-0 bg-sky-600 pb-1 text-white mx-2 rounded h-10 flex items-center"
							>
								{company_name}
							</h1>
						</div>
						<div className="hidden sm:flex w-full items-center">
							<SearchRow set_is_search_modal_visible={set_is_search_modal_visible} />
						</div>
						<div className="flex space-x-2 items-center">
							{username === null ? (
								<CustomButton onClick={() => nav("/login")} className="mr-2">
									<LoginRounded sx={{ color: "white" }} fontSize="large" />
								</CustomButton>
							) : (
								<MainHeaderLeftDropDown />
							)}
						</div>
					</div>

					<div className="flex mt-2 mb-2 w-full sm:hidden">
						<SearchRow set_is_search_modal_visible={set_is_search_modal_visible} />
					</div>
					<div className="mt-4 w-full sm:flex hidden overflow-x-auto">
						{header_options_array.map((option) => {
							return (
								<Fragment key={option.url}>
									<LandscapeHeaderOption
										icon={<option.icon />}
										content={option.text}
										url={option.url}
									/>
								</Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

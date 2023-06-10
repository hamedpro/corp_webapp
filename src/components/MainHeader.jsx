import {
	KeyboardArrowDownRounded,
	KeyboardArrowUpRounded,
	LoginRounded,
	MenuRounded,
	Person2Rounded,
	SettingsRemoteRounded,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMenu } from "./HeaderMenu";
import { useEffect } from "react";
import { SearchModal } from "./SearchModal";
import { SearchRow } from "./SearchRow";
import { header_options_array } from "./HeaderOptionsArray";
import { get_company_info } from "../../api/client";
import { InternetControlModal } from "./InternetControlModal";
import { CustomDropDown } from "../components/CustomDropDown";
import { Link } from "@mui/material";
function MainHeaderLeftDropDown() {
	var nav = useNavigate();
	return (
		<CustomDropDown
			optionsClassName="bg-gray-500 hover:bg-gray-700 hover:border border-gray-500"
			options={[
				{
					text: localStorage.getItem("username"),
					icon: () => <Person2Rounded sx={{ color: "white" }} />,
				},
				{
					onClick: () =>
						nav(`/users/${window.localStorage.getItem("username")}/shopping-card`),
					text: "سبد خرید من",
				},
				{
					onClick: () => nav(`/users/${window.localStorage.getItem("username")}`),
					text: "حساب کاربری من",
				},
				{
					onClick: () => {
						window.localStorage.removeItem("username");
						window.location.replace("/");
					},
					text: "خروج از حساب کاربری",
				},
			]}
		/>
	);
}
function LandscapeHeaderOption({ icon, content, url }) {
	var nav = useNavigate();
	var [is_open, set_is_open] = useState(false);

	return (
		<>
			{!url && <InternetControlModal open={is_open} onClose={() => set_is_open(false)} />}

			<div
				className="shrink-0 flex-wrap flex space-x-2 p-2 text-white hover:bg-gray-500 hover:text-white duration-300 cursor-pointer"
				onClick={
					url
						? url.startsWith("http")
							? () => window.location.assign(url)
							: () => nav(url)
						: () => set_is_open(true)
				}
			>
				{icon}
				<h1>{content}</h1>
			</div>
		</>
	);
}
export function MainHeader() {
	var [company_name, set_company_name] = useState("loading...");
	var nav = useNavigate();
	var [header_menu_visibility, set_header_menu_visibility] = useState(false);
	var [username, set_username] = useState(window.localStorage.getItem("username"));
	function CustomButton({ children, className, onClick }) {
		//todo add hover effect
		return (
			<button
				onClick={onClick}
				className={
					"border border-sky-600 rounded-lg flex items-center justify-center h-10 w-10 p-1" +
					" " +
					(typeof className == "undefined" ? "" : className)
				}
			>
				{children}
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
				className={`bg-gray-700 z-30 top-0 w-full flex items-start pt-2 flex-row p-2 pb-0 border-b border-gray-300`}
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
								className="cursor-pointer px-4 text-lg p-0 bg-gray-500 pb-1 text-white mx-2 rounded h-10 flex items-center"
								style={{ width: "max-content" }}
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
					<div className="mt-4 w-full sm:flex hidden">
						{header_options_array.map((option) => {
							return (
								<Fragment key={Math.random() * 10000}>
									{option.x ? (
										<CustomDropDown
											optionsClassName="bg-gray-700 hover:bg-gray-500 hover:border border-gray-500"
											options={[
												{
													text: "کنترل اینترنتی",
													icon: SettingsRemoteRounded,
												},
												{
													text: "چیلر",
													icon: Link,
													onClick: () =>
														location.assign(
															"http://vatankhah.pishro-control.ir/multi_systems"
														),
												},
												{
													text: "داکت اسپلیت",
													icon: Link,
													onClick: () =>
														location.assign(
															"https://mpkchiller.com/duct"
														),
												},
												{
													text: "فن کوئل",
													icon: Link,
													onClick: () =>
														location.assign(
															"https://mpkchiller.com/dimmer"
														),
												},
												{
													text: "کولر آبی",
													icon: Link,
													onClick: () => {},
												},
												{
													text: "پریز هوشمند",
													icon: Link,
													onClick: () =>
														location.assign(
															"https://mpkchiller.com/power"
														),
												},
											]}
										/>
									) : (
										<LandscapeHeaderOption
											icon={<option.icon />}
											content={option.text}
											url={option.url}
										/>
									)}
								</Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

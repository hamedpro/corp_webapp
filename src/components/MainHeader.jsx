import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMenu } from "./HeaderMenu";
import { SearchModal } from "./SearchModal";
import { SearchRow } from "./SearchRow";
import { header_options_array } from "./HeaderOptionsArray";
import { InternetControlModal } from "./InternetControlModal";
import { CustomDropDown } from "../components/CustomDropDown";
import { find_active_profile_seed } from "freeflow-core/dist/utils";
import { context } from "freeflow-react";
function MainHeaderLeftDropDown() {
	var { set_state, profiles_seed, cache } = useContext(context);

	var user_id = find_active_profile_seed(profiles_seed)?.user_id;
	var email_address = cache.find((ci) => ci.thing_id === user_id)?.thing.value.email_address;
	var nav = useNavigate();
	return (
		<CustomDropDown
			optionsClassName="bg-gray-500 hover:bg-gray-700 hover:border border-gray-500"
			options={[
				{
					onClick: () => nav(`/users/${user_id}/shopping-card`),
					text: "سبد خرید من",
					icon: () => <i className="bi bi-card-checklist flex items-center" />,
				},
				{
					onClick: () => nav(`/users/${user_id}`),
					text: "حساب کاربری من",
					icon: () => <i className="bi bi-box-arrow-right flex items-center" />,
				},
				{
					onClick: () => {
						set_state((prev) => ({
							...prev,
							profiles_seed: prev.profiles_seed.filter((ps) => ps.is_active !== true),
						}));
					},
					text: "خروج",
					icon: () => <i className="bi bi-person flex items-center" />,
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
			{!url && (
				<InternetControlModal
					open={is_open}
					onClose={() => set_is_open(false)}
				/>
			)}

			<div
				className=" rounded-lg shrink-0 flex-wrap flex space-x-2 p-2 text-white hover:bg-gray-500 hover:text-white duration-300 cursor-pointer"
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
function CustomButton({ children, className, onClick }) {
	//todo add hover effect
	return (
		<button
			onClick={onClick}
			className={
				"border  rounded-lg flex items-center justify-center h-10 w-10 p-1" +
				" " +
				(typeof className == "undefined" ? "" : className)
			}
		>
			{children}
		</button>
	);
}
export function MainHeader() {
	var { set_state, profiles_seed, cache } = useContext(context);

	var user_id = find_active_profile_seed(profiles_seed)?.user_id;
	var email_address = cache.find((ci) => ci.thing_id === user_id)?.thing.value.email_address;

	var company_name =
		cache.find((ci) => ci.thing.type === "company_info")?.thing.value.name || "بدون نام";
	var nav = useNavigate();
	var [header_menu_visibility, set_header_menu_visibility] = useState(false);
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
				className={`bg-gray-700 z-30 w-full flex p-2 flex-col border-b border-gray-300 h-28`}
			>
				<div className="w-full flex items-center justify-between">
					<div className="flex">
						<CustomButton
							className="sm:hidden h-10 w-10 border border-stone-500 rounded-xl p-1 flex justify-center items-center"
							onClick={() => set_header_menu_visibility(!header_menu_visibility)}
						>
							<i className="bi bi-list text-white flex items-center justify-center text-xl" />
						</CustomButton>
						<h1
							onClick={() => nav("/")}
							className="cursor-pointer px-4 text-lg p-0 bg-gray-500 pb-1 text-white mx-2 rounded h-10 flex items-center"
							style={{ width: "max-content" }}
						>
							{company_name}
						</h1>
					</div>
					<div className="hidden sm:flex w-full items-center px-2">
						<SearchRow set_is_search_modal_visible={set_is_search_modal_visible} />
					</div>

					<div className="flex items-center">
						{user_id === undefined || user_id < 1 ? (
							<CustomButton
								className=" h-10 w-fit border border-gray-400 rounded-lg p-1 flex space-x-2 justify-center items-center"
								onClick={() => nav("/login")}
							>
								<span className="whitespace-nowrap">ورود به حساب</span>
								<i className="bi bi-box-arrow-in-left text-white flex items-center justify-center text-xl" />
							</CustomButton>
						) : (
							<MainHeaderLeftDropDown />
						)}
					</div>
				</div>
				<div className="flex">
					<div className="flex mt-2 w-full sm:hidden">
						<SearchRow set_is_search_modal_visible={set_is_search_modal_visible} />
					</div>
					<div className="mt-4 w-full sm:flex hidden whitespace-nowrap">
						{header_options_array.map((option) => {
							return (
								<Fragment key={Math.random() * 10000}>
									{option.x ? (
										<CustomDropDown
											optionsClassName="shrink-0 bg-gray-700 hover:bg-gray-500 hover:border border-gray-500"
											options={[
												{
													text: "کنترل اینترنتی",
													icon: () => <i className="bi bi-sliders"></i>,
												},
												{
													text: "چیلر",
													icon: () => <i className="bi bi-link" />,
													onClick: () =>
														location.assign(
															"https://vatankhah.pishro-control.ir:4443/multi_systems"
														),
												},
												{
													text: "داکت اسپلیت",
													icon: () => <i className="bi bi-link" />,
													onClick: () =>
														location.assign(
															"https://mpkchiller.com/duct"
														),
												},
												{
													text: "فن کوئل",
													icon: () => <i className="bi bi-link" />,
													onClick: () =>
														location.assign(
															"https://mpkchiller.com/dimmer"
														),
												},
												{
													text: "کولر آبی",
													icon: () => <i className="bi bi-link" />,
													onClick: () => {},
												},
												{
													text: "پریز هوشمند",
													icon: () => <i className="bi bi-link" />,
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

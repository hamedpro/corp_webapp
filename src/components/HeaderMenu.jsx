import { ListItem } from "./ListItem";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Section } from "./Section";
import { multi_lang_helper as ml } from "../common";
import { customAjax } from "../custom_ajax";
import { header_options_array } from "./HeaderOptionsArray";
import { InternetControlModal } from "./InternetControlModal";

export const HeaderMenu = ({ hide_header_menu, visibility }) => {
	//props : hide_header_menu : function , visibility : boolean
	var username = window.localStorage.getItem("username");
	var [is_open, set_is_open] = useState(false);
	var nav = useNavigate();
	var nav_and_hide_header_menu = (path) => {
		hide_header_menu();
		nav(path);
	};
	var [show_admin_routes, set_show_admin_routes] = useState(false);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				var user = data.result.find((i) => i.username === username);
				set_show_admin_routes(username !== null && user !== undefined && user.is_admin);
			},
			(error) => {}
		);
	}, [visibility]);
	if (!visibility) {
		return null;
	}
	return (
		<>
			<InternetControlModal open={is_open} onClose={() => set_is_open(false)} />
			{/* <div
				className="fixed bg-gray-300 h-full w-full z-40"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onClick={() => hide_header_menu()}
			></div> */}
			<div className="bg-white absolute w-full p-0 m-0 z-40 overflow-y-auto top-28 header_menu overflow-x-hidden px-1 pt-1">
				<Section
					title={ml({
						en: "routes",
						fa: "مسیر ها",
					})}
				>
					{header_options_array
						.filter((option) => {
							if (option.just_for_admin) {
								return show_admin_routes;
							} else {
								return true;
							}
						})
						.map((option) => {
							return (
								<Fragment key={Math.random() * 10000}>
									<ListItem
										items={[option.text]}
										onClick={
											option.url
												? option.url.startsWith("http")
													? () => window.location.assign(option.url)
													: () => nav_and_hide_header_menu(option.url)
												: () => set_is_open(true)
										}
										beforeItems={<option.icon sx={{ color: "white" }} />}
									/>
								</Fragment>
							);
						})}
				</Section>
			</div>
		</>
	);
};

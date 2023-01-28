import ListItem from "../list_item/comp";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./styles.css";
import {
	AddBusinessRounded,
	AdminPanelSettingsRounded,
	ArticleRounded,
	Download,
	HomeRounded,
	InfoRounded,
	PersonAddRounded,
	SettingsRemoteRounded,
	StoreRounded,
	SupportAgentRounded,
} from "@mui/icons-material";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import { header_options_array } from "./HeaderOptionsArray";

const HeaderMenu = (props) => {
	//props : "hide_header_menu : function" , "visibility : boolean"
	var username = window.localStorage.getItem("username");

	var nav = useNavigate();
	var nav_and_hide_header_menu = (path) => {
		props.hide_header_menu();
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
	}, [props.visibility]);
	if (!props.visibility) {
		return null;
	}
	return (
		<>
			{/* <div
				className="fixed bg-gray-300 h-full w-full z-40"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onClick={() => props.hide_header_menu()}
			></div> */}
			{/* todo export the above fixed div as a background component for pop ups and modals and 
			update every where which use this or something like this */}
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
								<Fragment key={option.url}>
									<ListItem
										items={[option.text]}
										onClick={
											option.url.startsWith("http")
												? () => window.location.assign(option.url)
												: () => nav_and_hide_header_menu(option.url)
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

export default HeaderMenu;

import { Button } from "@mui/material";
import ListItem from "../list_item/comp";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import {
	AccountCircleRounded,
	AddBusinessRounded,
	AddCircleRounded,
	AdminPanelSettingsRounded,
	GroupRounded,
	HomeRounded,
	InfoRounded,
	NewspaperRounded,
	PersonAddRounded,
	StoreRounded,
	SupportAgent,
} from "@mui/icons-material";
import Section from "../section/comp";
const HeaderMenu = (props) => {
	//props : "hide_header_menu : function" , "visibility : boolean"

	var [username, set_username] = useState(window.localStorage.getItem("username"));
	var sync_status = () => {
		set_username(window.localStorage.getItem("username"));
	};
	function log_out_button() {
		window.localStorage.removeItem("username");
		sync_status();
	}
	setInterval(sync_status, 1000);
	var nav = useNavigate();
	var custom_nav = (path) => {
		props.hide_header_menu();
		nav(path);
	};
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
			<div className="bg-white fixed w-full p-0 m-0 z-50 overflow-y-auto top-16 header_menu">
				<div className="flex flex-row h-16 p-2 items-center border mt-2 border-stone-300 m-1 rounded">
					<div className="pr-3 w-2/6  h-full flex flex-col justify-center">
						<div className="w-full h-2/3 bg-blue-400 rounded"></div>
						<h3 className="text-xs mt-1 h-1/3">corp_webapp</h3>
					</div>
					<div className=" border-gray-200 w-4/6 flex justify-end">
						{username === null ? (
							<Button
								variant="outlined"
								color="primary"
								size="small"
								onClick={() => {
									nav("/login");
									props.hide_header_menu();
								}}
							>
								<LoginRoundedIcon />
								<span className="ml-1">login</span>
							</Button>
						) : (
							<div
								className="w-fit mx-2 cursor-pointer flex break-all space-x-1 bg-blue-400 p-1 rounded justify-end items-center"
								style={{}}
								onClick={() => nav("/users/" + username)}
							>
								<AccountCircleRounded sx={{ fontSize: "11px" }} />
								<span
									className="break-words inline-block text-xs"
									style={{ fontSize: "11px" }}
								>
									dashboard
								</span>
							</div>
						)}
					</div>
				</div>
				<Section title={"routes"}>
					<ListItem
						items={["home"]}
						onClick={() => custom_nav("/")}
						beforeItems={<HomeRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["login"]}
						onClick={() => custom_nav("/login")}
						beforeItems={<LoginRoundedIcon sx={{ color: "white" }} />}
					/>

					<ListItem
						items={["register new user"]}
						onClick={() => custom_nav("/register")}
						beforeItems={<PersonAddRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["admin dashboard"]}
						onClick={() => custom_nav("/admin-dashboard")}
						beforeItems={<AdminPanelSettingsRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["about company"]}
						onClick={() => custom_nav("/company-info")}
						beforeItems={<InfoRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["new support ticket"]}
						onClick={() => custom_nav("/new-support-ticket")}
						beforeItems={<SupportAgent sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["products"]}
						onClick={() => custom_nav("/products")}
						beforeItems={<StoreRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["users"]}
						onClick={() => custom_nav("/users")}
						beforeItems={<GroupRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["add new product"]}
						onClick={() => custom_nav("/new-product")}
						beforeItems={<AddBusinessRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["blog posts"]}
						onClick={() => custom_nav("/blog-posts")}
						beforeItems={<NewspaperRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={["new blog post"]}
						onClick={() => custom_nav("/new-blog-post")}
						beforeItems={<AddCircleRounded sx={{ color: "white" }} />}
					/>
				</Section>
			</div>
		</>
	);
};

export default HeaderMenu;

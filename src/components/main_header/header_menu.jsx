import { Typography, List, Button, ButtonGroup } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
	ViewListRounded,
} from "@mui/icons-material";
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
			<div
				className="fixed bg-gray-300 h-full w-full z-40"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onClick={() => props.hide_header_menu()}
			></div>
			{/* todo export the above fixed div as a background component for pop ups and modals and 
			update every where which use this or something like this */} 
			<div className="bg-white fixed w-4/5 h-full p-0 m-0 z-50 overflow-y-auto">
				<div className="flex flex-row h-16 p-2 items-center border border-stone-300 m-1 rounded">
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
								onClick={()=>nav('/users/'+username)}
							>
								
								<AccountCircleRounded sx={{fontSize : "11px"}}/>
								<span className="break-words inline-block text-xs" style={{fontSize : "11px"}}>dashboard</span>
							</div>
						)}
					</div>
				</div>

				<Typography sx={{ mt: 4, ml: 1 }} variant="h6" component="div">
					section links
				</Typography>

				<List sx={{ ml: 1 }}>
					<ListItem>
						<ListItemIcon>
							<HomeRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/")}>
							home
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<PersonAddRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/register")}>
							register new user
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<LoginRoundedIcon />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/login")}>
							login
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<AdminPanelSettingsRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/admin-dashboard")}>
							admin dashboard
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<InfoRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/company-info")}>
							company data (about-us)
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<SupportAgent />
						</ListItemIcon>

						<p
							className="text-blue-600"
							onClick={() => custom_nav("/new-support-ticket")}
						>
							new support ticket
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ViewListRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/support-tickets")}>
							support tickets
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<StoreRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/products")}>
							products
						</p>
					</ListItem>

					<ListItem>
						<ListItemIcon>
							<GroupRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/users")}>
							users
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<AddBusinessRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/new-product")}>
							new product
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<NewspaperRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/blog-posts")}>
							blog posts
						</p>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<AddCircleRounded />
						</ListItemIcon>

						<p className="text-blue-600" onClick={() => custom_nav("/new-blog-post")}>
							new blog post
						</p>
					</ListItem>
				</List>
			</div>
		</>
	);
};

export default HeaderMenu;

import { Grid, Typography, List, Button, Slider, ButtonGroup } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link as MuiLink } from "@mui/material";
import {
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
			<div className="bg-white fixed w-4/5 h-full p-0 m-0 z-50">
				<div className="flex flex-row h-16 p-2 items-center">
					<div className="pr-3 w-2/5  flex flex-col h-full">
						<div className="w-full h-2/3 bg-blue-400 rounded"></div>
						<h3 className="text-sm h-1/3">corp_webapp</h3>
					</div>
					<div className="border-l border-gray-200 w-3/5 flex justify-center items-center  h-5/6">
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
							<ButtonGroup size="small" color="success" className="min-w-0">
								<Button className="text-sm">
									<p>@{username}</p>
								</Button>
								<Button onClick={log_out_button}>
									<LogoutRoundedIcon />
								</Button>
							</ButtonGroup>
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

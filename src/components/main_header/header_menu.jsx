import ListItem from "../list_item/comp";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
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
} from "@mui/icons-material";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
const HeaderMenu = (props) => {
	//props : "hide_header_menu : function" , "visibility : boolean"
	var [username, set_username] = useState(window.localStorage.getItem("username"));
	var sync_status = () => {
		set_username(window.localStorage.getItem("username"));
	};
	var nav = useNavigate();
	var nav_and_hide_header_menu = (path) => {
		props.hide_header_menu();
		nav(path);
	};
	if (!props.visibility) {
		return null;
	}
	//just show routes which need admin previleges to admins
	return (
		<>
			{/* <div
				className="fixed bg-gray-300 h-full w-full z-40"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				onClick={() => props.hide_header_menu()}
			></div> */}
			{/* todo export the above fixed div as a background component for pop ups and modals and 
			update every where which use this or something like this */}
			<div className="bg-white fixed w-full p-0 m-0 z-40 overflow-y-auto top-28 header_menu overflow-x-hidden">
				<Section
					title={ml({
						en: "routes",
						fa: "مسیر ها",
					})}
				>
					<ListItem
						items={[ml({ en: "home", fa: "صفحه اصلی" })]}
						onClick={() => nav_and_hide_header_menu("/")}
						beforeItems={<HomeRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "login", fa: "ورود ه حساب کاربری" })]}
						onClick={() => nav_and_hide_header_menu("/login")}
						beforeItems={<LoginRoundedIcon sx={{ color: "white" }} />}
					/>

					<ListItem
						items={[ml({ en: "register new user", fa: "ثبت نام کاربر جدید" })]}
						onClick={() => nav_and_hide_header_menu("/register")}
						beforeItems={<PersonAddRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "admin dashboard", fa: "داشبورد مدیر" })]}
						onClick={() => nav_and_hide_header_menu("/admin-dashboard")}
						beforeItems={<AdminPanelSettingsRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "about company", fa: "درباره شرکت" })]}
						onClick={() => nav_and_hide_header_menu("/company-info")}
						beforeItems={<InfoRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "new support ticket", fa: "ثبت تیکت پشتیبانی جدید" })]}
						onClick={() => nav_and_hide_header_menu("/new-support-ticket")}
						beforeItems={<SupportAgent sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "products", fa: "محصولات" })]}
						onClick={() => nav_and_hide_header_menu("/products")}
						beforeItems={<StoreRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "users", fa: "کاربران" })]}
						onClick={() => nav_and_hide_header_menu("/users")}
						beforeItems={<GroupRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "add new product", fa: "اضافه کردن محصول جدید" })]}
						onClick={() => nav_and_hide_header_menu("/new-product")}
						beforeItems={<AddBusinessRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "blog posts", fa: "بلاگ پست ها" })]}
						onClick={() => nav_and_hide_header_menu("/blog-posts")}
						beforeItems={<NewspaperRounded sx={{ color: "white" }} />}
					/>
					<ListItem
						items={[ml({ en: "new blog post", fa: "بلاگ پست جدید" })]}
						onClick={() => nav_and_hide_header_menu("/new-blog-post")}
						beforeItems={<AddCircleRounded sx={{ color: "white" }} />}
					/>
				</Section>
			</div>
		</>
	);
};

export default HeaderMenu;

import { Place } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
	var nav = useNavigate();
	const [paths, set_paths] = useState([]);
	const [is_nav_bar_visible, set_is_nav_bar_visible] = useState(true);
	var loc = useLocation();
	useEffect(() => {
		var tmp = [];
		tmp.push({
			name: ml({
				en: "main page",
				fa: "صفحه اصلی",
			}),
			link: "/",
		});
		var translated_names = [
			{
				original: "register",
				fa: "ثبت نام کاربر جدید",
			},
			{
				original: "api_test_page",
				fa: "صفحه تست api",
			},
			{
				original: "download-center",
				fa: "بخش فایل های قابل دانلود",
			},
			{
				original: "products",
				fa: "محصولات",
			},
			{
				original: "new-product-review",
				fa: "بررسی جدید برای محصول",
			},
			{
				original: "orders",
				fa: "سفارش ها",
			},
			{
				original: "users",
				fa: "کاربران",
			},
			{
				original: "shopping-card",
				fa: "سبد خرید",
			},
			{
				original: "admin-dashboard",
				fa: "پنل مدیریت مدیران",
			},

			{
				original: "company-info",
				fa: "اطلاعات شرکت",
			},
			{
				original: "login",
				fa: "ورود به حساب کاربری",
			},
			{
				original: "reviews",
				fa: "بررسی ها",
			},
			{
				original: "new-product",
				fa: "محصول جدید",
			},
			{
				original: "first-setup",
				fa: "راه اندازی اولیه",
			},
			{
				original: "writings",
				fa: "نوشته ها",
			},
			{
				original: "writing",
				fa: "نوشته",
			},
			{
				original: "about-us",
				fa: "درباره ما",
			},
			{
				original: "contact-us",
				fa: "تماس با ما",
			},
			{
				original: "new",
				fa: "جدید",
			},
			{
				original: "new-support-message",
				fa: "درخواست پشتیبانی جدید",
			},
			{
				original: "support_messages",
				fa: "درخواست های پشتیبانی",
			},
			{
				original: "manage_products",
				fa: "مدیریت کالا ها",
			},
			{
				original: "manage_users",
				fa: "مدیریت کاربران",
			},
			{
				original: "manage_options",
				fa: "مدیریت گزینه ها",
			},

			{
				original: "manage_orders",
				fa: "مدیریت سفارش ها",
			},
			{
				original: "manage_download_center",
				fa: "مدیریت بخش دانلود ها",
			},
			{
				original: "support_messages_section",
				fa: "بخش درخواست های پشتیبانی",
			},
			{
				original: "new-writing",
				fa: "نوشته جدید",
			},
		];
		window.location.pathname.split("/").forEach((sp, index) => {
			if (index == 0) {
				return;
			}
			var link = window.location.pathname.split("/");
			link.length = index + 1;
			link = link.join("/");
			tmp.push({
				name:
					translated_names.find((i) => i.original === sp) !== undefined
						? translated_names.find((i) => i.original === sp)["fa"]
						: sp,
				link,
			});
			set_paths(tmp);
		});
		//hide nav bar on Root directory
		set_is_nav_bar_visible(
			!(window.location.pathname == "" || window.location.pathname == "/")
		);
	}, [loc]);
	//todo add link style to options below
	return (
		<div
			className={
				"px-1 flex flex-row items-center mx-1 mt-2 py-1" +
				(is_nav_bar_visible ? " " : " hidden")
			}
		>
			<Place fontSize="small" color="primary" className="mr-1" />
			{paths.map((path, index) => {
				return (
					<React.Fragment key={index}>
						<p
							className="mx-1 cursor-pointer text-sm text-stone-600"
							onClick={() => nav(path.link)}
						>
							{path.name}
						</p>
						<p
							className="text-sm text-stone-400"
							style={{ display: index == paths.length - 1 ? "none" : "block" }}
						>
							/
						</p>
					</React.Fragment>
				);
			})}
		</div>
	);
}

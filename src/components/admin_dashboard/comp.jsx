import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
import { Fragment, useEffect, useState } from "react";
import {
	AddBusinessOutlined,
	ArticleRounded,
	BrowseGallery,
	Collections,
	Download,
	HomeRounded,
	InfoRounded,
	ListAltRounded,
	Person,
	ShoppingBag,
	SupportAgentRounded,
	Tune,
} from "@mui/icons-material";
import { OrdersSection } from "./orders_section";
import { Alert } from "../alert/comp";
import { ManageDownloadCenter } from "./ManageDownloadCenter";
import { SupportMessagesSection } from "./SupportMessagesSection";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import NewProduct from "../new-product/comp.jsx";
import { NewWriting } from "../NewWriting";
import { get_collection } from "../../../api/client";
import { AdminDashboardRoot } from "./AdminDashboardRoot";
import { ManageContentSlider } from "./ManageContentSlider";
function SideBarOption({ icon, text, url }) {
	var this_option_is_active = useMatch(url);
	var nav = useNavigate();
	return (
		<div
			className={
				"p-2 items-center flex space-x-3 text-gray-200 cursor-pointer hover:bg-blue-400" +
				(this_option_is_active ? " bg-blue-600" : "")
			}
			onClick={() => nav(url)}
		>
			<div>{icon}</div>
			<div className="text-white">{text}</div>
		</div>
	);
}
function SideBar() {
	var tabs = [
		{ id: "", title: "صفحه اصلی داشبورد", icon: <HomeRounded /> },
		{
			id: "new-product",
			title: "اضافه کردن کالای جدید",
			icon: <AddBusinessOutlined />,
		},
		{
			id: "new-writing",
			title: "اضافه کردن نوشته جدید",
			icon: <ArticleRounded />,
		},
		{
			id: "manage_products",
			title: ml({ en: "manage products", fa: "مدیریت محصولات" }),
			icon: <ShoppingBag />,
		},
		{
			id: "manage_content_slider",
			title: "مدیریت اسلایدر صفحه اصلی",
			icon: <Collections />,
		},
		{
			id: "manage_users",
			title: ml({ en: "manage users", fa: "مدیریت کاربران" }),
			icon: <Person />,
		},

		{
			id: "manage_options",
			title: ml({ en: "manage options", fa: "مدیریت گزینه ها" }),
			icon: <Tune />,
		},
		{
			id: "manage_orders",
			title: ml({ en: "manage orders", fa: "مدیریت سفارش ها" }),
			icon: <ListAltRounded />,
		},
		{
			id: "manage_download_center",
			title: "مدیریت بخش فایل های قابل دانلود",
			icon: <Download />,
		},
		{
			id: "support_messages_section",
			title: "رسیدگی به درخواست های پشتیبانی",
			icon: <SupportAgentRounded />,
		},
	];
	return tabs.map((tab) => (
		<Fragment key={tab.id}>
			<SideBarOption
				icon={tab.icon}
				url={`/admin-dashboard/${tab.id}`}
				text={tab.title}
			></SideBarOption>
		</Fragment>
	));
}
export default function AdminDashboard() {
	return (
		<>
			<div className="md:hidden">
				<Alert icon={<InfoRounded />} className="mx-1 mt-2">
					{ml({
						en: "to view this page you should use a bigger monitor",
						fa: "برای استفاده از امکانات این صفحه باید از کامپیوتر (مانیتوری بزرگتر) استفاده کنید",
					})}
				</Alert>
			</div>
			<div
				id="admin-dashboard"
				className="hidden h-full md:flex mx-1 border border-stone-400 rounded overflow-y-auto"
				style={{ height: "77vh" }}
			>
				<div className="w-3/12 bg-blue-500">
					<SideBar />
				</div>
				<div className="p-1 flex w-9/12 overflow-y-auto px-3">
					<Routes>
						<Route path="/" element={<AdminDashboardRoot />} />
						<Route path="new-product" element={<NewProduct />} />
						<Route path="new-writing" element={<NewWriting />} />
						<Route path="manage_products" element={<ProductsSection />} />
						<Route path="manage_users" element={<UsersSection />} />
						<Route path="manage_options" element={<OptionsSection />} />
						<Route path="manage_orders" element={<OrdersSection />} />
						<Route path="manage_download_center" element={<ManageDownloadCenter />} />
						<Route path="manage_content_slider" element={<ManageContentSlider />} />
						<Route
							path="support_messages_section"
							element={<SupportMessagesSection />}
						/>
					</Routes>
				</div>
			</div>
		</>
	);
}

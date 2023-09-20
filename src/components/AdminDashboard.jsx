import { Fragment } from "react";
import {
	AddBusinessOutlined,
	Collections,
	Download,
	HomeRounded,
	InfoRounded,
	ShoppingBag,
	Tune,
} from "@mui/icons-material";
import { Alert } from "./Alert";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { AdminDashboardRoot } from "./AdminDashboardRoot";
import { ManageDownloadCenter } from "./ManageDownloadCenter";
import { AdminDashboardOptionsSection } from "./AdminDashboardOptionsSection";
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
			id: "manage_products",
			title: "مدیریت محصولات",
			icon: <ShoppingBag />,
		},
		{
			id: "manage_content_slider",
			title: "مدیریت اسلایدر صفحه اصلی",
			icon: <Collections />,
		},

		{
			id: "manage_options",
			title: "تکمیل اطلاعات",
			icon: <Tune />,
		},
		{
			id: "manage_download_center",
			title: "مدیریت بخش فایل های قابل دانلود",
			icon: <Download />,
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
export function AdminDashboard() {
	return (
		<>
			<div className="md:hidden">
				<Alert
					icon={<InfoRounded />}
					className="mx-1 mt-2"
				>
					"برای استفاده از امکانات این صفحه باید از کامپیوتر (مانیتوری بزرگتر) استفاده
					کنید"
				</Alert>
			</div>
			<div
				id="admin-dashboard"
				className="hidden h-full md:flex mx-1 border border-stone-400 rounded overflow-y-auto my-2"
				style={{ height: "77vh" }}
			>
				<div className="w-3/12 bg-blue-500">
					<SideBar />
				</div>
				<div className="p-1 flex w-9/12 overflow-y-auto px-3 py-2">
					<Routes>
						<Route
							path="/"
							element={<AdminDashboardRoot />}
						/>
						<Route
							path="manage_download_center"
							element={<ManageDownloadCenter />}
						/>
						<Route
							path="manage_options"
							element={<AdminDashboardOptionsSection />}
						/>
						<Route
							path="manage_content_slider"
							element={<ManageContentSlider />}
						/>
						{/* <Route
							path="new-product"
							element={<NewProduct />}
						/>
						<Route
							path="new-writing"
							element={<NewWriting />}
						/>
						<Route
							path="manage_products"
							element={<ProductsSection />}
						/>
						
						
					
						
						
						 */}
					</Routes>
				</div>
			</div>
		</>
	);
}

import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
import { useState } from "react";
import {
	Download,
	InfoRounded,
	ListAltRounded,
	Person,
	ReviewsRounded,
	ShoppingBag,
	SupportAgent,
	SupportAgentRounded,
	Tune,
} from "@mui/icons-material";
import { OrdersSection } from "./orders_section";
import { ProductReviews } from "./product_reviews";
import { Alert } from "../alert/comp";
import { ManageDownloadCenter } from "./ManageDownloadCenter";
import { SupportMessagesSection } from "./SupportMessagesSection";
export default function AdminDashboard() {
	var [tab, set_tab] = useState("manage_products");
	var tabs = [
		{
			id: "manage_products",
			title: ml({ en: "manage products", fa: "مدیریت محصولات" }),
			icon: <ShoppingBag />,
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
			id: "manage_product_reviews",
			title: ml({
				en: "manage product reviews",
				fa: "مدیریت بررسی های کاربران برای کالا ها",
			}),
			icon: <ReviewsRounded />,
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
				className="hidden h-full md:flex mx-1 border border-stone-400 rounded"
			>
				<div className="w-3/12 bg-blue-500">
					{tabs.map((this_tab, index) => {
						return (
							<div
								key={index}
								className={
									"p-2 items-center flex space-x-3 text-gray-200 cursor-pointer hover:bg-blue-400" +
									(this_tab.id === tab ? " bg-blue-600" : "")
								}
								onClick={() => set_tab(this_tab.id)}
							>
								<div>{this_tab.icon}</div>
								<div className="text-white">{this_tab.title}</div>
							</div>
						);
					})}
				</div>
				<div className="p-1 flex w-9/12 overflow-y-auto px-3">
					{tab === "manage_products" && (
						<>
							<ProductsSection />
						</>
					)}
					{tab === "manage_users" && (
						<>
							<UsersSection />
						</>
					)}
					{tab === "manage_options" && (
						<>
							<OptionsSection />
						</>
					)}
					{tab === "manage_orders" && (
						<>
							<OrdersSection />
						</>
					)}

					{tab === "manage_product_reviews" && (
						<>
							<ProductReviews />
						</>
					)}
					{tab === "manage_download_center" && <ManageDownloadCenter />}
					{tab === "support_messages_section" && <SupportMessagesSection />}
				</div>
			</div>
		</>
	);
}

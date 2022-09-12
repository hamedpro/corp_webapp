import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
import { useState } from "react";
import { Info } from "@mui/icons-material";
import { OrdersSection } from "./orders_section";
import { SupportTicketsSection } from "./support_tickets_section";
import { ProductReviews } from "./product_reviews";
export default function AdminDashboard() {
	var [tab, set_tab] = useState("manage_products");
	var tabs = [
		{
			id: "manage_products",
			title: ml({ en: "manage products", fa: "مدیریت محصولات" }),
			icon: <Info />,
		},
		{
			id: "manage_users",
			title: ml({ en: "manage users", fa: "مدیریت کاربران" }),
			icon: <Info />,
		},

		{
			id: "manage_options",
			title: ml({ en: "manage options", fa: "مدیریت گزینه ها" }),
			icon: <Info />,
		},
		{
			id: "manage_orders",
			title: ml({ en: "manage orders", fa: "مدیریت سفارش ها" }),
			icon: <Info />,
		},
		{
			id: "manage_support_tickets",
			title: ml({ en: "manage support tickets", fa: "مدیریت تیکت های پشتیبانی" }),
			icon: <Info />,
		},

		{
			id: "manage_product_reviews",
			title: ml({ en: "manage product reviews", fa: "مدیریت بررسی های کاربران برای کالا ها" }),
			icon: <Info />,
		},
	];
	return (
		<>
			<div className="md:hidden">
				{ml({
					en: "to view this page you should use a bigger monitor",
					fa: "برای استفاده از امکانات این صفحه باید از کامپیوتر (مانیتوری بزرگتر) استفاده کنید",
				})}
			</div>
			<div id="admin-dashboard" className="hidden h-full w-full md:flex">
				<div className="w-3/12 bg-blue-500">
					{tabs.map((this_tab, index) => {
						return (
							<div
								key={index}
								className={
									"flex space-x-3 cursor-pointer hover:bg-blue-400" +
									(this_tab.id === tab ? " bg-blue-600" : "")
								}
								onClick={() => set_tab(this_tab.id)}
							>
								{this_tab.icon} {this_tab.title}
							</div>
						);
					})}
				</div>
				<div className="flex w-9/12 overflow-y-auto px-3">
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
					{tab === "manage_support_tickets" && (
						<>
							<SupportTicketsSection />
						</>
					)}

					{tab === "manage_product_reviews" && (
						<>
							<ProductReviews />
						</>
					)}
				</div>
			</div>
		</>
	);
}

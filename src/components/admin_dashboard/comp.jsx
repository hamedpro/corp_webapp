import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
import { useState } from "react";
import { Comment, Download, Info, InfoRounded, ListAltRounded, Person, ReviewsRounded, ShoppingBag, SupportAgentRounded, Tune, VerifiedUserRounded } from "@mui/icons-material";
import { OrdersSection } from "./orders_section";
import { SupportTicketsSection } from "./support_tickets_section";
import { ProductReviews } from "./product_reviews";
import { BlogComments } from "./blog_comments";
import { Alert } from "../alert/comp";
import { ManageDownloadCenter } from "./ManageDownloadCenter";
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
			id: "manage_support_tickets",
			title: ml({ en: "manage support tickets", fa: "مدیریت تیکت های پشتیبانی" }),
			icon: <SupportAgentRounded />,
		},
		{
			id: "manage_product_reviews",
			title: ml({ en: "manage product reviews", fa: "مدیریت بررسی های کاربران برای کالا ها" }),
			icon: <ReviewsRounded />,
		},
		{
			id: "manage_blog_comments",
			title: "manage blog comments",
			icon: <Comment />,
		},
		{
			id: "manage_download_center",
			title: "manage download center",
			icon : <Download />
		}

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
			<div id="admin-dashboard" className="hidden h-full md:flex mx-1 border border-stone-400 rounded">
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
								<div>
									{this_tab.icon}
								</div>
								<div className="text-white">
									{this_tab.title}
								</div>
								 
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
					{tab === "manage_blog_comments" && (
						<BlogComments />
					)}
					{tab === "manage_download_center" && (
						<ManageDownloadCenter />
					)}
				</div>
			</div>
		</>
	);
}

import OptionsSection from "./options_section";
import UsersSection from "./users_section";
import ProductsSection from "./products_section";
import "./styles.css";
import { useState } from "react";
import { Info } from "@mui/icons-material";
export default function AdminDashboard() {
	var [tab, set_tab] = useState("manage_products");
	var tabs = [
		{
			id: "manage_products",
			title: "manage products",
			icon: <Info />,
		},
		{
			id: "manage_users",
			title: "manage users",
			icon: <Info />,
		},

		{
			id: "manage_options",
			title: "manage options",
			icon: <Info />,
		},
		{
			id: "manage_orders",
			title: "manage orders",
			icon: <Info />,
		},
		{
			id: "manage_support_tickets",
			title: "manage support tickets",
			icon: <Info />,
		},
		{
			id: "manage_data",
			title: "manage data",
			icon: <Info />,
		},
		{
			id: "manage_product_reviews",
			title: "manage product reviews",
			icon: <Info />,
		},
	];
	return (
		<>
			<div className="md:hidden">to view this page you should use a bigger monitor</div>
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
				<div className="flex w-9/12 bg-yellow-600">
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
					{tab === "manage_orders" && <></>}
					{tab === "manage_support_tickets" && <></>}
					{tab === "manage_data" && <></>}
					{tab === "manage_product_reviews" && <></>}
				</div>
			</div>
		</>
	);
}

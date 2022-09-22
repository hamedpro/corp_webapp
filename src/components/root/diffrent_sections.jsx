import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InfoIcon from "@mui/icons-material/Info";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { multi_lang_helper as ml } from "../../common";
import React from "react";
function CustomItem({ icon, title, onClick = () => {} }) {
	return (
		<div className="min-h-0 w-1/3 flex flex-col items-center shrink-0 my-3 cursor-pointer" onClick={onClick}>
			<div className="rounded-lg bg-blue-300 h-10 w-10 flex justify-center items-center hover:text-white hover:bg-blue-500 duration-300">
				{icon}
			</div>
			<p className="text-sm mt-1 text-center">{title}</p>
		</div>
	);
}
export function DiffrentSections() {
	var nav = useNavigate();
	return (
		<>
			
			<div className="flex flex-wrap">
				{[
					{
						title: ml({
							en: "all product categories",
							fa: "مشاهده همه دسته بندی های کالا ها",
						}),
						icon: <CategoryRoundedIcon />,
						onClick: () => {
							nav("/products/categories");
						},
					},
					{
						title: ml({ en: "new support ticket", fa: "ثبت درخواست پشتیبانی جدید" }),
						icon: <AddCircleIcon />,
						onClick: () => {
							nav("/new-support-ticket");
						},
					},
					{
						title: ml({
							en: "support tikcket following",
							fa: "پیگیری درخواست پشتیبانی",
						}),
						icon: <SupportAgentIcon />,
						onClick: () => {
							nav(
								`/users/${window.localStorage.getItem("username")}/support-tickets`
							);
						},
					},
					{
						title: ml({ en: "about company (about us)", fa: "معرفی شرکت (درباره ما)" }),
						icon: <InfoIcon/>,
						onClick: () => {
							nav("/company-info");
						},
					},
					{
						title: ml({ en: "blog posts", fa: "پست های خبری" }),
						icon: <NewspaperIcon />,
						onClick: () => {
							nav("/blog-posts");
						},
					},
					{
						title: ml({ en: "all products", fa: "مشاهده همه محصولات" }),
						icon: <ShoppingCartIcon />,
						onClick: () => {
							nav("/products");
						},
					},
				].map((item, index) => {
					return (
						<React.Fragment key={index}>
							<CustomItem
								icon={item.icon}
								title={item.title}
								onClick={item.onClick}
							/>
						</React.Fragment>
					);
				})}
			</div>
		</>
	);
}

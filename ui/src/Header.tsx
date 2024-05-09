import React from "react";
import { TabMenu } from "primereact/tabmenu";

export const Header = () => {
	var options = [
		{ label: "صفحه اصلی", icon: "bi bi-house-heart", url: "/" },
		{ label: "محصولات", icon: "bi bi-shop-window", url: "/products" },
		{ label: "کنترل اینترنتی", icon: "bi-sliders2" },
		{ label: "درباره ما", icon: "pi pi-id-card", url: "/about-us" },
		{ label: "تماس با ما", icon: "pi pi-phone", url: "/contact-us" },
		{ label: "دانلود ها", icon: "bi bi-cloud-download", url: "/downloads" },
		{ label: "تنظیمات", icon: "bi bi-gear-wide-connected", url: "/settings" },
	];

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-evenly",
				borderBottomWidth: "0px",
				borderBottomStyle: "solid",
			}}
			className="border-neutral-300 bg-neutral-100"
		>
			<h1 style={{ textAlign: "center", display: "inline" }}>پیشرو کنترل وطن</h1>
			<TabMenu
				model={options}
				style={{ fontSize: "14px" }}
				pt={{ icon: { style: { margin: "0px 4px" } } }}
			/>
		</div>
	);
};

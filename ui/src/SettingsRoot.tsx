import React from "react";
import settings_dynamic_gradient from "./assets/setting-dynamic-gradient.png";
export const SettingsRoot = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<img
				src={settings_dynamic_gradient}
				style={{ width: "40%" }}
			/>
			<h1>صفحه اصلی تنظیمات</h1>
			<p>برای ویرایش تنظیمات بخش های مختلف از منو سمت راست انتخاب کنید</p>
		</div>
	);
};

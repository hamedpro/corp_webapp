import React, { useContext, useEffect, useState } from "react";

import { Section } from "./Section";
import { context } from "freeflow-react";

export const AdminDashboardRoot = () => {
	var { cache } = useContext(context);
	var company_info = cache.find((ci) => ci.thing.type === "company_info")?.thing.value || {};
	var missing_company_info_fields = [];

	var fields = {
		// these are all possible fields with their translation
		name: "نام شرکت",
		email_address: "آدرس ایمیل شرکت",
		landline_phone_number: "شماره تلفن ثابت شرکت",
		mobile_phone_number: "شماره موبایل شرکت",
		address: "آدرس",
		description: "توضیحات",
		instagram: "آیدی حساب اینستاگرام شرکت",
		twitter: "آیدی حساب توییتر شرکت",
		telegram: "آدرس حساب تلگرام شرکت",
		favicon_file_id: "ریز آیکون",
		company_icon_file_id: "آیکون اصلی شرکت",
		company_introduction: "متن معرفی شرکت",
	};

	Object.keys(fields).forEach((field) => {
		if (company_info[field] === undefined) {
			missing_company_info_fields.push(fields[field]);
		}
	});

	return (
		<div className="w-full py-2">
			{missing_company_info_fields.length !== 0 && (
				<Section
					title="نقص اطلاعات"
					innerClassName="p-2"
					className="w-full"
				>
					<h1>
						این موارد هنوز تنظیم نشده اند. برای تنظیم اطلاعات به بخش تکمیل اطلاعات
						مراجعه کنید.
					</h1>
					{missing_company_info_fields.map((field) => (
						<p key={field}>-{field}</p>
					))}
				</Section>
			)}
		</div>
	);
};

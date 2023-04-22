import React, { useEffect, useState } from "react";
import { get_company_info } from "../../api/client";
import { Section } from "./Section";

export const AdminDashboardRoot = () => {
	var [missing_company_info_fields, set_missing_company_info_fields] = useState();
	async function get_data() {
		var company_info = await get_company_info();
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
		let missing_company_info_fields = [];
		Object.keys(fields).forEach((field) => {
			if (company_info[field] === undefined) {
				missing_company_info_fields.push(fields[field]);
			}
		});
		set_missing_company_info_fields(missing_company_info_fields);
	}
	useEffect(() => {
		get_data();
	}, []);
	if (missing_company_info_fields === undefined)
		return <h1>loading missing_company_info_fields ...</h1>;
	return (
		missing_company_info_fields.length !== 0 && (
			<Section title="نقص اطلاعات" innerClassName="p-1" className="w-full">
				<h1>این موارد زیر هنوز تنظیم نشده اند</h1>
				{missing_company_info_fields.map((field) => (
					<p key={field}>-{field}</p>
				))}
			</Section>
		)
	);
};

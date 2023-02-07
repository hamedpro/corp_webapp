import React, { useEffect, useState } from "react";
import { get_collection } from "../../../api/client";
import Section from "../section/comp";

export const AdminDashboardRoot = () => {
	var [missing_company_info_fields, set_missing_company_info_fields] = useState();
	async function get_data() {
		var tmp = await get_collection({
			collection_name: "paired_data",
			filters: { key: "company_info" },
		});
		var company_info = tmp.data.length === 1 ? tmp.data[0]["value"] : {};
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
			<Section title="نقص اطلاعات" innerClassName="p-1">
				<h1>این موارد زیر هنوز تنظیم نشده اند</h1>
				{missing_company_info_fields.map((field) => (
					<p key={field}>-{field}</p>
				))}
			</Section>
		)
	);
};

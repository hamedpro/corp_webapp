import { useEffect, useState } from "react";
import { customAjax } from "../../../custom_ajax";
import Section from "../../section/comp";
import { CustomTable } from "../../custom_table/comp";
export function CompanyInfoSection() {
	var [company_info, set_company_info] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_company_info",
			},
		}).then(
			(data) => {
				var parsed_company_info = JSON.parse(data.result);
				//console.log(parsed_company_info);
				set_company_info(parsed_company_info);
			},
			(e) => {
				console.log(e);
			}
		);
	}
	useEffect(fetch_data, []);
	function update_company_info(field_to_change) {
		var new_value = prompt(
			ml({
				en: `enter new value for :`,
				fa: `مقدار جدید متغیر مقابل را وارد کنید :`,
			}) + field_to_change
		);
		var new_company_info = { ...company_info };
		new_company_info[field_to_change] = new_value;
		customAjax({
			params: {
				task_name: "set_company_info",
				company_info: JSON.stringify(new_company_info),
			},
		})
			.then(
				(data) => {
					console.log(data);
					alert(ml({ en: "done", fa: "" }));
				},
				(e) => {
					console.log(e);
				}
			)
			.finally(fetch_data);
	}
	var fields = [
		{ value: "name", en: "name", fa: "نام" },
		{ value: "email_address", en: "email_address", fa: "آدرس ایمیل" },
		{ value: "landline_phone_number", en: "landline_phone_number", fa: "شماره تلفن ثابت" },
		{ value: "mobile_phone_number", en: "mobile_phone_number", fa: "شماره موبایل" },
		{ value: "address", en: "address", fa: "آدرس" },
		{ value: "description", en: "description", fa: "توضیحات" },
		{ value: "history", en: "history", fa: "داستان" },
		{ value: "instagram", en: "instagram", fa: "اینستاگرام" },
		{ value: "telegram", en: "telegram", fa: "تلگرام" },
		{ value: "twitter", en: "twitter", fa: "توییتر" },
	];
	return (
		<Section title={ml({ en: "company information", fa: "" })}>
			<div className="px-2">
				{company_info && (
					<CustomTable
						headerItems={fields.map((field) => ml({ en: field.en, fa: field.fa }))}
						rows={[
							fields.map((field) => {
								return {
									value: company_info[field["value"]],
									onClick: () => {
										update_company_info(field["value"]);
									},
								};
							}),
						]}
					/>
				)}
			</div>
		</Section>
	);
}

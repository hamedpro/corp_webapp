import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CustomRow } from "./CustomRow";
import { get_company_info, modify_company_info } from "../../api/client";
export function CompanyInfoSection() {
	var [company_info, set_company_info] = useState(null);
	async function fetch_data() {
		set_company_info(await get_company_info());
	}
	useEffect(() => {
		fetch_data();
	}, []);
	async function update_company_info(field_to_change) {
		var new_value = prompt(
			ml({
				en: `enter new value for :`,
				fa: `مقدار جدید متغیر مقابل را وارد کنید :`,
			}) + field_to_change
		);
		await modify_company_info(field_to_change, new_value);
		alert("با موفقیت انجام شد");
		await fetch_data();
	}
	var fields = [
		{ value: "name", en: "name", fa: "نام" },
		{ value: "email_address", en: "email_address", fa: "آدرس ایمیل" },
		{ value: "landline_phone_number", en: "landline_phone_number", fa: "شماره تلفن ثابت" },
		{ value: "mobile_phone_number", en: "mobile_phone_number", fa: "شماره موبایل" },
		{ value: "address", en: "address", fa: "آدرس" },
		{ value: "description", en: "description", fa: "توضیحات" },
		{ value: "instagram", en: "instagram", fa: "اینستاگرام" },
		{ value: "telegram", en: "telegram", fa: "تلگرام" },
		{ value: "twitter", en: "twitter", fa: "توییتر" },
		{ value: "company_introduction", en: "company introduction", fa: "معرفی شرکت" },
	];
	return (
		<Section title={ml({ en: "company information", fa: "اطلاعات شرکت" })}>
			<div className="px-2">
				{company_info && (
					<CustomRow
						fields={fields.map((field) => {
							return {
								value: company_info[field.value],
								key: ml({
									en: field.en,
									fa: field.fa,
								}),
								change_function: () => {
									update_company_info(field.value);
								},
							};
						})}
					/>
				)}
			</div>
		</Section>
	);
}

import { useContext, useEffect } from "react";
import { Section } from "./Section";
import { CustomRow } from "./CustomRow";
import { context } from "freeflow-react";
import { find_active_profile_seed } from "freeflow-core/dist/utils";

export function CompanyInfoSection() {
	var { cache, request_new_thing, profiles_seed, request_new_transaction } = useContext(context);

	var current_company_info = cache.find((ci) => ci.thing.type === "company_info");
	async function update_company_info(field) {
		var current_profile_seed = find_active_profile_seed(profiles_seed);
		if (current_profile_seed === undefined) {
			alert("ابتدا وارد حساب کاربری خود شوید.");
			return;
		}
		if (current_company_info === undefined) {
			await request_new_thing({
				thing: {
					type: "company_info",
					value: {
						[field]: window.prompt("مقدار جدید را برای این متغیر وارد کنید‌: " + field),
					},
				},
				thing_privileges: { read: "*", write: [-1] },
			});
		} else {
			await request_new_transaction({
				new_thing_creator: (prev) => ({
					...prev,
					value: {
						...prev.value,
						[field]: window.prompt("مقدار جدید را برای این متغیر وارد کنید‌: " + field),
					},
				}),
				thing_id: current_company_info.thing_id,
			});
		}
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
		<Section title={"اطلاعات شرکت"}>
			<div className="px-2">
				<CustomRow
					fields={fields.map((field) => {
						return {
							value: current_company_info?.thing?.value[field.value] || "",
							key: field.fa,
							change_function: () => {
								update_company_info(field.value);
							},
						};
					})}
				/>
			</div>
		</Section>
	);
}

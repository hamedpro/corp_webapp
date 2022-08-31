import { customAjax } from "../../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../../common.js";
export default function UpdateCompanyData() {
	function set_data() {
		customAjax({
			params: {
				task_name: "set_company_data",
				company_data: JSON.stringify({
					name: "pink",
					email: "pink@gmail.com",
				}),
			},
		}).then(
			(data) => {
				if (data.result) {
					alert(
						ml({
							en: "done",
							fa: "انجام شد",
						})
					);
					//todo translate auto generated content of view
				} else {
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	return (
		<p>
			{ml({
				en: "update company data page",
				fa: "بخش به روز رسانی اطلاعات شرکت",
			})}
		</p>
	);
}

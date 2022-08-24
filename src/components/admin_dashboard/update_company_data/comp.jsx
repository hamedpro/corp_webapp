import { useContext } from "react";
import { customAjax } from "../../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../../common.js";
import { AppContext } from "../../../AppContext";
export default function UpdateCompanyData() {
	var mlh = new multi_lang_helper(useContext(AppContext));
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
						mlh.render({
							en: "done",
							fa: "",
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
			{mlh.render({
				en: "update company data page",
				fa: "",
			})}
		</p>
	);
}

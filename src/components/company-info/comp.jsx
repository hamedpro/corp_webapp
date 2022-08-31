import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
export default function CompanyInfo() {
	function get_data() {
		customAjax({
			params: {
				task_name: "get_company_data",
			},
		}).then(
			(data) => {
				//use data here
				console.log(data);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	return (
		<>
			<h1>
				{ml({
					en: "company info page",
					fa: "صفحه اطلاعات شرکت",
				})}
			</h1>
			<hr />
		</>
	);
}

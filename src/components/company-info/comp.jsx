import { customAjax } from "../../../src/custom_ajax.js";
import Button from "@mui/material/Button";
import { multi_lang_helper } from "../../common.js";
import { useContext } from "react";
import { AppContext } from "../../AppContext.js";
export default function CompanyInfo() {
	var ml = new multi_lang_helper(useContext(AppContext));
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
				{ml.render({
					en: "company info page",
					fa: "",
				})}
			</h1>
			<hr />
		</>
	);
}

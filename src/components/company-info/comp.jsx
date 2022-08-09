import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
import Button from "@mui/material/Button";
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
			<h1>company info page</h1>
			<hr />
			<Button variant="contained">hello world!</Button>
			<button>set company data</button>
		</>
	);
}

import { customAjax } from "../../../../src/custom_ajax.js";

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
					alert("done");
				} else {
					alert("result field was not true");
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	return <p>here is update company data page </p>;
}

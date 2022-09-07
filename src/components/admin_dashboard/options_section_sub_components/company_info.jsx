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
				set_company_info(JSON.parse(data.result));
			},
			(e) => {
				console.log(e);
			}
		);
	}
	useEffect(fetch_data, []);
	function update_company_info(field_to_change) {
		var new_value = prompt(`enter new value for : ${field_to_change}`);
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
					alert("done");
				},
				(e) => {
					console.log(e);
				}
			)
			.finally(fetch_data);
	}
	var fields = {
		name: "pink",
		email_address: "pink@gmail.com",
		landline_phone_number: "02166040137",
		mobile_phone_number: "09389980462",
		address: "tehran - iran - shahidan",
		description: "our company wants to develop the freedom in the world",
		history: "we started in a garage",
		instagram: "pink.news.en",
		telegram: "pinknewstelegram",
		twitter: "pinknewstwitter",
	};
	fields = Object.keys(fields);
	return (
		<Section title="company information">
			<div className="px-2">
				{company_info && (
					<CustomTable
						headerItems={fields}
						rows={[
							fields.map((field) => {
								return {
									value: company_info[field],
									onClick: () => {
										update_company_info(field);
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

import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
import { Loading } from "../loading/comp.jsx";
import Section from "../section/comp";
export default function CompanyInfo() {
	var [company_info, set_company_info] = useState(null);
	function get_data() {
		customAjax({
			params: {
				task_name: "get_company_info",
			},
		}).then(
			(data) => {
				set_company_info(JSON.parse(data.result));
			},
			(error) => {
				console.log(error);
			}
		);
	}
	var [rectangle_icon_src, set_rectangle_icon_src] = useState(null);
	useEffect(() => {
		get_data();
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then((data) => {
			set_rectangle_icon_src(
				gen_link_to_file(
					"./company_info/" +
						data.result.filter((item) => item.split(".")[0] === "rectangle")[0]
				)
			);
		});
	}, []);
	return (
		<>
			<Section
				title={ml({
					en: "who we are",
					fa: "معرفی شرکت",
				})}
			>
				<div className="flex flex-col">
					<div className="flex h-fit m-2 rounded-lg bg-blue-400">
						<Loading is_loading={rectangle_icon_src === null}>
							<img
								src={rectangle_icon_src}
								className="w-full"
								style={{ objectFit: "contain" }}
							/>
						</Loading>
					</div>
					{company_info === null ? (
						<Loading />
					) : (
						<div className="m-2 p-1 flex-col">
							{[
								{
									label: "company name",
									key: "name",
								},
							].map((item, index) => {
								return (
									<React.Fragment key={index}>
										<span className="text-stone-400 text-sm">
											{item.label} :{" "}
										</span>
										<span>{company_info[item.key]}</span>
									</React.Fragment>
								);
							})}
						</div>
					)}
				</div>
			</Section>
		</>
	);
}

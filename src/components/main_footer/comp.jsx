import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import { useEffect } from "react";
export default function MainFooter() {
	var nav = useNavigate();
	var [company_info, set_company_info] = useState(null);
	var [square_icon_src, set_square_icon_src] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_company_info",
			},
		}).then(
			(data) => {
				set_company_info(JSON.parse(data.result));
				//todo dont let the app to work until there is company data and env vard and ... are there
			},
			(e) => {
				if (e.errors[0].code === 1) {
					console.log("company info is not set yet");
				} else {
					console.log(e);
				}
			}
		);
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then(
			(data) => {
				var company_square_icon_file_name = data.result.find(
					(i) => i.split(".")[0] === "square"
				);
				if (company_square_icon_file_name !== undefined) {
					set_square_icon_src(
						gen_link_to_file("./company_info/" + company_square_icon_file_name)
					);
				} else {
					console.log("company square icon is not uploaded yet");
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}, []);
	if (company_info === null) return <h1>loading...</h1>;
	return (
		<div className="bg-sky-800 text-white">
			<div className="bg-sky-900 flex flex-col py-1 space-y-1" style={{ color: "lightgray" }}>
				<div className="flex flex-row mx-2 text-sm flex-wrap space-x-1">
					<p>
						**{" "}
						{ml({
							en: "developed by",
							fa: "توسعه داده شده توسط",
						})}{" "}
						<a href="https://github.com/hamedpro">@hamedpro</a> **
					</p>
				</div>
			</div>
		</div>
	);
}

import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkLikeP } from "../";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Subscripting from "./subscripting";
import { AppContext } from "../../AppContext";
import { useContext, useState } from "react";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { ChangeLangModal } from "./ChangeLangModal";
import { customAjax } from "../../custom_ajax";
import { useEffect } from "react";
import Section from "../section/comp";
import { Loading } from "../loading/comp";
import { FollowUsRow } from "../follow_us_row";
export default function MainFooter() {
	var nav = useNavigate();
	var AppContextState = useContext(AppContext).AppContextState;
	var setAppContextState = useContext(AppContext).setAppContextState;
	var [is_modal_open, set_is_modal_open] = useState(false);
	var [company_info, set_company_info] = useState(null);
	var [square_icon_src, set_square_icon_src] = useState(null);
	var [lang, set_lang] = useState(localStorage.getItem("language"));
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
					console.log('company info is not set yet')
				} else {
					console.log(e)
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
	return (
		<>
			<ChangeLangModal hideFn={() => set_is_modal_open(false)} is_visible={is_modal_open} />
			<div className="bg-sky-800 text-white">
				<div className="flex p-2 h-16 mt-2 mb-7 mx-2">
					<div className="w-2/3 h-full flex mb-2 space-x-2">
						<div className="h-16 w-fit bg-blue-500 rounded-lg">
							{square_icon_src ? (
								<img
									src={square_icon_src}
									className="h-full w-fit rounded-lg"
									style={{ objectFit: "contain" }}
								/>
							) : (
								<div className="h-16 w-16 bg-blue-400 mb-3 rounded"></div>
							)}
						</div>
						<div className="text-xl">
							{company_info && company_info.name}
							<br />
							<LinkLikeP link="/company-info" className="text-stone-400 text-sm">
								{ml({
									en: "(about us)",
									fa: "(درباره ما)",
								})}
							</LinkLikeP>
						</div>
					</div>
					<div className="w-1/3 flex justify-end">
						
					</div>
				</div>
				<div className="flex flex-wrap md:flex-nowrap mx-2 p-2 md:space-x-2">
					<Subscripting className={"w-full shrink-0 md:shrink md:w-1/2"} />
					<div className="w-full md:w-1/2 shrink-0 md:shrink  md:mt-0 rounded text-black">
						{company_info === null ? (
							<div className="w-full h-full border  border-blue-400 rounded-lg">
								<Loading />
							</div>
						) : (
							<Section
								title={ml({
									en: "about the company",
									fa: "درباره شرکت",
								})}
								className="h-full mt-2 md:mt-0"
							>
								<div className="text-white px-2">
									<div>
										{ml({ en: "company name : ", fa: "نام شرکت" })}
										{company_info.name}
									</div>
									<div>
										{ml({ en: "company description: ", fa: "توصیف شرکت:" })}
										{company_info.description}
									</div>
									<div>
										{ml({ en: "company history : ", fa: "تاریخچه شرکت:" })}
										{company_info.history}{" "}
									</div>
									<LinkLikeP link="/company-info">
										{ml({
											en: "see more (about company)",
											fa: "مشاهده بیشتر (درباره شرکت)",
										})}
									</LinkLikeP>
								</div>
							</Section>
						)}
					</div>
				</div>
				<Loading is_loading={company_info === null} />
				{company_info !== null && (
					<FollowUsRow
						className="mx-2"
						telegram={company_info.telegram}
						instagram={company_info.instagram}
						twitter={ company_info.twitter}
					/>
				)}
				<div className="bg-sky-900 flex flex-col py-1 space-y-1" style={{color:'lightgray'}}>
					<div className="flex flex-row mx-2 text-sm flex-wrap space-x-1">
						<p>
							**{" "}
							{ml({
								en: "developed by",
								fa: "توسعه داده شده توسط",
							})}{" "}
							<a href="https://github.com/hamedpro">@hamedpro</a>
							{" "} **
						</p>
						<span>|</span>
						<LinkLikeP link="/new-support-ticket">
							{ml({
								en: "report a bug",
								fa: "گزارش یک اشکال نرم افزاری",
							})}
						</LinkLikeP>
						<LinkLikeP link="/terms">
							{ml({
								en: "terms of use",
								fa: "قوانین و شرایط استفاده",
							})}
						</LinkLikeP>
						<span>|</span>
						<a href="https://github.com/hamedpro/corp-webapp">
							{ml({
								en: "GitHub repository",
								fa: "مخزن گیت هاب پروژه",
							})}
						</a>

						<span>|</span>
						<p
							onClick={() => {
								var new_lang = lang === "fa" ? "en" : "fa";
								localStorage.setItem("language", new_lang);
								set_lang(new_lang);
								location.reload();
							}}
						>
							change language to {lang === "fa" ? "English" : "farsi"}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

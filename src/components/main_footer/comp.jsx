import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkLikeP } from "../";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Subscripting from "./subscripting";
import { Instagram, Telegram, Twitter } from "@mui/icons-material";
import { AppContext } from "../../AppContext";
import { useContext, useState } from "react";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { ChangeLangModal } from "./ChangeLangModal";
import { customAjax } from "../../custom_ajax";
import { useEffect } from "react";
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
			(error) => {
				console.log("there was an error in fetching company name");
			}
		);
		customAjax({
			params: {
				task_name: "get_company_media",
			},
		}).then(
			(data) => {
				if (data.result.filter((i) => i.split(".")[0] === "square").length !== 0) {
					set_square_icon_src(
						gen_link_to_file(
							"./company_info/" +
								data.result.filter((i) => i.split(".")[0] === "square")[0]
						)
					);
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
				<div className="flex p-2 h-16 border-t border-stone-300 mt-2 mb-7">
					<div className="w-2/3 h-full flex mb-2 space-x-2">
						<div className="h-16 w-fit bg-blue-500">
							{square_icon_src ? (
								<img
									src={square_icon_src}
									className="h-full w-fit"
									style={{ objectFit: "contain" }}
								/>
							) : (
								<div className="h-16 w-16 bg-blue-400 mb-3 rounded"></div>
							)}
						</div>
						<div className="text-lg">
							{company_info && company_info.name}
							<br />
							<LinkLikeP link="/company-info" className="">
								(about us)
							</LinkLikeP>
						</div>
					</div>
					<div className="w-1/3 flex justify-end">
						<button
							onClick={() => scroll(0, 0)}
							className="bg-blue-600 px-1 mr-1 h-fit text-sm"
						>
							<KeyboardArrowUpRoundedIcon />
							<span>
								{ml({
									en: "go to top",
									fa: "بالای صفحه",
								})}
							</span>
						</button>
					</div>
				</div>
				<div className="flex flex-wrap md:flex-nowrap mx-2 p-2 md:space-x-2">
					<Subscripting className={"w-full shrink-0 md:shrink md:w-1/2"} />
					<div className="text-white w-1/2 shrink-0 md:shrink border border-blue-500 mt-2 md:mt-0 rounded p-2">
						<h1>about our company</h1>
					</div>
				</div>

				<div className="flex h-8 w-full items-center space-x-3 my-4 mx-2 px-1">
					<h1 className="mr-6 text-xl">
						{ml({
							en: "follow us !",
							fa: "ما را دنبال کنید !",
						})}
					</h1>
					<Instagram
						onClick={() => {
							if (company_info) {
								var id = company_info.instagram;
								if (id === "" || !id) {
									alert("instagram id is not set");
								} else {
									window.location.replace(
										`https://instagram.com/${company_info.instagram}`
									);
								}
							} else {
								alert("company info is not loaded yet");
							}
						}}
					/>
					<Twitter
						onClick={() => {
							if (company_info) {
								var id = company_info.twitter;
								if (id === "" || !id) {
									alert("twitter id is not set");
								} else {
									window.location.replace(
										`https://twitter.com/${company_info.twitter}`
									);
								}
							} else {
								alert("company info is not loaded yet");
							}
						}}
					/>
					<Telegram
						onClick={() => {
							if (company_info) {
								var id = company_info.telegram;
								if (id === "" || !id) {
									alert("telegram id is not set");
								} else {
									window.location.replace(
										`https://t.me/${company_info.telegram}`
									);
								}
							} else {
								alert("company info is not loaded yet");
							}
						}}
					/>
				</div>
				<div className="bg-sky-900 flex flex-col py-1 space-y-1">
					<div className="flex flex-row mx-2 text-sm">
						<div className="w-4/6 flex items-center">
							<p>
								{ml({
									en: "developed by",
									fa: "توسعه داده شده توسط",
								})}{" "}
								<a href="https://github.com/hamedpro">@hamedpro</a>
							</p>
						</div>
					</div>
					<div className="flex flex-row mx-2 text-sm flex-wrap space-x-1">
						<LinkLikeP link="/new-support-ticket">
							{ml({
								en: "report a bug",
								fa: "گزارش یک اشکال نرم افزاری",
							})}
						</LinkLikeP>
						<span>|</span>
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

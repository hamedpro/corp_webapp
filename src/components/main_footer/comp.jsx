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
import Section from "../section/comp";
import { Loading } from "../loading/comp";
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
								{ml({
									en: "(about us)",
									fa: "(درباره ما)",
								})}
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
									alert(
										ml({
											en: "instagram id is not set",
											fa: "آیدی اینستاگرام هنوز ثبت نشده است",
										})
									);
								} else {
									window.location.replace(
										`https://instagram.com/${company_info.instagram}`
									);
								}
							} else {
								alert(
									ml({
										en: "company info is not loaded yet",
										fa: "اطلاعات شرکت هنوز بارگزاری نشده است",
									})
								);
							}
						}}
					/>
					<Twitter
						onClick={() => {
							if (company_info) {
								var id = company_info.twitter;
								if (id === "" || !id) {
									alert(
										ml({
											en: "twitter id is not set",
											fa: "آیدی توییتر هنوز ثبت نشده است",
										})
									);
								} else {
									window.location.replace(
										`https://twitter.com/${company_info.twitter}`
									);
								}
							} else {
								alert(
									ml({
										en: "company info is not loaded yet",
										fa: "اطلاعات شرکت هنوز بارگزاری نشده است",
									})
								);
							}
						}}
					/>
					<Telegram
						onClick={() => {
							if (company_info) {
								var id = company_info.telegram;
								if (id === "" || !id) {
									alert(
										ml({
											en: "telegram id is not set",
											fa: "آیدی تلگرام هنوز ثبت نشده است",
										})
									);
								} else {
									window.location.replace(
										`https://t.me/${company_info.telegram}`
									);
								}
							} else {
								alert(
									ml({
										en: "company info is not loaded yet",
										fa: "اطلاعات شرکت هنوز بارگزاری نشده است",
									})
								);
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

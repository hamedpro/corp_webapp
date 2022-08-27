import {
	List,
	ListItem,
	Button,
	Typography,
	Input,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkLikeP } from "../";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { customAjax } from "../../../src/custom_ajax.js";
import Subscripting from "./subscripting";
import { Instagram, Telegram, Twitter } from "@mui/icons-material";
import { AppContext } from "../../AppContext";
import { useContext } from "react";
import { multi_lang_helper as ml } from "../../common";
export default function MainFooter() {
	var nav = useNavigate();
	var AppContextState = useContext(AppContext).AppContextState;
	var setAppContextState = useContext(AppContext).setAppContextState;

	return (
		<div className="bg-sky-800 text-white">
			<div className="flex p-2 h-16 border-t border-stone-300 mt-2 mb-2">
				<div className="w-2/3">
					<div className="h-1/2 w-1/3 bg-blue-500"></div>
					<div className="h-1/2 w-full">corp_webapp</div>
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
			<Subscripting />
			<div className="flex h-8 w-full items-center space-x-3 my-4 mx-2 px-1">
				<h1 className="mr-6 text-xl">
					{ml({
						en: "follow us !",
						fa: "ما را دنبال کنید !",
					})}
				</h1>
				<Instagram
					onClick={() => {
						window.location.replace(""); // todo add instagram link here
					}}
				/>
				<Twitter
					onClick={() => {
						window.location.replace(""); // todo add twitter link here
					}}
				/>
				<Telegram
					onClick={() => {
						window.location.replace(""); //todo add telegram link here
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
					<div className="w-2/6 flex justify-end">
						<Select
							value={AppContextState.language}
							onChange={(event) =>
								setAppContextState({
									...AppContextState,
									language: event.target.value,
								})
							}
						>
							<MenuItem value={"fa"}>farsi</MenuItem>
							<MenuItem value={"en"}>English</MenuItem>
						</Select>
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
				</div>
			</div>
		</div>
	);
}

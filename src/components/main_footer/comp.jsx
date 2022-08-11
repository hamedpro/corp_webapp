import { List, ListItem, Button, Typography, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkLikeP } from "../";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import { customAjax } from "../../../src/custom_ajax.js";
import Subscripting from "./subscripting";
import { Instagram, Telegram, Twitter } from "@mui/icons-material";
export default function MainFooter() {
	var nav = useNavigate();
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
						<span>go to top</span>
					</button>
				</div>
			</div>
			<Subscripting />
			<div className="flex h-8 w-full items-center space-x-3 my-4 mx-2 px-1">
				<h1 className="mr-6 text-xl">follow us !</h1>
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
							developed by <a href="https://github.com/hamedpro">@hamedpro</a>
						</p>
					</div>
					<div className="w-2/6 flex justify-end">
						<button className=" h-full text-right hover:bg-blue-600 px-1 rounded">
							change lang
						</button>
					</div>
				</div>
				<div className="flex flex-row mx-2 text-sm flex-wrap space-x-1">
					<LinkLikeP link="/new-support-ticket">report a bug</LinkLikeP>
					<span>|</span>
					<LinkLikeP link="/terms">terms of use</LinkLikeP>
					<span>|</span>
					<a href="https://github.com/hamedpro/corp-webapp">GitHub repository</a>
				</div>
			</div>
		</div>
	);
}

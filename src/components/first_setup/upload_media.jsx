import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import { OptionBox } from "./option_box";
export function UploadMedia() {
	function upload() {
		var form = new FormData();
		//todo check if all required images are selected
		var files = document.getElementById("favicon_input").files;
		form.append(0, files[0]);
		files = document.getElementById("rectangle_icon_input").files;
		form.append(1, files[0]);
		files = document.getElementById("square_icon_input").files;
		form.append(2, files[0]);
		fetch("http://" + window.location.hostname + ":4000?task_name=upload_company_media", {
			method: "POST",
			body: form,
		})
			.then((data) => data.text())
			.then((data) => console.log(data));
	}
	return (
		<OptionBox className="mt-2">
			<Typography variant="h5">
				{ml({
					en: "uploading icons section",
					fa: "بخش بارگذاری آیکون ها",
				})}
			</Typography>
			<p className="text-stone-500">
				{ml({
					en: "we need a bunch of icons in the described specifictions to show in diffrent places of the website",
					fa: "ما به تعدادی آیکون با مشخصات زیر نیاز داریم تا در بخش های مختلف از آن ها استفاده کنیم",
				})}
			</p>

			<OptionBox className="mt-1">
				<b>
					{ml({
						en: "favicon",
						fa: "ریز آیکون",
					})}
				</b>
				<p className="text-stone-500">
					{ml({
						en: "this icon will be placed before tab name in the browser and should be square",
						fa: "این آیکون قبل از نام زبانه در مرورگر شما قرار خواهد گرفت و باید مربع باشد",
					})}
				</p>
				<input type="file" className="block" id="favicon_input" />
			</OptionBox>
			<OptionBox className="mt-1">
				<b>
					{ml({
						en: "a rectangle icon",
						fa: "یک لوگو مستطیل شکل",
					})}
				</b>
				<p className="text-stone-500">
					{ml({
						en: `this icon will be placed togheter with your name in the header and other
							places. this icon should be in following aspect ratio : 19x6`,
						fa: "این آیکون همراه با نام شرکت شما در سربرگ سایت و ... نمایش داده خواهد شد. این آیکون افقی و دارای نسبت طول و عرض ۱۹ در ۶  باشد",
					})}
				</p>
				<input type="file" className="block" id="rectangle_icon_input" />
			</OptionBox>

			<OptionBox className="mt-1">
				<b>
					{ml({
						en: "a square icon",
						fa: "یک آیکون مربع",
					})}
				</b>
				<p className="text-stone-500">
					{ml({
						en: `this icon will be placed as your company's profile picture and maybe in
							other places where it's needed`,
						fa: "این آیکون به عنوان عکس حساب کاربری شرکت شما قرار خواهد گرفت. البته ممکن است در آینده در بخش های دیگر هم از آن استفاده شود",
					})}
				</p>
				<input type="file" className="block" id="square_icon_input" />
			</OptionBox>
			<button onClick={upload}>upload these</button>
		</OptionBox>
	);
}

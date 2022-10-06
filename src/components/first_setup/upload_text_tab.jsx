import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import { StyledDiv, StyledInput } from "../styled_elements";
import { OptionBox } from "./option_box";
export function UploadTextTab({ set_tab }) {
	function submit_to_server() {
		var val = (element_id) => document.getElementById(element_id).value;
		customAjax({
			params: {
				task_name: "set_company_info",
				company_info: JSON.stringify({
					name: val("company_name_input"),
					email_address: val("email_address_input"),
					landline_phone_number: val("landline_phone_number_input"),
					mobile_phone_number: val("mobile_phone_number_input"),
					address: val("address_input"),
					description: val("company_description_textarea"),
					history: val("history_input"),
					instagram: val("instagram_input"),
					telegram: val("telegram_input"),
					twitter: val("twitter_input"),
				}),
			},
		}).then(
			(data) => {
				console.log(data);
				set_tab("upload_media");
			},
			(error) => {
				console.log(error);
			}
		);
	}
	return (
		<div className="w-full p-2">
			<OptionBox className="bg-sky-100">
				<Typography variant="h5">
					{ml({
						en: "company's data upload section",
						fa: "بخش بارگذاری اطلاعات شرکت",
					})}
				</Typography>

				<p className="text-stone-500">
					{ml({
						en: "complete required information below to start your bussiness!",
						fa: "برای شروع کسب و کار خود اطلاعات زیر را وارد کنید ",
					})}
				</p>
				<p className="text-stone-500">
					{ml({
						en: "this information below will be shown in company's profile publicly",
						fa: "از اطلاعات زیر برای معرفی شرکت در صفحه معرفی شرکت استفاه خواهد شد",
					})}
				</p>
				<hr className="my-1" />
				<OptionBox className="mt-2 bg-white">
					<b>
						{ml({
							en: "company name:",
							fa: "نام شرکت:",
						})}
					</b>
					<p className="text-stone-500">
						{ml({
							en: "this name will be used in the header and ...",
							fa: "این نام در سربرگ و ... استفاده خواهد شد",
						})}
					</p>
					<StyledInput
						className="my-1"
						placeholder={ml({
							en: "enter company name here",
							fa: "نام شرکت را وارد کنید",
						})}
						id="company_name_input"
					/>
				</OptionBox>
				<OptionBox className="mt-2 bg-white">
					<b>
						{ml({
							en: "company email address:",
							fa: "آدرس ایمیل شرکت:",
						})}
					</b>
					<p className="text-stone-500">
						{ml({
							en: "this email address should be actively checked for the users messages",
							fa: "این آدرس ایمیل باید به صورت فعال به پیام های مخاطبین پاسخگو باشد",
						})}
					</p>
					<StyledInput
						className="my-1"
						id="email_address_input" placeholder={"emailAddress@gmail.com"} />
				</OptionBox>

				<OptionBox className="mt-2 bg-white">
					<b>
						{ml({
							en: "company landline phone number",
							fa: "شماره تلفن ثابت شرکت",
						})}
					</b>
					<p className="text-stone-500">
						{ml({
							en: "enter your office or ... landline phone number here",
							fa: "شماره تلفن ثابت دفتر شرکت یا ... را وارد کنید",
						})}
					</p>
					<StyledInput
						className="my-1"
						placeholder="ex: 021xxxxxxxx" id="landline_phone_number_input" />
				</OptionBox>
				<OptionBox className="mt-2 bg-white">
					<b>
						{ml({
							en: "a mobile phone number",
							fa: "یک شماره تلفن همراه",
						})}
					</b>
					<p className="text-stone-500">
						{ml({
							en: `enter an active mobile phone number for when the landline phone may not be
							available`,
							fa: "یک شماره موبایل فعال وارد کنید تا در صورتی که تلفن ثابت در دسترس نبود ارتباط شما و مخاطبینتان قطع نشود",
						})}
					</p>
					<StyledInput
						className="my-1"
						placeholder="09xxxxxxxxx" id="mobile_phone_number_input" />
				</OptionBox>
				<OptionBox className="mt-2 bg-white">
					<b>
						{ml({
							en: "company address:",
							fa: "آدرس شرکت:",
						})}
					</b>
					<p className="text-stone-500">
						{ml({
							en: "enter a full address of your company or your office here",
							fa: "آدرس کامل شرکت یا دفتر خود را وارد کنید",
						})}
					</p>
					<StyledInput
						className="my-1"
						id="address_input"
						placeholder={ml({
							en: "enter your address here",
							fa: "آدرس خود را اینجا وارد کنید",
						})}
					/>
				</OptionBox>
				<OptionBox className="mt-2 bg-white">
					<Typography variant="h5">
						{ml({
							en: "describe your company",
							fa: "شرکت خود را توصیف کنید",
						})}
					</Typography>
					<p className="text-stone-500">
						{ml({
							en: "write a description of what your company can do and introduce it shortly here",
							fa: "به صورت کوتاه و مفید شرکت خود را تعریف کنید و خدماتی که ارایه می دهید را توضیح دهید",
						})}
					</p>
					<textarea
						className="my-1 border border-stone-400 w-4/5 rounded p-1"
						id="company_description_textarea" rows="10"
						placeholder="start typing here ..."
					></textarea>
				</OptionBox>

				<OptionBox className="mt-2 bg-white">
					<Typography variant="h5">
						{ml({
							en: "the story of your company",
							fa: "داستان شرکت شما",
						})}
					</Typography>
					<p className="text-stone-500">
						{ml({
							en: "write a story like history about your company",
							fa: "سابقه و تاریخچه شرکت خود را به صورت یک داستان بنویسید",
						})}
					</p>
					<textarea
						className="my-1 border border-stone-400 w-4/5 rounded p-1"
						placeholder="start typing here ..."
						id="history_input" rows="10"></textarea>
				</OptionBox>

				<OptionBox className="mt-2 bg-white">
					<Typography variant="h5">
						{ml({
							en: "your company in social media",
							fa: "شرکت شما در فضای مجازی",
						})}
					</Typography>
					<p className="text-stone-500">
						{ml({
							en: "if you have account in any of the following websites please enter their ids otherwise leave them empty",
							fa: "اگر شرکت شما در هر یک از این سایت های زیر حساب کاربری دارد لطفا شناسه کاربری آنها را وارد کنید یا خالی بگذارید",
						})}
					</p>
					<p>
						{ml({
							en: "instagram page :",
							fa: "صفحه اینستاگرام",
						})}
					</p>
					<StyledInput className="my-1" id="instagram_input" />
					<br />

					<p>
						{ml({
							en: "telegram channel or personal account :",
							fa: "کانال تلگرام یا حساب کاربری شخصی :",
						})}
					</p>
					<StyledInput className="my-1" id="telegram_input" />
					<br />

					<p>
						{ml({
							en: "twitter :",
							fa: "توییتر:",
						})}
					</p>
					<StyledInput className="my-1" id="twitter_input" />
					<br />
				</OptionBox>
			</OptionBox>
			
			<StyledDiv onClick={submit_to_server}
				className="border border-blue-400 mt-2 text-lg w-fit">
				{ml({
					en: "submit all changes",
					fa: "ثبت تمام تغییرات",
				})}
			</StyledDiv>
		</div>
	);
}

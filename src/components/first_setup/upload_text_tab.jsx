import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
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
		<div className="w-full border border-stone-200 p-2">
			<OptionBox>
				<Typography variant="h5" sx={{ mt: 2 }}>
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
				<hr />

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
				<input
					placeholder={ml({
						en: "enter company name here",
						fa: "نام شرکت را وارد کنید",
					})}
					id="company_name_input"
				/>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">
					{ml({
						en: "completing company's informations",
						fa: "تکمیل اطلاعات شرکت",
					})}
				</Typography>

				<p className="text-stone-500">
					{ml({
						en: "this information below will be shown in company's profile publicly",
						fa: "از اطلاعات زیر برای معرفی شرکت در صفحه معرفی شرکت استفاه خواهد شد",
					})}
				</p>

				<OptionBox className="mt-2">
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
					<input id="email_address_input" placeholder={"emailAddress@gmail.com"} />
				</OptionBox>

				<OptionBox className="mt-2">
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
					<input placeholder="ex: 021xxxxxxxx" id="landline_phone_number_input" />
				</OptionBox>
				<OptionBox className="mt-2">
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
					<input placeholder="09xxxxxxxxx" id="mobile_phone_number_input" />
				</OptionBox>
				<OptionBox className="mt-2">
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
					<input id="address_input" placeholder="enter your address here" />
				</OptionBox>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">
					{ml({
						en: "describe your company",
						fa: "شرکت خود را توصیف کنید",
					})}
				</Typography>
				<p className="text-stone-500">
					{ml({
						en: "write a description of what your company can do and introduce it here",
						fa: "درباره سابقه شرکت خود و خدماتی که ارایه می دهد توضیحاتی دهید",
					})}
				</p>
				<textarea id="company_description_textarea" rows="10"></textarea>
			</OptionBox>
			<button onClick={submit_to_server} className="border border-blue-400">
				submit all changes
			</button>
		</div>
	);
}

import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
var OptionBox = (props) => {
	return (
		<div className={"border border-stone-400 mx-auto p-2" + " " + props.className}>
			{props.children}
		</div>
	);
};
export default function FirstSetup() {
	return (
		<div className="w-full border border-stone-200 p-2">
			<OptionBox>
				<Typography variant="h5">
					{ml({
						en: "registering the first admin",
						fa: "ثبت نام اولین کاربر مدیر",
					})}
				</Typography>
				<p className="text-stone-500">
					{ml({
						en: `first of all register a user with admin previleges. following tasks below will
						be done by this account and you will be loged in using this account
					`,
						fa: "اول از همه باید از طریق این بخش یک حساب کاربری با دسترسی مدیر بسازید . دستورات بعدی به وسیله این حساب کاربری ثبت خواهند شد",
					})}
				</p>
				<hr />
				<OptionBox>
					<p className="text-stone-500">
						{ml({
							en: "username:",
							fa: "نام کاربری",
						})}
					</p>
					<TextField
						size="small"
						lebel={ml({ en: "enter a username here", fa: "یک نام کاربری وارد کنید" })}
					/>
				</OptionBox>
				<OptionBox className="mt-2">
					<p className="text-stone-500">
						{ml({
							en: "password:",
							fa: "یک رمز عبور وارد کنید",
						})}
					</p>
					<TextField
						size="small"
						lebel={ml({
							en: "enter the password here",
							fa: "رمز عبور را اینجا وارد کنید",
						})}
					/>
				</OptionBox>
			</OptionBox>
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
				<TextField
					size="small"
					label={ml({
						en: "enter company name here",
						fa: "نام شرکت را وارد کنید",
					})}
				/>
			</OptionBox>

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
					<input type="file" className="block" />
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
					<input type="file" className="block" />
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
					<input type="file" className="block" />
				</OptionBox>
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
					<TextField size="small" label={"emailAddress@gmail.com"} />
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
					<TextField size="small" />
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
					<TextField size="small" />
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
					<TextField size="small" />
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
				<TextareaAutosize />
			</OptionBox>
		</div>
	);
}

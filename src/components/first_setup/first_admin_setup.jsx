import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";
import { StyledDiv, StyledInput } from "../styled_elements";
import { OptionBox } from "./option_box";
export function FirstAdminSetup({ set_tab }) {
	function submit() {
		var entered_username = document.getElementById("username_input").value;
		var super_admin_access_token = document.getElementById(
			"super_admin_access_token_input"
		).value;
		customAjax({
			params: {
				task_name: "new_user",
				username: entered_username,
				password: document.getElementById("password_input").value,
			},
			super_admin_access_token,
		}).then(
			(data) => {
				customAjax({
					params: {
						task_name: "toggle_user_admin_state",
						username: entered_username,
					},
					super_admin_access_token,
				}).then(
					(data) => {
						localStorage.setItem("username", entered_username);
						alert(
							ml({
								en: "done successfuly",
								fa: "با موفقیت انجام شد",
							})
						);
						set_tab("upload_text_tab");
					},
					(e) => {
						alert(
							ml({
								en: "something went wrong",
								fa: "خطایی رخ داد",
							})
						);
						console.log(error);
					}
				);
			},
			(error) => {
				alert(
					ml({
						en: "there was an error",
						fa: "خطایی رخ داد",
					})
				);
				console.log(error);
			}
		);
	}
	return (
		<Section className="mx-1" title={ml({
			en: "registering the first admin",
			fa: "ثبت نام اولین کاربر مدیر",
		})}
			innerClassName="px-2"
		>
			<p className="text-stone-500">
				{ml({
					en: `first of all register a user with admin previleges. following tasks below will
						be done by this account and you will be loged in using this account
					`,
					fa: "اول از همه باید از طریق این بخش یک حساب کاربری با دسترسی مدیر بسازید . دستورات بعدی به وسیله این حساب کاربری ثبت خواهند شد",
				})}
			</p>
			<OptionBox className="mt-2">
				<p className="text-stone-500">
					{ml({
						en: "username:",
						fa: "نام کاربری",
					})}
				</p>
				<StyledInput
					id="username_input"
					className="mt-1"
					placeholder={ml({ en: "enter a username here", fa: "یک نام کاربری وارد کنید" })}
				/>
			</OptionBox>
			<OptionBox className="mt-2">
				<p className="text-stone-500">
					{ml({
						en: "password:",
						fa: "یک رمز عبور وارد کنید",
					})}
				</p>
				<StyledInput
					className="mt-1"
					id="password_input"
					placeholder={ml({
						en: "enter the password here",
						fa: "رمز عبور را اینجا وارد کنید",
					})}
					type="password"
				/>
			</OptionBox>
			<OptionBox className="mt-2">
				<h1 className="text-black text-lg">
					{ml({
						en: `enter your "super admin access token"`,
						fa: "سوپر ادمین توکن خود را وارد کنید",
					})}
				</h1>
				<hr className="my-1" />
				<p>
					{ml({
						en: `this token is generated when you have set up the app in the server and its loged
						in the server console everytime you start your app`,
						fa: "این توکن هنگامی که برنامه را بر روی سرور نصب کردید تولید شده است و هر بار که سایت را اجرا میکنید در کنسول سرور نوشته می شود",
					})}
				</p>
				<StyledInput
					id="super_admin_access_token_input"
					placeholder={ml({
						en: "super admin access token",
						fa: "سوپر ادمین توکن",
					})}
					className="mt-2"
					type="password"
				/>
			</OptionBox>
			<StyledDiv
				className="w-fit mt-2 text-xl"
				onClick={submit}>{ml({ en: "submit", fa: "ثبت نهایی" })}</StyledDiv>
		</Section>
	);
}

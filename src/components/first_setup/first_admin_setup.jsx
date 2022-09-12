import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
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
		<OptionBox>
			<h1>
				{ml({
					en: "registering the first admin",
					fa: "ثبت نام اولین کاربر مدیر",
				})}
			</h1>
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
				<input
					id="username_input"
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
				<input
					id="password_input"
					placeholder={ml({
						en: "enter the password here",
						fa: "رمز عبور را اینجا وارد کنید",
					})}
					type="password"
				/>
			</OptionBox>
			<OptionBox className="mt-2">
				<p className="text-black">
					{ml({
						en: `enter your "super admin access token"`,
						fa: "سوپر ادمین توکن خود را وارد کنید",
					})}
				</p>
				<p>
					{ml({
						en: `this token is generated when you have set up the app in the server and its loged
						in the server console everytime you start your app`,
						fa: "این توکن هنگامی که برنامه را بر روی سرور نصب کردید تولید شده است و هر بار که سایت را اجرا میکنید در کنسول سرور نوشته می شود",
					})}
				</p>
				<input
					id="super_admin_access_token_input"
					placeholder={ml({
						en: "super admin access token",
						fa: "سوپر ادمین توکن",
					})}
					type="password"
				/>
			</OptionBox>
			<button onClick={submit}>{ml({ en: "submit", fa: "ثبت نهایی" })}</button>
		</OptionBox>
	);
}

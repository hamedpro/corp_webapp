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
				localStorage.setItem("username", entered_username);
				alert("done successfuly");
				set_tab("upload_text_tab");
			},
			(error) => {
				alert("there was an error");
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
				<p className="text-black">enter your "super admin access token"</p>
				<p>
					this token is generated when you have set up the app in the server and its loged
					in the server console everytime you start your app
				</p>
				<input
					id="super_admin_access_token_input"
					placeholder={"super admin access token"}
					type="password"
				/>
			</OptionBox>
			<button onClick={submit}>submit</button>
		</OptionBox>
	);
}

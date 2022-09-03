import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import { OptionBox } from "./option_box";
export function FirstAdminSetup({ set_tab }) {
	function submit() {
		var entered_username = document.getElementById("username_input").value;
		customAjax({
			params: {
				task_name: "new_user",
				username: entered_username,
				password: document.getElementById("password_input").value,
			},
		}).then(
			(data) => {
				customAjax({
					params: {
						task_name: "toggle_user_admin_state",
						username: entered_username,
					},
				}).then(
					(data) => {
						window.localStorage.setItem("username", entered_username);
						//todo make sure about it works properly
						customAjax({
							params: {
								task_name: "delete_user",
								username: "root",
							},
						}).then(
							() => {
								set_tab("upload_text_tab");
							},
							(error) => {
								alert("there was an error");
								console.log(error);
							}
						);
					},
					(error) => {
						alert("there was an error");
						console.log(error);
					}
				);
			},
			(error) => {
				alert("there was an error");
				console.log(error);
			}
		);
	}
	return (
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
			<button onClick={submit}>submit</button>
		</OptionBox>
	);
}

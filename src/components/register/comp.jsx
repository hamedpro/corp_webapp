import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import LinkLikeP from "../LinkLikeP/comp.jsx";
import Section from "../section/comp";
export default function Register() {
	var [terms_are_accepted,set_terms_are_accepted] = useState(false)
	var navigator = useNavigate();
	function register() {
		if (!terms_are_accepted) { 
			alert('in order to use our services you have to agree with our terms of use')
			return
		}
		var entered_username = document.getElementById("username_input").value;
		var entered_password = document.getElementById("password_input").value;
		var entered_mobile = document.getElementById("mobile_input").value;
		var entered_email_address = document.getElementById("email_address_input").value;
		var re_entered_password = document.getElementById("re_enter_password_input").value;
		if (re_entered_password !== entered_password) {
			alert('password and re entered password are not same')
			return 
		}
		customAjax({
			params: {
				task_name: "new_user",
				username: entered_username,
				password: entered_password,
				email_address: entered_email_address,
				mobile : entered_mobile
			},
		}).then(
			(data) => {
				if (data.result) {
					alert(ml({ en: "done", fa: "انجام شد" }));
				}
			},
			(error) => {
				alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
				console.log(error);
			}
		);
	}
	return (
		<Section title={ml({ en: "register", fa: "ثبت نام" })} className="mx-1 mt-1">
			<div className="px-2">
				<p>
					{ml({
						en: "username:",
						fa: "نام کاربری:",
					})}
				</p>
				<input id="username_input" className="border border-blue-400 rounded px-1" />
				
				<p>
					{ml({
						en: "password:",
						fa: "رمز عبور :",
					})}
				</p>
				<input
					id="password_input"
					className="border border-blue-400 rounded px-1"
					type="password"
				/>

				<p>
					re-enter your password:
				</p>
				<input
					id="re_enter_password_input"
					className="border border-blue-400 rounded px-1"
					type="password"
				/>

				<p>
					email address: <span className="text-xs">(**optional, leave empty to ignore)</span>
				</p>
				<input
					id="email_address_input"
					className="border border-blue-400 rounded px-1"
					type="email"
				/>

				<p>
					mobile phone number: <span className="text-xs">(**optional, leave empty to ignore)</span>
				</p>
				<input
					id="mobile_input"
					className="border border-blue-400 rounded px-1"
					type="text"
				/>
				<div
					onClick={() => set_terms_are_accepted(!terms_are_accepted)}
					className="flex items-center space-x-1 mt-2"
				>
					{terms_are_accepted ? <CheckBox /> : <CheckBoxOutlineBlank />}
					i accept <LinkLikeP
						link="/terms"
						className="inline-block"
					>terms of use</LinkLikeP>.
				</div>
				
				<button
					className="border border-blue-400 rounded block mt-2 px-2 py-1 hover:text-white hover:bg-blue-600 duration-300"
					onClick={register}
				>
					{ml({
						en: "register new user",
						fa: "ثبت نام کاربر جدید",
					})}
				</button>
			</div>
		</Section>
	);
}

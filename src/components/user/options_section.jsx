import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp.jsx";
import ListItem from "../list_item/comp.jsx";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { multi_lang_helper as ml } from "../../common.js";
import { AppContext } from "../../AppContext.js";
export function OptionsSection() {
	var nav = useNavigate();
	var username = useParams().username;
	var option_funcs = {
		change_password: () => {
			var old_password = prompt(
				ml({ en: "enter your old password:", fa: "رمز فعلی خود را وارد کنید :" })
			);
			var new_password = prompt(
				ml({ en: "enter your new password: ", fa: "رمز عبور جدید خود را وارد کنید :" })
			);
			customAjax({
				params: {
					task_name: "change_password",
					username,
					old_password,
					new_password,
				},
			})
				.then(
					(data) => {
						if (data.result) {
							alert(ml({ en: "done", fa: "انجام شد" }));
						}
					},
					(error) => {
						console.log(error);
					}
				)
				.finally(() => {
					props.after_options();
				});
		},
		logout: () => {
			window.localStorage.removeItem("username");
			nav("/");
		},
		change_profile_bio: () => {
			alert(
				ml({
					en: "this feature will be implented soon",
					fa: "این ویژگی به زودی اضافه خواهد شد",
				})
			);
			//todo all of these funcs
		},
		change_username: () => {
			alert(
				ml({
					en: "this feature will be implented soon",
					fa: "این ویژگی به زودی اضافه خواهد شد",
				})
			);
		},
		delete_account: () => {
			alert(
				ml({
					en: "this feature will be implented soon",
					fa: "این ویژگی به زودی اضافه خواهد شد",
				})
			);
		},
		unsubscribe_emails: () => {
			alert(
				ml({
					en: "this feature will be implented soon",
					fa: "این ویژگی به زودی اضافه خواهد شد",
				})
			);
		},
		unsubscribe_sms: () => {
			alert(
				ml({
					en: "this feature will be implented soon",
					fa: "این ویژگی به زودی اضافه خواهد شد",
				})
			);
		},
	};
	return (
		<Section title="options">
			<ListItem
				onClick={option_funcs.change_password}
				items={[ml({ en: "change password", fa: "تغییر رمز عبور" })]}
			/>
			<ListItem
				onClick={option_funcs.logout}
				items={[ml({ en: "logout", fa: "خروج از حساب کاربری" })]}
			/>
			<ListItem
				onClick={option_funcs.change_profile_bio}
				items={[ml({ en: "change profile bio", fa: "تغییر بیوگرافی" })]}
			/>
			<ListItem
				onClick={option_funcs.change_username}
				items={[ml({ en: "change username", fa: "تغییر نام کاربری" })]}
			/>
			<ListItem
				onClick={option_funcs.delete_account}
				items={[ml({ en: "delete account", fa: "حذف حساب کاربری" })]}
			/>
			<ListItem
				onClick={option_funcs.unsubscribe_emails}
				items={[ml({ en: "unsubscribe emails", fa: "لغو عضویت در ایمیل ها" })]}
			/>
			<ListItem
				onClick={option_funcs.unsubscribe_sms}
				items={[ml({ en: "unsubscribe sms", fa: "لغو عضویت در پیامک ها" })]}
			/>
		</Section>
	);
}

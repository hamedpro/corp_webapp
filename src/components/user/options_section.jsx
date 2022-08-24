import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp.jsx";
import ListItem from "../list_item/comp.jsx";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { multi_lang_helper } from "../../common.js";
import { AppContext } from "../../AppContext.js";
export function OptionsSection() {
	var ml = new multi_lang_helper(useContext(AppContext));
	var nav = useNavigate();
	var username = useParams().username;
	var option_funcs = {
		change_password: () => {
			var old_password = prompt(ml.render({ en: "enter your old password:", fa: "" }));
			var new_password = prompt(ml.render({ en: "enter your new password: ", fa: "" }));
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
							alert(ml.render({ en: "done", fa: "" }));
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
			alert(ml.render({ en: "this feature will be implented soon", fa: "" }));
			//todo all of these funcs
		},
		change_username: () => {
			alert(ml.render({ en: "this feature will be implented soon", fa: "" }));
		},
		delete_account: () => {
			alert(ml.render({ en: "this feature will be implented soon", fa: "" }));
		},
		unsubscribe_emails: () => {
			alert(ml.render({ en: "this feature will be implented soon", fa: "" }));
		},
		unsubscribe_sms: () => {
			alert(ml.render({ en: "this feature will be implented soon", fa: "" }));
		},
	};
	return (
		<Section title="options">
			<ListItem
				onClick={option_funcs.change_password}
				items={[ml.render({ en: "change password", fa: "" })]}
			/>
			<ListItem onClick={option_funcs.logout} items={[ml.render({ en: "logout", fa: "" })]} />
			<ListItem
				onClick={option_funcs.change_profile_bio}
				items={[ml.render({ en: "change profile bio", fa: "" })]}
			/>
			<ListItem
				onClick={option_funcs.change_username}
				items={[ml.render({ en: "change username", fa: "" })]}
			/>
			<ListItem
				onClick={option_funcs.delete_account}
				items={[ml.render({ en: "delete account", fa: "" })]}
			/>
			<ListItem
				onClick={option_funcs.unsubscribe_emails}
				items={[ml.render({ en: "unsubscribe emails", fa: "" })]}
			/>
			<ListItem
				onClick={option_funcs.unsubscribe_sms}
				items={[ml.render({ en: "unsubscribe sms", fa: "" })]}
			/>
		</Section>
	);
}

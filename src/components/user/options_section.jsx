import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp.jsx";
import ListItem from "../list_item/comp.jsx";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
export function OptionsSection() {
	var nav = useNavigate();
	var username = useParams().username;
	var option_funcs = {
		change_password: () => {
			var old_password = prompt("enter your old password:");
			var new_password = prompt("enter your new password: ");
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
							alert("done");
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
			alert("this feature will be implented soon");
			//todo all of these funcs
		},
		change_username: () => {
			alert("this feature will be implented soon");
		},
		delete_account: () => {
			alert("this feature will be implented soon");
		},
		unsubscribe_emails: () => {
			alert("this feature will be implented soon");
		},
		unsubscribe_sms: () => {
			alert("this feature will be implented soon");
		},
	};
	return (
		<Section title="options">
			<ListItem onClick={option_funcs.change_password} items={["change password"]} />
			<ListItem onClick={option_funcs.logout} items={["logout"]} />
			<ListItem onClick={option_funcs.change_profile_bio} items={["change profile bio"]} />
			<ListItem onClick={option_funcs.change_username} items={["change username"]} />
			<ListItem onClick={option_funcs.delete_account} items={["delete account"]} />
			<ListItem onClick={option_funcs.unsubscribe_emails} items={["unsubscribe emails"]} />
			<ListItem onClick={option_funcs.unsubscribe_sms} items={["unsubscribe sms"]} />
		</Section>
	);
}

import { InfoRounded } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common";
import { CustomTable } from "../custom_table/comp.jsx";
import { Alert } from "../alert/comp";
import { Loading } from "../loading/comp";
import { CustomRow } from "./custom_row.jsx";
export default function UsersSection() {
	const [users, set_users] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_users",
			},
		}).then(
			(data) => {
				set_users(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);

	var modify_user = ({ task, payload }) => {
		switch (task) {
			case "username":
				customAjax({
					params: {
						task_name: "change_username",
						old_username: payload.old_username,
						new_username: window.prompt(
							ml({
								en: "enter new username here",
								fa: "نام کاربری جدید را وارد کنید",
							})
						),
					},
				})
					.then(
						(data) => {
							alert(
								ml({
									en: "done",
									fa: "انجام شد",
								})
							);
						},
						(error) => {
							alert(
								ml({
									en: "something went wrong",
									fa: "مشکلی رخ داد",
								})
							);
							console.log(error);
						}
					)
					.finally(() => {
						fetch_data();
					});
				break;
			case "is_admin":
				customAjax({
					params: {
						task_name: "toggle_user_admin_state",
						username: payload.username,
					},
				})
					.then(
						(data) => {
							if (data.result) {
								alert(
									ml({
										en: "done",
										fa: "انجام شد",
									})
								);
							}
						},
						(error) => {
							console.log(error);
						}
					)
					.finally(() => {
						fetch_data();
					});
				break;
		}
	};
	return (
		<div className="flex flex-col">
			<h1 className="mb-1">
				{ml({
					en: "users:",
					fa: "کاربران:",
				})}
			</h1>
			<Loading is_loading={users === null} />
			{users !== null &&
				users.length !== 0 &&
				users.map((user, index) => {
					return (
						<React.Fragment key={index}>
							<CustomRow
								fields={[
									{
										key: "id",
										value: user.id,
									},
									{
										key: "username",
										value: user.username,
										change_function: () => {
											modify_user({
												task: "username",
												payload: {
													old_username: user.username,
												},
											});
										},
									},
									{
										key: "is admin",
										value: user.is_admin,
										change_function: () => {
											modify_user({
												task: "is_admin",
												payload: { username: user.username },
											});
										},
									},
									{
										value: user.is_subscribed_to_email,
										change_function: () => {
											customAjax({
												params: {
													username: user.username,
													type: "email",
													task_name: "toggle_subscribtion",
												},
											})
												.then(
													(data) => {
														alert("done!");
													},
													(e) => {
														alert("something went wrong");
														console.log(e);
													}
												)
												.finally(fetch_data);
										},
										key: "is_subscribed_to_email",
									},

									{
										value: user.is_subscribed_to_sms,
										change_function: () => {
											customAjax({
												params: {
													username: user.username,
													type: "sms",
													task_name: "toggle_subscribtion",
												},
											})
												.then(
													(data) => {
														alert("done!");
													},
													(e) => {
														alert("something went wrong");
														console.log(e);
													}
												)
												.finally(fetch_data);
										},
										key: "is_subscribed_to_sms",
									},
									{
										key: "email",
										value: user.email,
										change_function: () => {
											customAjax({
												params: {
													username: user.username,
													new_val: prompt("enter new value"),
													new_val_type: "string",
													column_name: "email",
													task_name: "update_user",
												},
											})
												.then(
													() => alert("done"),
													(e) => {
														alert("something went wrong");
														console.log(e);
													}
												)
												.finally(fetch_data);
										},
									},
									{
										value: user.phone_number,
										change_function: () => {
											customAjax({
												params: {
													username: user.username,
													new_val: prompt("enter new value"),
													new_val_type: "string",
													column_name: "phone_number",
													task_name: "update_user",
												},
											})
												.then(
													() => alert("done"),
													(e) => {
														alert("something went wrong");
														console.log(e);
													}
												)
												.finally(fetch_data);
										},
										key: "phone number",
									},
									{
										value: user.time,
										key: "time",
									},
									{
										value: user.profile_image_file_name,
										key: "profile_image_file_name",
									},
									{
										key: ml({
											en: "delete his/her profile picture",
											fa: "حذف عکس این کاربر",
										}),
										type: "option",
										onClick: () => {
											customAjax({
												params: {
													task_name: "delete_user_profile_image",
													username: user.username,
												},
											})
												.then(
													() => alert("done"),
													(e) => {
														alert("something went wrong");
														console.log(e);
													}
												)
												.finally(fetch_data);
										},
									} /* todo implent it */,
								]}
							/>
						</React.Fragment>
					);
				})}
			{users !== null && users.length === 0 && (
				<Alert icon={<InfoRounded />}>there is not any user registered!</Alert>
			)}
		</div>
	);
}

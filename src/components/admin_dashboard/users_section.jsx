import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common";
import { CustomTable } from "../custom_table/comp.jsx";
export default function UsersSection() {
	const [users, set_users] = useState([]);
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
			{ml({
				en: "users:",
				fa: "کاربران:",
			})}
			<CustomTable
				headerItems={[
					ml({
						en: "user_id",
						fa: "شناسه کاربر",
					}),
					ml({
						en: "username",
						fa: "نام کاربری",
					}),
					ml({
						en: "is_admin",
						fa: "دسترسی مدیر",
					}),
					ml({
						en: "options",
						fa: "گزینه ها ",
					}),
				]}
				rows={users.map((user, index) => {
					return [
						{
							value: user.id,
							onClick: () => {
								alert(
									ml({
										en: "user id can't be changed",
										fa: "",
									})
								);
							},
						},
						{
							value: user.username,
							onClick: () => {
								modify_user({
									task: "username",
									payload: {
										old_username: user.username,
									},
								});
							},
						},
						{
							value: user.is_admin,
							onClick: () => {
								modify_user({
									task: "is_admin",
									payload: { username: user.username },
								});
							},
						},
						{
							value: ml({
								en: "delete his/her profile picture",
								fa: "",
							}),
							onClick: () => {
								alert(
									ml({
										en: "this feature is under development",
										fa: "",
									})
								);
							},
						} /* todo implent it */,
					];
				})}
			/>
		</div>
	);
}

import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common";
import { AppContext } from "../../AppContext";
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
	useEffect(() => fetch_data(), []);

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
						id: payload.user_id,
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
		<div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
			<h1>
				{ml({
					en: "users:",
					fa: "کاربران:",
				})}
			</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>
							{ml({
								en: "user_id",
								fa: "شناسه کاربر",
							})}
						</th>
						<th>
							{ml({
								en: "username",
								fa: "نام کاربری",
							})}
						</th>
						<th>
							{ml({
								en: "is_admin",
								fa: "دسترسی مدیر",
							})}
						</th>
						<th>
							{ml({
								en: "options",
								fa: "گزینه ها ",
							})}
						</th>
					</tr>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>
									{user.username}
									<b
										onClick={() =>
											modify_user({
												task: "username",
												payload: {
													old_username: user.username,
												},
											})
										}
										className="cursor-pointer"
									>
										{" "}
										{ml({
											en: "modify",
											fa: "تغییر",
										})}
									</b>
								</td>
								<td>
									{user.is_admin}{" "}
									<b
										className="cursor-pointer"
										onClick={() =>
											modify_user({
												task: "is_admin",
												payload: { user_id: user.id },
											})
										}
									>
										{" "}
										{ml({
											en: "toggle",
											fa: "تغییر وضعیت",
										})}
									</b>
								</td>
								<td></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

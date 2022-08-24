import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../common";
import { AppContext } from "../../AppContext";
export default function UsersSection() {
	var ml = new multi_lang_helper(useContext(AppContext));
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
							ml.render({
								en: "enter new username here",
								fa: "",
							})
						),
					},
				})
					.then(
						(data) => {
							alert(
								ml.render({
									en: "done",
									fa: "",
								})
							);
						},
						(error) => {
							alert(
								ml.render({
									en: "something went wrong, details are available in dev console",
									fa: "",
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
									ml.render({
										en: "done",
										fa: "",
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
				{ml.render({
					en: "users:",
					fa: "",
				})}
			</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>
							{ml.render({
								en: "user_id",
								fa: "",
							})}
						</th>
						<th>
							{ml.render({
								en: "username",
								fa: "",
							})}
						</th>
						<th>
							{ml.render({
								en: "is_admin",
								fa: "",
							})}
						</th>
						<th>
							{ml.render({
								en: "options",
								fa: "",
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
										{ml.render({
											en: "modify",
											fa: "",
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
										{ml.render({
											en: "toggle",
											fa: "",
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

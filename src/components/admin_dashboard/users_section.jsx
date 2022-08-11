import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
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
						new_username: window.prompt("enter new username here"),
					},
				})
					.then(
						(data) => {
							alert("done");
						},
						(error) => {
							alert("something went wrong, details are available in dev console");
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
								alert("done");
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
			<h1>users:</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>user_id</th>
						<th>username</th>
						<th>is_admin</th>
						<th>options</th>
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
										(modify)
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
										(toggle)
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

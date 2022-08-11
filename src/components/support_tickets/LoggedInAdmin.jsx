import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
const LoggedInAdmin = () => {
	const [support_tickets, set_support_tickets] = useState([]);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_support_tickets",
			},
		}).then(
			(data) => {
				set_support_tickets(data.result);
			},
			(error) => {
				if (error) {
					console.log(error);
				}
			}
		);
	}, []);
	var nav = useNavigate();
	return (
		<div
			id="support-tickets"
			className="mx-auto w-full border border-blue-400 rounded p-2 mt-2 "
		>
			<h1 className="mt-1 text-lg">support tickets :</h1>
			<hr className="mb-2 mt-1" />
			<table>
				<tbody>
					<tr>
						<th>id</th>
						<th>username</th>
						<th>title</th>
						<th>link</th>
					</tr>
					{support_tickets.map((st) => {
						return (
							<tr key={Number(st.id)}>
								<td>{st.id}</td>
								<td>{st.username}</td>
								<td>{st.title}</td>
								<td>
									<span
										onClick={() => {
											nav("/support-tickets/" + st.id);
										}}
									>
										open it
									</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default LoggedInAdmin;

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
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
			<h1 className="mt-1 text-lg">
				{ml({
					en: "this product has'nt any image",
					fa: "این کالا در حال حاضر هیچ عکسی ندارد",
				})}
			</h1>
			<hr className="mb-2 mt-1" />
			<table>
				<tbody>
					<tr>
						<th>
							{ml({
								en: "id",
								fa: "شناسه",
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
								en: "title",
								fa: "عنوان",
							})}
						</th>
						<th>
							{ml({
								en: "link",
								fa: "لینک",
							})}
						</th>
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
										{ml({
											en: "open it",
											fa: "باز کردن",
										})}
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import "./s.css";
export default function SupportTicket() {
	var support_ticket_id = useParams().support_ticket_id;
	//todo add user privilege system here to only allow admin or who has submitted this sp
	//todo check if multi lang helper updates when its used inside a function before return
	var string = ml({ en: "loading ...", fa: "در حال بارگذاری..." });
	const [support_ticket, set_support_ticket] = useState({
		id: string,
		username: string,
		title: string,
		text: string,
		type: string,
		is_proceed: string,
		proceeded_by: string,
	});
	const [comments, set_comments] = useState([]);
	function toggle_proceeding_state() {
		if (window.confirm(ml({ en: "are you sure ?", fa: "آیا اطمینان دارید ؟" }))) {
			customAjax({
				params: {
					task_name: "toggle_support_ticket",
					id: support_ticket_id,
					proceeded_by: window.localStorage.getItem("username"),
				},
			})
				.then(
					(data) => {
						alert(ml({ en: "done", fa: "انجام شد" }));
					},
					(error) => {
						console.log(error);
					}
				)
				.finally(() => fetch_data());
		}
	}
	function delete_comment(comment_id) {
		if (
			window.confirm(
				ml({
					en: `are you sure ? `,
					fa: "آیا اطمینان دارید ؟",
				})
			)
		) {
			customAjax({
				params: {
					task_name: "delete_support_ticket_comment",
					id: comment_id,
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
					fetch_data();
				});
		}
	}
	function submit_new_comment() {
		var text_of_comment = document.getElementById("comment_input").value;
		customAjax({
			params: {
				task_name: "comment_support_ticket",
				support_ticket_id,
				text: text_of_comment,
				username: window.localStorage.getItem("username"),
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
				document.getElementById("comment_input").value = "";
				fetch_data();
			});
	}
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_support_tickets",
			},
		}).then(
			(data) => {
				var support_ticket = data.result.filter((i) => i.id == support_ticket_id)[0];
				set_support_ticket(support_ticket);
			},
			(error) => console.log(error)
		);
		customAjax({
			params: {
				task_name: "get_support_ticket_comments",
				support_ticket_id,
			},
		}).then(
			(data) => {
				set_comments(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	return (
		<div id="support_ticket">
			<div className="mt-2 p-2 mx-auto w-full border border-blue-400 rounded">
				<h1 className="text-lg">
					{ml({
						en: "support ticket details",
						fa: "جزییات تیکت پشتیبانی",
					})}
				</h1>
				<hr />
				<table>
					<tbody>
						<tr>
							<th>{ml({ en: "key", fa: "نام آیتم " })}</th>
							<th>{ml({ en: "value", fa: "مقدار آیتم" })}</th>
							<th>{ml({ en: "options", fa: "گزینه ها " })}</th>
						</tr>
						<tr>
							<td>{ml({ en: "id", fa: "شناسه" })}</td>
							<td>{support_ticket.id}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml({ en: "username", fa: "نام کاربری" })}</td>
							<td>{support_ticket.username}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml({ en: "title", fa: "موضوع" })}</td>
							<td>{support_ticket.title}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml({ en: "type", fa: "نوع" })}</td>
							<td>{support_ticket.type}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml({ en: "text", fa: "متن" })}</td>
							<td>{support_ticket.text}</td>
							<td></td>
						</tr>
						<tr>
							<td>
								{ml({
									en: "proceeding state",
									fa: "وضعیت رسیدگی",
								})}
							</td>
							<td>
								{support_ticket.is_proceed == "true"
									? ml({
											en: `this support ticket is proceeded by an admin with username :`,
											fa: "به این تیکت پشتیبانی رسدگی شده است به وسیله",
									  }) +
									  " " +
									  support_ticket.proceeded_by
									: ml({
											en: "this support message is not proceeded yet ",
											fa: "هنوز به این تیکت پشتیبانی رسیدگی نشده است",
									  })}
							</td>
							<td onClick={toggle_proceeding_state}>
								{ml({
									en: "toggle",
									fa: "تغییر وضعیت ",
								})}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
				<h1 className="text-lg">
					{ml({
						en: "support ticket messages",
						fa: "بخش چت تیکت پشتیانی",
					})}
				</h1>
				<table>
					<tbody>
						<tr>
							<th>
								{ml({
									en: "comment id",
									fa: "شناسه نظر",
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
									en: "text",
									fa: "متن",
								})}
							</th>
							<th>
								{ml({
									en: "delete option",
									fa: "حذف کردن ویژگی",
								})}
							</th>
						</tr>
						{comments.map((comment) => {
							return (
								<tr key={comment.id}>
									<td>{comment.id}</td>
									<td>{comment.username}</td>
									<td>{comment.text}</td>
									<td
										onClick={() => {
											delete_comment(comment.id);
										}}
									>
										{ml({
											en: "delete it",
											fa: "پاک کردن این مورد",
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<h1 className="text-lg mt-5">
					{ml({
						en: "new comment",
						fa: "نظر جدید",
					})}
				</h1>
				<hr />
				<p>
					{ml({
						en: "text of the comment :",
						fa: "متن نظر جدید",
					})}
				</p>
				<input id="comment_input" className="border border-blue-400 rounded px-2" />
				<button
					className="border border-blue-400 hover:text-white hover:bg-blue-600 rounded p-2 block text-sm mt-2"
					onClick={submit_new_comment}
				>
					{ml({ en: "submit comment as ", fa: "ثبت این نظر به عنوان " })}
					{`@${window.localStorage.getItem("username")}`}
				</button>
			</div>

			{/* <div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
        
      </div> */}
		</div>
	);
}

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../common.js";
import "./s.css";
import { AppContext } from "../../AppContext";
export default function SupportTicket() {
	var support_ticket_id = useParams().support_ticket_id;
	var ml = new multi_lang_helper(useContext(AppContext));
	//todo check if multi lang helper updates when its used inside a function before return
	var string = ml.render({ en: "loading ...", fa: "" });
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
		if (window.confirm(ml.render({ en: "are you sure ?", fa: "" }))) {
			customAjax({
				params: {
					task_name: "toggle_support_ticket",
					id: support_ticket_id,
					proceeded_by: window.localStorage.getItem("username"),
				},
			})
				.then(
					(data) => {
						if (data.result) {
							alert(ml.render({ en: "done", fa: "" }));
						} else {
							alert(ml.render({ en: "result field was not true", fa: "" }));
						}
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
				ml.render({
					en: `are you sure you want to do following task ? \n -deleting support ticket comment with comment id "${comment_id}"`,
					fa: "",
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
							alert(ml.render({ en: "done", fa: "" }));
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
						alert(ml.render({ en: "done", fa: "" }));
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
					{ml.render({
						en: "support ticket details",
						fa: "",
					})}
				</h1>
				<hr className="" />
				<table>
					<tbody>
						<tr>
							<th>{ml.render({ en: "key", fa: "" })}</th>
							<th>{ml.render({ en: "value", fa: "" })}</th>
							<th>{ml.render({ en: "option", fa: "" })}</th>
						</tr>
						<tr>
							<td>{ml.render({ en: "id", fa: "" })}</td>
							<td>{support_ticket.id}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml.render({ en: "username", fa: "" })}</td>
							<td>{support_ticket.username}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml.render({ en: "title", fa: "" })}</td>
							<td>{support_ticket.title}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml.render({ en: "type", fa: "" })}</td>
							<td>{support_ticket.type}</td>
							<td></td>
						</tr>
						<tr>
							<td>{ml.render({ en: "text", fa: "" })}</td>
							<td>{support_ticket.text}</td>
							<td></td>
						</tr>
						<tr>
							<td>
								{ml.render({
									en: "proceeding state",
									fa: "",
								})}
							</td>
							<td>
								{support_ticket.is_proceed == "true"
									? ml.render({
											en: `this support ticket is proceeded by an admin with username : ${support_ticket.proceeded_by}`,
											fa: "",
									  })
									: ml.render({
											en: "this support message is not proceeded yet ",
											fa: "",
									  })}
							</td>
							<td onClick={toggle_proceeding_state}>
								{ml.render({
									en: "toggle",
									fa: "",
								})}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
				<h1 className="text-lg">
					{ml.render({
						en: "support ticket messages",
						fa: "",
					})}
				</h1>
				<table>
					<tbody>
						<tr>
							<th>
								{ml.render({
									en: "comment id",
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
									en: "text",
									fa: "",
								})}
							</th>
							<th>
								{ml.render({
									en: "delete option",
									fa: "",
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
										{ml.render({
											en: "delete it",
											fa: "",
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<h1 className="text-lg mt-5">
					{ml.render({
						en: "new comment",
						fa: "",
					})}
				</h1>
				<hr />
				<p>
					{ml.render({
						en: "text of the comment :",
						fa: "",
					})}
				</p>
				<input id="comment_input" className="border border-blue-400 rounded px-2" />
				<button
					className="border border-blue-400 hover:text-white hover:bg-blue-600 rounded p-2 block text-sm mt-2"
					onClick={submit_new_comment}
				>
					{ml.render({ en: "submit comment as ", fa: "" })}
					{`@${window.localStorage.getItem("username")}`}
				</button>
			</div>

			{/* <div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
        
      </div> */}
		</div>
	);
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
import "./s.css";

export default function SupportTicket() {
	var support_ticket_id = useParams().support_ticket_id;
	const [support_ticket, set_support_ticket] = useState({
		id: "loading ...",
		username: "loading ...",
		title: "loading ...",
		text: "loading ...",
		type: "loading ...",
		is_proceed: "loading ...",
		proceeded_by: "loading ...",
	});
	const [comments, set_comments] = useState([]);
	function toggle_proceeding_state() {
		if (window.confirm("are you sure ?")) {
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
							alert("done");
						} else {
							alert("result field was not true");
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
				`are you sure you want to do following task ? \n -deleting support ticket comment with comment id "${comment_id}"`
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
						alert("done");
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
				<h1 className="text-lg">support ticket details</h1>
				<hr className="" />
				<table>
					<tbody>
						<tr>
							<th>key</th>
							<th>value</th>
							<th>options</th>
						</tr>
						<tr>
							<td>id</td>
							<td>{support_ticket.id}</td>
							<td></td>
						</tr>
						<tr>
							<td>username</td>
							<td>{support_ticket.username}</td>
							<td></td>
						</tr>
						<tr>
							<td>title</td>
							<td>{support_ticket.title}</td>
							<td></td>
						</tr>
						<tr>
							<td>type</td>
							<td>{support_ticket.type}</td>
							<td></td>
						</tr>
						<tr>
							<td>text</td>
							<td>{support_ticket.text}</td>
							<td></td>
						</tr>
						<tr>
							<td>proceeding state</td>
							<td>
								{support_ticket.is_proceed == "true"
									? `this support ticket is proceeded by an admin with username : ${support_ticket.proceeded_by}`
									: "this support message is not proceeded yet "}
							</td>
							<td onClick={toggle_proceeding_state}>toggle</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
				<h1 className="text-lg">support ticket messages</h1>
				<table>
					<tbody>
						<tr>
							<th>comment id</th>
							<th>username</th>
							<th>text</th>
							<th>delete option</th>
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
										delete it
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<h1 className="text-lg mt-5">new comment</h1>
				<hr />
				<p>text of the comment :</p>
				<input id="comment_input" className="border border-blue-400 rounded px-2" />
				<button
					className="border border-blue-400 hover:text-white hover:bg-blue-600 rounded p-2 block text-sm mt-2"
					onClick={submit_new_comment}
				>
					submit comment as {`@${window.localStorage.getItem("username")}`}
				</button>
			</div>

			{/* <div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
        
      </div> */}
		</div>
	);
}

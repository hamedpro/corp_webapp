import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import { CustomTable } from "../custom_table/comp.jsx";
import { Loading } from "../loading/comp.jsx";
import Section from "../section/comp.jsx";
import "./s.css";
export default function SupportTicket() {
	var support_ticket_id = useParams().support_ticket_id;
	//todo add user privilege system here to only allow admin or who has submitted this sp
	//todo check if multi lang helper updates when its used inside a function before return
	const [support_ticket, set_support_ticket] = useState(null);
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
				.finally(fetch_data);
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
			<Section
				title={ml({
					en: "support ticket details",
					fa: "جزییات تیکت پشتیبانی",
				})}
			>
				<div className="px-2">
					{!support_ticket && <Loading />}
					{support_ticket && (
						<CustomTable
							headerItems={[
								ml({ en: "key", fa: "نام آیتم " }),
								ml({ en: "value", fa: "مقدار آیتم" }),
								ml({ en: "options", fa: "گزینه ها " }),
							]}
							rows={[
								[
									{
										value: ml({ en: "id", fa: "شناسه" }),
									},
									{
										value: support_ticket.id,
										onClick: () => {},
									},
									{
										value: "",
										onClick: () => {},
									},
								],

								[
									{
										value: ml({ en: "username", fa: "نام کاربری" }),
									},
									{
										value: support_ticket.username,
										onClick: () => {},
									},
									{
										value: "",
										onClick: () => {},
									},
								],
								[
									{
										value: ml({ en: "title", fa: "موضوع" }),
									},
									{
										value: support_ticket.title,
										onClick: () => {},
									},
									{
										value: "",
										onClick: () => {},
									},
								],
								[
									{
										value: ml({ en: "type", fa: "نوع" }),
									},
									{
										value: support_ticket.type,
										onClick: () => {},
									},
									{
										value: "",
										onClick: () => {},
									},
								],
								[
									{
										value: ml({ en: "text", fa: "متن" }),
									},
									{
										value: support_ticket.text,
										onClick: () => {},
									},
									{
										value: "",
										onClick: () => {},
									},
								],
								[
									{
										value: ml({
											en: "proceeding state",
											fa: "وضعیت رسیدگی",
										}),
									},
									{
										value:
											support_ticket.is_proceed == "true"
												? ml({
														en: `this support ticket is proceeded by an admin with username :`,
														fa: "به این تیکت پشتیبانی رسدگی شده است به وسیله",
												  }) +
												  " " +
												  support_ticket.proceeded_by
												: ml({
														en: "this support message is not proceeded yet ",
														fa: "هنوز به این تیکت پشتیبانی رسیدگی نشده است",
												  }),
										onClick: () => {},
									},
									{
										value: "toggle",
										onClick: toggle_proceeding_state,
									},
								],
							]}
						/>
					)}
				</div>
			</Section>
			<Section
				title={ml({
					en: "support ticket messages",
					fa: "بخش چت تیکت پشتیانی",
				})}
			>
				<div className="px-2">
					<CustomTable
						headerItems={[
							ml({
								en: "comment id",
								fa: "شناسه نظر",
							}),
							ml({
								en: "username",
								fa: "نام کاربری",
							}),
							ml({
								en: "text",
								fa: "متن",
							}),
							ml({
								en: "delete option",
								fa: "حذف کردن ویژگی",
							}),
						]}
						rows={comments.map((comment) => {
							return [
								{
									value: comment.id,
									onClick: () => {},
								},

								{
									value: comment.username,
									onClick: () => {},
								},
								{
									value: comment.text,
									onClick: () => {},
								},
								{
									value: ml({
										en: "delete it",
										fa: "پاک کردن این مورد",
									}),
									onClick: () => {
										delete_comment(comment.id);
									},
								},
							];
						})}
					></CustomTable>
					<Section
						title={ml({
							en: "new comment",
							fa: "نظر جدید",
						})}
					>
						<div className="px-2">
							<p>
								{ml({
									en: "text of the comment :",
									fa: "متن نظر جدید",
								})}
							</p>
							<input
								id="comment_input"
								className="border border-blue-400 rounded px-2"
							/>
							<button
								className="border border-blue-400 hover:text-white hover:bg-blue-600 rounded p-2 block text-sm mt-2"
								onClick={submit_new_comment}
							>
								{ml({ en: "submit comment as ", fa: "ثبت این نظر به عنوان " })}
								{`@${window.localStorage.getItem("username")}`}
							</button>
						</div>
					</Section>
				</div>
			</Section>

			{/* <div className="mx-auto w-full mt-2 border border-blue-400 p-2 rounded">
        
      </div> */}
		</div>
	);
}

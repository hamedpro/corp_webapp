import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../common.js";
import { AppContext } from "../../AppContext.js";
export default function OptionsSection() {
	var mlh = new multi_lang_helper(useContext(AppContext));
	var nav = useNavigate();
	function change_my_own_password() {
		alert(
			mlh.render({
				en: "you will be redirected to your profile becuse this action should be done there",
				fa: "",
			})
		);
		nav("/users/" + window.localStorage.getItem("username"));
	}
	function undo_all() {
		customAjax({
			params: {
				task_name: "undo_all",
			},
		}).then(
			(data) => {
				alert(
					mlh.render({
						en: "done",
						fa: "",
					})
				);
			},
			(error) => {
				alert(
					mlh.render({
						en: "something went wrong",
						fa: "",
					})
				);
				console.log(error);
			}
		);
	}
	return (
		<div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
			<h1>
				{mlh.render({
					en: "options:",
					fa: "",
				})}
			</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>
							{mlh.render({
								en: "option name:",
								fa: "",
							})}
						</th>
					</tr>
					<tr>
						<td onClick={change_my_own_password}>
							{mlh.render({
								en: "change my own password",
								fa: "",
							})}
						</td>
					</tr>
					<tr>
						<td onClick={undo_all}>
							{mlh.render({
								en: "undo all",
								fa: "",
							})}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

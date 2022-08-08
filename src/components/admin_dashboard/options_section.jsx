import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
export default function OptionsSection() {
	var nav = useNavigate();
	function change_my_own_password() {
		alert("you will be redirected to your user account page becuse you can do it there");
		nav("/users/" + window.localStorage.getItem("username"));
	}
	function undo_all() {
		customAjax({
			params: {
				task_name: "undo_all",
			},
		}).then(
			(data) => {
				alert("done successfuly");
			},
			(error) => {
				alert("something went wrong");
				console.log(error);
			}
		);
	}
	return (
		<div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
			<h1>options:</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>option name:</th>
					</tr>
					<tr>
						<td onClick={change_my_own_password}>change my own password</td>
					</tr>
					<tr>
						<td onClick={undo_all}>undo all</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

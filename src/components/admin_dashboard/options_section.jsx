import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import { AppContext } from "../../AppContext.js";
export default function OptionsSection() {
	var nav = useNavigate();
	function change_my_own_password() {
		alert(
			ml({
				en: "you will be redirected to your profile becuse this action should be done there",
				fa: "هم اکنون برای تغییر رمز عبور به صفحه حساب کاربری خود تغییر مسیر داده خواهید شد ",
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
					ml({
						en: "done",
						fa: "انجام شد",
					})
				);
			},
			(error) => {
				alert(
					ml({
						en: "something went wrong",
						fa: "مشکلی رخ داد",
					})
				);
				console.log(error);
			}
		);
	}
	return (
		<div className="mt-2 p-2 mx-auto border border-blue-400 rounded">
			<h1>
				{ml({
					en: "options:",
					fa: "گزینه ها",
				})}
			</h1>
			<hr />
			<table className="custom_border">
				<tbody>
					<tr>
						<th>
							{ml({
								en: "option name:",
								fa: "نام قابلیت:",
							})}
						</th>
					</tr>
					<tr>
						<td onClick={change_my_own_password}>
							{ml({
								en: "change my own password",
								fa: "تغییر رمز عبور من",
							})}
						</td>
					</tr>
					<tr>
						<td onClick={undo_all}>
							{ml({
								en: "undo all",
								fa: "بازگشت به تنظیمات پیشفرض",
							})}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import { CustomTable } from "../custom_table/comp.jsx";
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
		if (!window.confirm("are you sure?")) {
			return;
		}
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
		<div className="flex flex-col">
			{ml({
				en: "options:",
				fa: "گزینه ها",
			})}
			<CustomTable
				headerItems={[
					ml({
						en: "option name:",
						fa: "نام قابلیت:",
					}),
				]}
				rows={[
					[
						{
							value: ml({
								en: "change my own password",
								fa: "تغییر رمز عبور من",
							}),
							onClick: change_my_own_password,
						},
					],
					[
						{
							value: ml({
								en: "undo all",
								fa: "بازگشت به تنظیمات پیشفرض",
							}),
							onClick: undo_all,
						},
					],
				]}
			/>
		</div>
	);
}

import { useNavigate } from "react-router-dom";
import { customAjax } from "../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../common.js";
import { Section } from "./Section.jsx";
import { StyledDiv } from "./StyledElements";
import { CompanyInfoSection } from "./CompanyInfoSection";
import { ManageIconsSection } from "./ManageIconsSection";
export function AdminDashboardOptionsSection() {
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
		if (!window.confirm(ml({ en: "are you sure?", fa: "" }))) {
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
	var custom_button_class_name = "border border-stone-400 rounded px-1";
	return (
		<div className="flex flex-col">
			<input type="file" id="common_file_input" className="hidden" />
			<div className="mb-2">
				<Section title="مورد جدید" innerClassName="px-2">
					<StyledDiv onClick={() => nav("/new-product")}>اضافه کردن محصول جدید</StyledDiv>
					<StyledDiv className="mt-2" onClick={() => nav("/writings/new")}>
						اضافه کردن نوشته جدید
					</StyledDiv>
				</Section>
			</div>
			<Section
				title={ml({
					en: "options:",
					fa: "گزینه ها",
				})}
				className="mb-2"
			>
				<div className=" px-2">
					<button
						onClick={change_my_own_password}
						className={[custom_button_class_name, "mb-2"].join(" ")}
					>
						{ml({
							en: "change my own password",
							fa: "تغییر رمز عبور من",
						})}
					</button>
					<br />
					<button onClick={undo_all} className={custom_button_class_name}>
						{ml({
							en: "undo all",
							fa: "بازگشت به تنظیمات پیشفرض",
						})}
					</button>
				</div>
			</Section>
			<div className="mb-2">
				<ManageIconsSection />
			</div>
			<div className="mb-2">
				<CompanyInfoSection />
			</div>
		</div>
	);
}
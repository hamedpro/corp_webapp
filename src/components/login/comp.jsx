import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import Section from "../section/comp";
import { multi_lang_helper as ml } from "../../common";
export default function Login() {
	var navigate = useNavigate();

	function login(username, password) {
		customAjax({
			params: {
				task_name: "verify_user_password",
				username,
				password,
			},
		}).then(
			(data) => {
				if (data.result) {
					alert(
						ml({
							en: "auth was performed",
							fa: "احراز هویت انجام شد",
						})
					);
					// context.set_context_data({ username }); // todo take care to not override existing data in context data state in app.jsx
					localStorage.setItem("username", username);
					navigate("/");
				} else {
					alert(
						ml({
							en: "username or password was incorrect please try again",
							fa: "نام کاربری یا رمز عبور نادرست بود لطفا دوباره امتحان کنید",
						})
					);
				}
			},
			(error) => {
				//alert(ml({en : "something went wrong while requesting data => more details in dev console",fa: ""}));
				console.log(error);
			}
		);
	}
	return (
		<Section title={ml({ en: "login", fa: "ورود به حساب کاربری" })}>
			<div className="px-2">
				<p>
					{ml({
						en: "username:",
						fa: "نام کاربری:",
					})}{" "}
				</p>
				<input className="px-1 border border-blue-200 rounded" id="username_input" />
				<p>
					{ml({
						en: "password:",
						fa: "رمز عبور:",
					})}
				</p>
				<input
					className="px-1 border border-blue-200 rounded"
					id="password_input"
					type="password"
				/>

				<button
					onClick={() => {
						login(
							document.getElementById("username_input").value,
							document.getElementById("password_input").value
						);
					}}
					id="login_button"
					className="border border-blue-400 rounded block mt-2 px-2 py-1 hover:text-white hover:bg-blue-600 duration-300"
				>
					{ml({
						en: "login",
						fa: "ورود به حساب کاربری",
					})}
				</button>
			</div>
		</Section>
	);
}

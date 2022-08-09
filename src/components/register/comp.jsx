import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
export default function Register() {
	var navigator = useNavigate();
	function register() {
		var entered_username = document.getElementById("username_input").value;
		var entered_password = document.getElementById("password_input").value;
		customAjax({
			params: {
				task_name: "new_user",
				username: entered_username,
				password: entered_password,
			},
		}).then(
			(data) => {
				if (data.result) {
					alert("done");
				}
			},
			(error) => {
				alert("something went wrong => details in dev console");
				console.log(error);
			}
		);
	}
	return (
		<div className="border border-blue-400 rounded mx-auto w-full mt-2 p-2">
			<h1>register page</h1>
			<hr />
			<p>username:</p>
			<input id="username_input" className="border border-blue-400 rounded" />
			<p>password:</p>
			<input id="password_input" className="border border-blue-400 rounded" />
			<button
				className="border border-blue-400 rounded block mt-2 px-2 py-1 hover:text-white hover:bg-blue-600"
				onClick={register}
			>
				register new user
			</button>
		</div>
	);
}

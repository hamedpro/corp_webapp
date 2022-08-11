import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
//import global_context from "../../global_context";
export default function Login() {
	var navigate = useNavigate();
	//var context = useContext(global_context);
	function login(username, password) {
		customAjax({
			params: {
				task_name: "verify_user_password",
				username,
				password,
			},
			parse_json: true,
		}).then(
			(data) => {
				if (data.result) {
					alert("auth was performed");
					// context.set_context_data({ username }); // todo take care to not override existing data in context data state in app.jsx
					localStorage.setItem("username", username);
					navigate("/");
				} else {
					alert("username or password was incorrect please try again");
				}
			},
			(error) => {
				alert("something went wrong while requesting data => more details in dev console");
				console.log(error);
			}
		);
	}
	return (
		<>
			<div className="w-full border border-blue-200 rounded mx-auto my-2 p-3">
				<h1 className="text-lg">login page</h1>
				<hr className="my-2" />
				<p>username:</p>
				<input className="px-1 border border-blue-200 rounded" id="username_input" />
				<p>password:</p>
				<input className="px-1 border border-blue-200 rounded" id="password_input" />

				<button
					onClick={() => {
						login(
							document.getElementById("username_input").value,
							document.getElementById("password_input").value
						);
					}}
					id="login_button"
					className="block border border-black mt-2 rounded p-2 py-1"
				>
					login
				</button>
			</div>
		</>
	);
}

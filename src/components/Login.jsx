import { useNavigate } from "react-router-dom";
import { Section } from "./Section";
import { useContext, useState } from "react";
import { context } from "freeflow-react";
import { extract_user_id } from "freeflow-core/dist/utils.js";
export function Login() {
	var nav = useNavigate();
	var [identifier, set_identifier] = useState("");
	var [password, set_password] = useState("");
	var { cache, set_state, configured_axios } = useContext(context);
	async function login() {
		try {
			var { jwt } = (
				await configured_axios({
					url: "login",
					data: {
						value: password,
						identifier: identifier === "root" ? "-1" : identifier,
					},
					method: "post",
				})
			).data;
			alert("Authentication was done.");
			var user_id = extract_user_id(jwt);

			// if this user is logged in before, we delete its former profile seed
			set_state((prev) => ({
				...prev,
				profiles_seed: prev.profiles_seed.filter((ps) => ps.user_id !== user_id),
			}));

			set_state((prev) => ({
				...prev,
				profiles_seed: [
					...prev.profiles_seed.map((i) => ({
						...i,
						is_active: false,
					})),
					{ user_id, jwt, is_active: true, max_sync_depth: 3 },
				],
			}));
			nav("/");
		} catch (error) {
			console.log(error);
			alert(`Error! something in Login
            function gone wrong.
            find more info in console`);
		}
	}
	return (
		<Section
			title={"ورود به حساب کاربری"}
			className="mx-1"
		>
			<div className="px-2">
				<p>شناسه کاربری:</p>
				<input
					className="px-1 border border-blue-200 rounded text-black"
					onChange={(e) => set_identifier(e.target.value)}
					value={identifier}
				/>
				<p>رمز عبور:</p>
				<input
					className="px-1 border border-blue-200 rounded text-black"
					id="password_input"
					type="password"
					onChange={(e) => set_password(e.target.value)}
					value={password}
				/>

				<button
					onClick={login}
					id="login_button"
					className="border border-blue-400 rounded block mt-2 px-2 py-1 hover:text-white hover:bg-blue-500 duration-300"
				>
					ورود به حساب کاربری
				</button>
			</div>
		</Section>
	);
}

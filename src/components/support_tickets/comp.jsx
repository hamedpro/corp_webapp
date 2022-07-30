import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
import LoggedInAdmin from "./LoggedInAdmin.jsx";
import NotLoggedIn from "./NotLoggedIn.jsx";
import LoggedInButNotAdmin from "./LoggedInButNotAdmin.jsx";
import "./s.css";
export default function SupportTickets() {
	const [login_state, set_login_state] = useState("not_logged_in"); // either : ['not_logged_in',"logged_in_admin","logged_in_but_not_admin"]
	useEffect(() => {
		if (window.localStorage.getItem("username") === null) {
			set_login_state("not_logged_in");
		} else {
			customAjax({
				params: {
					task_name: "get_users",
				},
			}).then((data) => {
				var is_admin =
					data.result.filter(
						(user) => user.username == window.localStorage.getItem("username")
					)[0].is_admin == "true";
				if (is_admin) {
					set_login_state("logged_in_admin");
				} else {
					set_login_state("logged_in_but_not_admin");
				}
			});
		}
	}, []);
	switch (login_state) {
		case "not_logged_in":
			return <NotLoggedIn />;
			break;
		case "logged_in_but_not_admin":
			return <LoggedInButNotAdmin />;
			break;
		case "logged_in_admin":
			return <LoggedInAdmin />;
			break;
	}
}

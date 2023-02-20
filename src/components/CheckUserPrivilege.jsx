import { ReportGmailerrorredRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { getUserPrivilege } from "../common";
import { Alert } from "./Alert";
import { Loading } from "./Loading";
export function CheckUserPrivilege({ children, level, specific_username = null }) {
	// options for level prop : loged_in, admin, specific_user, specific_user_or_admin
	var [status, set_status] = useState("loading"); // options : loading, error, allowed, not_allowed
	//todo tell the user if its only enough to login
	useEffect(() => {
		getUserPrivilege().then(
			(result) => {
				if (level === "loged_in") {
					set_status(result.username !== null ? "allowed" : "not_allowed");
					return;
				}
				if (level === "specific_user") {
					set_status(result.username === specific_username ? "allowed" : "not_allowed");
					return;
				}
				if (level === "admin") {
					set_status(result.is_admin ? "allowed" : "not_allowed");
					return;
				}
				if (level === "specific_user_or_admin") {
					set_status(
						result.is_admin || result.username === specific_username
							? "allowed"
							: "not_allowed"
					);
					return;
				}
			},
			(error) => {
				set_status("error");
				console.log(error);
			}
		);
	}, []);
	return (
		<>
			{status === "error" && (
				<Alert icon={<ReportGmailerrorredRounded />} className="mt-2">
					{ml({
						en: `there was an error in the process of checking user privilege, checkout
						development console for more`,
						fa: "خطایی در فرآیند بررسی سطح دسترسی کاربر پیش آمد. برای اطلاعات بیشتر کنسول را بررسی کنید",
					})}
				</Alert>
			)}
			{status === "loading" && <Loading />}
			{status === "allowed" && <>{children}</>}
			{status === "not_allowed" && (
				<Alert icon={<ReportGmailerrorredRounded />} className="mt-2">
					{ml({
						en: "you are not allowed to access this part, try using another account",
						fa: "شما مجوز دسترسی به این بخش را ندارید",
					})}
					{/* todo tell the user if its enough to login with specific username  */}
				</Alert>
			)}
		</>
	);
}

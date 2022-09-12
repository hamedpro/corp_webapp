import { useParams } from "react-router-dom";

export function UserSupportTickets() {
	var username = useParams().username;
	return (
		<h1>
			{ml({
				en: "user support tickets of",
				fa: "تیکت های پشتیبانی کاربر : ",
			})}{" "}
			{username}
		</h1>
	);
}

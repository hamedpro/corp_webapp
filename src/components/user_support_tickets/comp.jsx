import { useParams } from "react-router-dom";

export function UserSupportTickets() {
	var username = useParams().username;
	return <h1>user support tickets of {username}</h1>;
}

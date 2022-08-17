import { useParams } from "react-router-dom";

export default function Orders() {
	var username = useParams().username;
	return <h1>orders of @{username}</h1>;
}

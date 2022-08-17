import { useParams } from "react-router-dom";

export default function Order() {
	var username = useParams().username;
	var order_id = Number(useParams().order_id);
	//todo : use user_id instead of username in whole app becuse username can be changed
	return (
		<h1>
			this is order #{order_id} of user @{username}
		</h1>
	);
}

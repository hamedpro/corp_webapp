import { useParams } from "react-router-dom";

export default function Blog() {
	var blog_id = useParams().blog_id;
	return (
		<>
			<p>Blog #{blog_id}</p>
			<p>coming soon ! : this page is under development</p>
		</>
	);
}

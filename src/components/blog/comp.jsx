import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { useParams } from "react-router-dom";
export default function Blog() {
	var blog_id = useParams().blog_id;
	return (
		<>
			<Section title={"blog post #" + blog_id}>
				<div className="px-2">
					<Alert icon={<InfoRounded sx={{ color: "white" }} />}>
						this feature will be implented soon ! track the development in github link
						in footer
					</Alert>
					{/* todo */}
				</div>
			</Section>
		</>
	);
}

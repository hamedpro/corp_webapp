import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
export default function Blogs() {
	return (
		<>
			<Section title="blog posts">
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

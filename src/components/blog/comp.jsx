import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { useParams } from "react-router-dom";
import { multi_lang_helper } from "../../common";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
export default function Blog() {
	var ml = new multi_lang_helper(useContext(AppContext));
	var blog_id = useParams().blog_id;
	return (
		<>
			<Section
				title={
					ml.render({
						en: "blog post #",
						fa: "",
					}) + blog_id
				}
			>
				<div className="px-2">
					<Alert icon={<InfoRounded sx={{ color: "white" }} />}>
						{ml.render({
							en: `this feature will be implented soon ! track the development in github link
							in footer`,
							fa: "",
						})}
					</Alert>
					{/* todo */}
				</div>
			</Section>
		</>
	);
}

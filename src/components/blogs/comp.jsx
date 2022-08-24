import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { multi_lang_helper } from "../../common";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
export default function Blogs() {
	var ml = new multi_lang_helper(useContext(AppContext));
	return (
		<>
			<Section
				title={ml.render({
					en: "blog posts",
					fa: "",
				})}
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

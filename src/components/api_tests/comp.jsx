import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../common";
import { AppContext } from "../../AppContext";
import { useContext } from "react";
export default function ApiTestPage() {
	var ml = new multi_lang_helper(useContext(AppContext));
	return (
		<>
			<h1>
				{ml.render({
					en: "api tests page",
					fa: "",
				})}
			</h1>
			<p>
				{ml.render({
					en: "coming soon",
					fa: "",
				})}
			</p>
		</>
	);
}

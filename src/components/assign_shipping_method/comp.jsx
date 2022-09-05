import { useState } from "react";
import { multi_lang_helper as ml } from "../../common";
import Section from "../section/comp";

export function AssignShippingMethod() {
	var [selected_method, set_selected_method] = useState(null);
	return <h1>this page is under development</h1>;
	return (
		<Section
			title={ml({
				en: "assign shipping method",
				fa: "مشخص کردن نحوه تحویل",
			})}
		>
			{/* todo let the admin to choose which shipping method every product should have */}
			<div className="flex"></div>
		</Section>
	);
}

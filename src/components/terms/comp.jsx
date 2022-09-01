import { multi_lang_helper as ml } from "../../common";
var Terms = () => {
	return (
		<h1>
			{ml({
				en: "here is terms of use page",
				fa: "اینجا صفحه قوانین و شرایط سایت است",
			})}
		</h1>
	);
};
export default Terms;

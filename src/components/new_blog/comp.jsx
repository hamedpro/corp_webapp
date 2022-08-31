import { multi_lang_helper as ml } from "../../common";
export default function NewBlog() {
	return (
		<>
			<p>
				{ml({
					en: "this page is under development",
					fa: "این صفحه در حال توسعه است",
				})}
			</p>
		</>
	);
}

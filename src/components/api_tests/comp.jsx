import { multi_lang_helper as ml } from "../../common";
export default function ApiTestPage() {
	return (
		<>
			<h1>
				{ml({
					en: "api tests page",
					fa: "صفحه تست api",
				})}
			</h1>
			<p>
				{ml({
					en: "coming soon",
					fa: "به زودی",
				})}
			</p>
		</>
	);
}

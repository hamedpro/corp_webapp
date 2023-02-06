import { multi_lang_helper as ml } from "../../common";
export default function MainFooter() {
	return (
		<div className="bg-sky-800 text-white">
			<div className="bg-sky-900 flex flex-col py-1 space-y-1" style={{ color: "lightgray" }}>
				<div className="flex flex-row mx-2 text-sm flex-wrap space-x-1">
					<p>
						**{" "}
						{ml({
							en: "developed by",
							fa: "توسعه داده شده توسط",
						})}{" "}
						<a href="https://github.com/hamedpro">@hamedpro</a> **
					</p>
				</div>
			</div>
		</div>
	);
}

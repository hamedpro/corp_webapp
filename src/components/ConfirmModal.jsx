import { multi_lang_helper as ml } from "../common";

export function ConfirmModal({ visibility, title, text, on_confirm, on_reject }) {
	//props : on_confirm , on_reject , title , text , visibility

	return (
		<div
			style={{ display: visibility ? "block" : "none" }}
			className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-1/2 h-1/2 border border-blue-400 bg-blue-600 text-white"
		>
			<h1>{title}</h1>
			<hr />
			<p>{text}</p>
			<div className="flex flex-row w-full items-center">
				<div className="w-1/2">
					<button onClick={on_confirm}>
						{ml({
							en: "confirm",
							fa: "تایید",
						})}
					</button>
				</div>
				<div className="w-1/2">
					<button onClick={on_reject}>
						{ml({
							en: "reject",
							fa: "رد",
						})}
					</button>
				</div>
			</div>
		</div>
	);
}

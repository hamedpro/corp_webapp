import { Message } from "primereact/message";
export function PageNotFound() {
	return (
		<Message
			style={{ margin: "4px" }}
			text={() => <span className="px-3">آدرس پیدا نشد</span>}
		/>
	);
}

import { React } from "react";
import { Section } from "./Section";
export const SupportMessageInfo = ({ support_message }) => {
	return (
		<Section title="اطلاعات درخواست پشتیبانی" innerClassName="px-2" className="m-2">
			<span className="text-stone-600">عنوان : </span>
			<span className="text-lg">{support_message.title}</span>
			<br />

			<span className="text-stone-600">متن : </span>
			<span className="text-lg">{support_message.text}</span>
			<br />

			<span className="text-stone-600">تاریخ ثبت درخواست : </span>
			<span className="text-lg">{new Date(support_message.date).toString()}</span>
			<br />
		</Section>
	);
};

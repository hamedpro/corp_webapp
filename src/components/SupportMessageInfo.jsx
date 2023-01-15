import { React } from "react";
import Section from "./section/comp";
export const SupportMessageInfo = ({ support_message }) => {
	return (
		<Section title="اطلاعات درخواست پشتیبانی" innerClassName="p-2" className="m-2">
			<h1>عنوان درخواست پشتیبانی :‌ {support_message.title}</h1>
			<h1>متن درخواست پشتیبانی :‌ {support_message.text}</h1>
			<h1>تاریخ درخواست پشتیبانی :‌ {new Date(support_message.date).toString()}</h1>
		</Section>
	);
};

import { HistoryEduRounded } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
export function SupportMessageRow({ support_message }) {
	var sm = support_message;
	var nav = useNavigate();
	return (
		<div
			className="py-8 hover:bg-blue-700 duration-300 hover:text-white flex flex-col justify-center h-10 border border-blue-500 rounded my-2 px-2 cursor-pointer"
			onClick={() => nav(`/support_messages/${sm._id}`)}
		>
			<div className="flex">
				<HistoryEduRounded />
				<h1 className="text-xl">{sm.title}</h1>
			</div>
			<p className="text-sm mt-2">
				ثبت شده توسط {sm.username} | حدود{" "}
				{Math.round((new Date().getTime() - sm.date) / 3600000)} ساعت پیش
			</p>
		</div>
	);
}

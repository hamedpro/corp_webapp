import React, { useEffect, useState } from "react";
import { custom_axios } from "../../api/client";
import { customAjax } from "../custom_ajax";
import { ArrowTitle } from "./ArrowTitle";

export const LatestChangesModal = () => {
	var [modal_is_visible, set_modal_is_visible] = useState(false);
	var [latest_changes, set_latest_changes] = useState();
	async function get_data() {
		var username = window.localStorage.getItem("username");
		if (username === null) return;
		var user = (
			await customAjax({
				params: {
					task_name: "get_users",
				},
			})
		).result.find((i) => i.username === username);
		if (user.is_admin !== "true") return;
		let latest_changes = (
			await custom_axios({
				method: "get",
				url: "/latest_changes",
			})
		).data;
		set_latest_changes(latest_changes);
		var tmp = window.localStorage.getItem("latest_changes_count");
		if (tmp === null || latest_changes.length !== Number(tmp)) {
			set_modal_is_visible(true);
			window.localStorage.setItem("latest_changes_count", latest_changes.length);
		}
	}
	useEffect(() => {
		get_data();
	}, []);
	if (modal_is_visible !== true) return;
	return (
		<>
			<div
				className="z-40 top-0 left-0 w-full h-full fixed"
				style={{ background: "rgb(0 2 42 / 55%)" }}
			></div>
			<div
				style={{ direction: "rtl" }}
				className="rtl z-50 bg-blue-800 text-white fixed top-1/2 left-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2"
			>
				<ArrowTitle title="بستن اعلان" onClick={() => set_modal_is_visible(false)} />
				<h1 className="px-2 text-lg bg-white text-blue-800 w-fit ">آخرین تغییرات فنی</h1>
				<div className="p-2">
					{latest_changes === undefined
						? "در حال بارگذاری..."
						: latest_changes.reverse().map((change, index, array) => (
								<div key={index} className="border-b border-blue-500 py-2">
									<h1>تغییر شماره {array.length - index}</h1>
									<p>{change}</p>
								</div>
						  ))}
				</div>
			</div>
		</>
	);
};

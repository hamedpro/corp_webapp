import { useState } from "react";
import { UploadMedia } from "./upload_media";
import { UploadTextTab } from "./upload_text_tab";
import { FirstAdminSetup } from "./first_admin_setup";
import { Done } from "./Done";
import { Welcome } from "./welcome";
export default function FirstSetup() {
	var [tab, set_tab] = useState("welcome");
	// options : upload_text_tab , upload_media , first_admin_setup , done , welcome
	return (
		<>
			{tab === "first_admin_setup" && <FirstAdminSetup set_tab={set_tab} />}
			{tab === "upload_media" && <UploadMedia set_tab={set_tab} />}
			{tab === "upload_text_tab" && <UploadTextTab set_tab={set_tab} />}
			{tab === "done" && <Done set_tab={set_tab} />}
			{tab === "welcome" && <Welcome set_tab={set_tab} />}
			{["first_admin_setup", "upload_text_tab", "upload_media"].includes(tab) && (
				<p className="text-center">
					page
					{tab === "first_admin_setup" && 1}
					{tab === "upload_text_tab" && 2}
					{tab === "upload_media" && 3}
					from 3
				</p>
			)}
		</>
	);
}

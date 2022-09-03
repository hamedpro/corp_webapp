import { useState } from "react";
import { UploadMedia } from "./upload_media";
import { UploadTextTab } from "./upload_text_tab";
import { FirstAdminSetup } from "./first_admin_setup";
export default function FirstSetup() {
	var [tab, set_tab] = useState("upload_media");
	// options : upload_text_tab , upload_media , first_admin_setup
	return (
		<>
			{tab === "first_admin_setup" && <FirstAdminSetup set_tab={set_tab} />}
			{tab === "upload_media" && <UploadMedia set_tab={set_tab} />}
			{tab === "upload_text_tab" && <UploadTextTab set_tab={set_tab} />}
			<p className="text-center">
				page
				{tab === "first_admin_setup" && 1}
				{tab === "upload_text_tab" && 2}
				{tab === "upload_media" && 3}
				from 3
			</p>
		</>
	);
}

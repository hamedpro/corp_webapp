import { useState } from "react";
import SubToSmsTab from "./sub_to_sms_tab";
import SubToEmailTab from "./sub_to_email_tab";
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";

export default function Subscripting() {
	var [current_tab, set_current_tab] = useState("sub_to_email");
	return (
		<>
			<div className="flex">
				<p>email subscribtion tab</p>
				<Radio
					checked={current_tab == "sub_to_email"}
					onChange={() => set_current_tab("sub_to_email")}
				/>
			</div>
			<div className="flex">
				<p>sms subscribtion tab</p>
				<Radio
					checked={current_tab == "sub_to_sms"}
					onChange={() => set_current_tab("sub_to_sms")}
				/>
			</div>

			{current_tab == "sub_to_sms" ? <SubToSmsTab /> : <SubToEmailTab />}
		</>
	);
}

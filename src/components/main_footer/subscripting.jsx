import { useState } from "react";
import SubToSmsTab from "./sub_to_sms_tab";
import SubToEmailTab from "./sub_to_email_tab";
import { multi_lang_helper as ml } from "../../common";
function Tab(props) {
	//optional props : className(string)
	//required props : active (boolean) content(string)
	var cn = "flex justify-center items-center py-1 cursor-pointer";
	/* take care about putting a space at the end of className
	when you want to + another string to it */
	if (props.className) {
		cn += ` ${props.className} `;
	}
	if (props.active) {
		cn += ` border-b-2 border-green-500 `;
	}
	return (
		<div className={cn} onClick={props.onClick ? props.onClick : () => {}}>
			{props.content}
		</div>
	);
}
export default function Subscripting() {
	var [current_tab, set_current_tab] = useState("sub_to_email");
	return (
		<div className="flex flex-col border border-blue-400 mx-2 rounded">
			<div className="flex w-full">
				<div className="w-1/2 border-b">
					<Tab
						content={ml({
							en: "email",
							fa: "ایمیل",
						})}
						active={current_tab == "sub_to_email"}
						onClick={() => set_current_tab("sub_to_email")}
					/>
				</div>
				<div className="w-1/2 border-l border-b border-stone-200">
					<Tab
						content={ml({
							en: "sms",
							fa: "پیامک",
						})}
						active={current_tab == "sub_to_sms"}
						onClick={() => set_current_tab("sub_to_sms")}
					/>
				</div>
			</div>
			<div className="flex px-2 flex-col">
				{current_tab == "sub_to_sms" ? <SubToSmsTab /> : <SubToEmailTab />}
			</div>
		</div>
	);
}

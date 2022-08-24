import { TextareaAutosize, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { multi_lang_helper } from "../../common";
var OptionBox = (props) => {
	return (
		<div className={"border border-stone-400 mx-auto p-2" + " " + props.className}>
			{props.children}
		</div>
	);
};
export default function FirstSetup() {
	var ml = new multi_lang_helper(useContext(AppContext));
	return (
		<div className="w-full border border-stone-200 p-2">
			<OptionBox>
				<Typography variant="h5">
					{ml.render({
						en: "registering the first admin",
						fa: "",
					})}
				</Typography>
				<p className="text-stone-500">
					{ml.render({
						en: `first of all register a user with admin previleges. following tasks below will
						be done by this account and you will be loged in using this account
					`,
						fa: "",
					})}
				</p>
				<hr />
				<OptionBox>
					<p className="text-stone-500">
						{ml.render({
							en: "username:",
							fa: "",
						})}
					</p>
					<TextField
						size="small"
						lebel={ml.render({ en: "enter a username here", fa: "" })}
					/>
				</OptionBox>
				<OptionBox className="mt-2">
					<p className="text-stone-500">
						{ml.render({
							en: "password:",
							fa: "",
						})}
					</p>
					<TextField
						size="small"
						lebel={ml.render({ en: "enter the password here", fa: "" })}
					/>
				</OptionBox>
			</OptionBox>
			<OptionBox>
				<Typography variant="h5" sx={{ mt: 2 }}>
					{ml.render({
						en: "company's data upload section",
						fa: "",
					})}
				</Typography>

				<p className="text-stone-500">
					{ml.render({
						en: "complete required information below to start your bussiness!",
						fa: "",
					})}
				</p>
				<hr />

				<b>
					{ml.render({
						en: "company name:",
						fa: "",
					})}
				</b>
				<p className="text-stone-500">
					{ml.render({
						en: "this name will be used in the header and ...",
						fa: "",
					})}
				</p>
				<TextField
					size="small"
					label={ml.render({
						en: "enter company name here",
						fa: "",
					})}
				/>
			</OptionBox>

			<OptionBox className="mt-2">
				<Typography variant="h5">
					{ml.render({
						en: "uploading icons section",
						fa: "",
					})}
				</Typography>
				<p className="text-stone-500">
					{ml.render({
						en: "we need a bunch of icons in the described specifictions to show in diffrent places of the website",
						fa: "",
					})}
				</p>

				<OptionBox className="mt-1">
					<b>
						{ml.render({
							en: "favicon",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: "this icon will be placed before tab name in the browser and should be square",
							fa: "",
						})}
					</p>
					<input type="file" className="block" />
				</OptionBox>
				<OptionBox className="mt-1">
					<b>
						{ml.render({
							en: "a rectangle icon",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: `this icon will be placed togheter with your name in the header and other
							places. this icon should be in following aspect ratio : 19x6`,
							fa: "",
						})}
					</p>
					<input type="file" className="block" />
				</OptionBox>

				<OptionBox className="mt-1">
					<b>
						{ml.render({
							en: "a square icon",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: `this icon will be placed as your company's profile picture and maybe in
							other places where it's needed`,
							fa: "",
						})}
					</p>
					<input type="file" className="block" />
				</OptionBox>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">
					{ml.render({
						en: "completing company's informations",
						fa: "",
					})}
				</Typography>

				<p className="text-stone-500">
					{ml.render({
						en: "this information below will be shown in company's profile publicly",
						fa: "",
					})}
				</p>

				<OptionBox className="mt-2">
					<b>
						{ml.render({
							en: "company email address:",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: "this email address should be actively checked for the users messages",
							fa: "",
						})}
					</p>
					<TextField
						size="small"
						label={ml.render({
							en: "emailAddress@gmail.com",
							fa: "",
						})}
					/>
				</OptionBox>

				<OptionBox className="mt-2">
					<b>
						{ml.render({
							en: "company landline phone number",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: "enter your office or ... landline phone number here",
							fa: "",
						})}
					</p>
					<TextField size="small" />
				</OptionBox>
				<OptionBox className="mt-2">
					<b>
						{ml.render({
							en: "a mobile phone number",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: `enter an active mobile phone number for when the landline phone may not be
							available`,
							fa: "",
						})}
					</p>
					<TextField size="small" />
				</OptionBox>
				<OptionBox className="mt-2">
					<b>
						{ml.render({
							en: "company address:",
							fa: "",
						})}
					</b>
					<p className="text-stone-500">
						{ml.render({
							en: "enter a full address of your company or your office here",
							fa: "",
						})}
					</p>
					<TextField size="small" />
				</OptionBox>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">
					{ml.render({
						en: "describe your company",
						fa: "",
					})}
				</Typography>
				<p className="text-stone-500">
					{ml.render({
						en: "write a description of what your company can do and introduce it here",
						fa: "",
					})}
				</p>
				<TextareaAutosize />
			</OptionBox>
		</div>
	);
}

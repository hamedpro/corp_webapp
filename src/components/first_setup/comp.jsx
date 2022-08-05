import { TextareaAutosize, TextField, Typography } from "@mui/material";
var OptionBox = (props) => {
	return (
		<div className={"border border-stone-400 mx-auto p-2" + " " + props.className}>
			{props.children}
		</div>
	);
};
export default function FirstSetup() {
	return (
		<div className="w-full border border-stone-200 p-2">
			<OptionBox>
				<Typography variant="h5">registering the first admin</Typography>
				<p className="text-stone-500">
					first of all register a user with admin previleges. following tasks below will
					be done by this account and you will be loged in using this account{" "}
				</p>
				<hr />
				<OptionBox>
					<p className="text-stone-500">username:</p>
					<TextField size="small" lebel="enter a username here" />
				</OptionBox>
				<OptionBox className="mt-2">
					<p className="text-stone-500">password:</p>
					<TextField size="small" lebel="enter the password here" />
				</OptionBox>
			</OptionBox>
			<OptionBox>
				<Typography variant="h5" sx={{ mt: 2 }}>
					company's data upload section
				</Typography>

				<p className="text-stone-500">
					complete required information below to start your bussiness!
				</p>
				<hr />

				<b>company name:</b>
				<p className="text-stone-500">this name will be used in the header and ...</p>
				<TextField size="small" label="enter company name here" />
			</OptionBox>

			<OptionBox className="mt-2">
				<Typography variant="h5">uploading icons section</Typography>
				<p className="text-stone-500">
					we need a bunch of icons in the described specifictions to show in diffrent
					places of the website
				</p>

				<OptionBox className="mt-1">
					<b>favicon</b>
					<p className="text-stone-500">
						this icon will be placed before tab name in the browser and should be square
					</p>
					<input type="file" className="block" />
				</OptionBox>
				<OptionBox className="mt-1">
					<b>a rectangle icon</b>
					<p className="text-stone-500">
						this icon will be placed togheter with your name in the header and other
						places. this icon should be in following aspect ratio : 19x6
					</p>
					<input type="file" className="block" />
				</OptionBox>

				<OptionBox className="mt-1">
					<b>a square icon</b>
					<p className="text-stone-500">
						this icon will be placed as your company's profile picture and maybe in
						other places where it's needed
					</p>
					<input type="file" className="block" />
				</OptionBox>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">completing company's informations</Typography>

				<p className="text-stone-500">
					this information below will be shown in company's profile publicly
				</p>

				<OptionBox className="mt-2">
					<b>company email address:</b>
					<p className="text-stone-500">
						this email address should be actively checked for the users messages
					</p>
					<TextField size="small" label="emailAddress@gmail.com" />
				</OptionBox>

				<OptionBox className="mt-2">
					<b>company landline phone number</b>
					<p className="text-stone-500">
						enter your office or ... landline phone number here
					</p>
					<TextField size="small" />
				</OptionBox>
				<OptionBox className="mt-2">
					<b>a mobile phone number</b>
					<p className="text-stone-500">
						enter an active mobile phone number for when the landline phone may not be
						available
					</p>
					<TextField size="small" />
				</OptionBox>
				<OptionBox className="mt-2">
					<b>company address:</b>
					<p className="text-stone-500">
						enter a full address of your company or your office here
					</p>
					<TextField size="small" />
				</OptionBox>
			</OptionBox>
			<OptionBox className="mt-2">
				<Typography variant="h5">describe your company</Typography>
				<p className="text-stone-500">
					write a description of what your company can do and introduce it here
				</p>
				<TextareaAutosize />
			</OptionBox>
		</div>
	);
}

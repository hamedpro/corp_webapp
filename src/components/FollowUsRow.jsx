import { Instagram, Telegram, Twitter } from "@mui/icons-material"
export function FollowUsRow({ telegram = null, instagram = null, twitter = null,className="" }) {
	return (
		<div className={["flex h-8 w-full items-center space-x-3 my-2 px-2", className].join(" ")}>
			<h1 className="text-xl ml-6">با ما همراه باشید :</h1>
			<Instagram
				onClick={() => {
					if (!instagram) {
						alert(
							ml({
								en: "instagram id is not set",
								fa: "آیدی اینستاگرام هنوز ثبت نشده است",
							})
						);
					} else {
						window.location.replace(`https://instagram.com/${instagram}`);
					}
				}}
				className="cursor-pointer"
			/>
			<Twitter
				onClick={() => {
					if (!twitter) {
						alert(
							ml({
								en: "twitter id is not set",
								fa: "آیدی توییتر هنوز ثبت نشده است",
							})
						);
					} else {
						window.location.replace(`https://twitter.com/${twitter}`);
					}
				}}
				className="cursor-pointer"
			/>
			<Telegram
				onClick={() => {
					if (!telegram) {
						alert(
							ml({
								en: "telegram id is not set",
								fa: "آیدی تلگرام هنوز ثبت نشده است",
							})
						);
					} else {
						window.location.replace(`https://t.me/${telegram}`);
					}
				}}
				className="cursor-pointer"
			/>
		</div>
	);
}
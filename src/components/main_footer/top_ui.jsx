import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
export function TopUi({ title, content }) {
	return (
		<>
			<div className="mx-auto h-16 w-16 rounded-full bg-blue-400 mt-3 flex justify-center items-center">
				<NotificationsActiveRoundedIcon
					sx={{ width: "80%", height: "80%", color: "white" }}
				/>
			</div>
			<h4 className="text-2xl text-center mt-1">{title}</h4>
			<p className="text-center text-sm mx-auto text-stone-300">{content}</p>
		</>
	);
}

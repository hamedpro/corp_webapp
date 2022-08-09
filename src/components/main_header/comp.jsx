import { MenuRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./header_menu";
export default function MainHeader() {
	var nav = useNavigate();
	var [header_menu_visibility, set_header_menu_visibility] = useState(false);

	return (
		<>
			<HeaderMenu
				hide_header_menu={() => set_header_menu_visibility(false)}
				visibility={header_menu_visibility}
			/>
			<div className="h-16 w-full"></div>
			<div
				className={`bg-stone-100 z-30 top-0 fixed h-16 w-full flex items-center flex-row p-2 border-b border-gray-300`}
			>
				<div className="w-3/4 flex flex-row items-center">
					<Button
						variant="outlined"
						sx={{
							minHeight: 0,
							minWidth: 0,
							width: "30px",
							height: 30,
							padding: 1,
							borderRadius: "10px",
							border: "1px solid lightgray",
						}}
						onClick={() => set_header_menu_visibility(!header_menu_visibility)}
					>
						<MenuRounded />
					</Button>
					<span className="px-2">corp_webapp</span>
				</div>
				<div className="w-1/4 flex flex-row justify-end"></div>
			</div>
		</>
	);
}

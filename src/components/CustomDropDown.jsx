import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomDropDown({ options }) {
	//the first option will always be visible
	var nav = useNavigate();
	var [is_open, set_is_open] = useState(false);
	return (
		<div className="mx-2 w-36 h-10 relative">
			<div
				className={`text-white cursor-pointer overflow-hidden absolute rounded-lg duration-300 w-36 z-20 bg-gray-500 top-0 left-0 ${
					is_open ? "h-34" : "h-10"
				}`}
				onClick={() => set_is_open((prev) => !prev)}
			>
				{options.map((option, index) => (
					<div
						className={
							index === 0
								? "hover:bg-gray-800 duration-300 justify-between h-10 w-full flex items-center px-1" +
								  (is_open ? " border-b border-blue-600" : "")
								: "hover:bg-gray-800 duration-300 h-8 w-full px-2 items-center flex"
						}
						onClick={index !== 0 ? () => {} : () => nav(option.url)}
					>
						<div className="flex items-center space-x-3">
							<option.icon sx={{ color: "white" }} />
							<h1 className="text-lg">{option.text}</h1>
						</div>

						{is_open && index === 0 ? (
							<KeyboardArrowUpRounded />
						) : (
							<KeyboardArrowDownRounded />
						)}
					</div>
				))}
			</div>
		</div>
	);
}

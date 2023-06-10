import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import { useState } from "react";

export function CustomDropDown({ options, optionsClassName = "" }) {
	//the first option will always be visible
	var [is_open, set_is_open] = useState(false);
	return (
		<div className="mx-2 relative" style={{ height: "40px", width: "150px", flexShrink: 0 }}>
			<div
				className={`text-white cursor-pointer overflow-hidden absolute rounded-lg duration-300 z-20  top-0 left-0 `}
				style={{
					width: "100%",
					height: is_open ? 40 * options.length + "px" : "40px",
					border: is_open ? "1px solid gray" : "",
				}}
				onClick={() => set_is_open((prev) => !prev)}
			>
				{options.map((option, index) => (
					<div
						key={Math.random()}
						className={[
							index === 0
								? ` duration-300 justify-between w-full flex items-center px-1` +
								  (is_open ? " border-b border-blue-600" : "")
								: "duration-300  w-full px-2 items-center flex",
							`${optionsClassName}`,
						].join(" ")}
						style={{ height: "40px" }}
						onClick={index === 0 ? () => {} : () => option.onClick()}
					>
						<div className="flex items-center space-x-3">
							{option.icon && <option.icon sx={{ color: "white" }} />}
							<h1 className="text-lg">{option.text}</h1>
						</div>
						{index === 0 &&
							(is_open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />)}
					</div>
				))}
			</div>
		</div>
	);
}

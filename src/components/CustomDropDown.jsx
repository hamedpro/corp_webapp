import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import { useState } from "react";

export function CustomDropDown({ options, optionsClassName = "" }) {
	//the first option will always be visible
	var [is_open, set_is_open] = useState(false);
	return (
		<div
			className="relative"
			style={{ height: "40px", minWidth: "170px", flexShrink: 1 }}
		>
			<div
				className={`text-white cursor-pointer overflow-hidden absolute rounded-lg duration-200 z-20  top-0 left-0 `}
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
						className={
							`duration-200 w-full flex space-x-4 items-center px-1` +
							` ${optionsClassName}`
						}
						style={{ height: "40px" }}
						onClick={index === 0 ? () => {} : () => option.onClick()}
					>
						<div className="px-2">
							{option.icon && <option.icon sx={{ color: "white" }} />}
						</div>
						<p className="text-lg whitespace-nowrap">{option.text}</p>
						{index === 0 &&
							(is_open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />)}
					</div>
				))}
			</div>
		</div>
	);
}

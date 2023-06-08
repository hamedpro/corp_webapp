import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const InternetControl = () => {
	function CustomButton({ children, url }) {
		var nav = useNavigate();
		return (
			<button
				className="w-2/5 h-40 bg-blue-500 text-xl hover:bg-blue-600 duration-300"
				onClick={() => nav(url)}
			>
				{children}
			</button>
		);
	}
	return (
		<div className="flex flex-col space-y-2 mt-4">
			<div
				className=" justify-around  items-end flex 
        "
			>
				<CustomButton url="https://vatankhah.pishro-control.ir/multi_systems">
					چیلر
				</CustomButton>
				<CustomButton url="https://mpkchiller.com/duct">داکت اسپلیت</CustomButton>
			</div>
			<div className="flex justify-around items-center">
				<CustomButton url="https://mpkchiller.com/dimmer">فن کوئل</CustomButton>
				<CustomButton>کولر آبی</CustomButton>
			</div>
			<div className="flex justify-around items-center">
				<CustomButton url="https://mpkchiller.com/power">پریز هوشمند</CustomButton>
			</div>
		</div>
	);
};

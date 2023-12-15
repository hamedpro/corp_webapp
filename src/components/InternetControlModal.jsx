import { Modal } from "@mui/material";
import React from "react";

export const InternetControlModal = ({ open, onClose }) => {
	function CustomButton({ children, url }) {
		return (
			<button
				className="w-full bg-blue-500 h-1/5 text-white text-2xl hover:bg-blue-600 duration-300"
				onClick={() => location.assign(url)}
			>
				{children}
			</button>
		);
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<div
				className="bg-white h-1/2 w-1/2 absolute flex flex-col"
				style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
			>
				<CustomButton url="https://pishro-control.ir/chiller">چیلر</CustomButton>
				<CustomButton url="https://mpkchiller.com/duct">داکت اسپلیت</CustomButton>
				<CustomButton url="https://mpkchiller.com/dimmer">فن کوئل</CustomButton>
				<CustomButton>کولر آبی</CustomButton>
				<CustomButton url="https://pishro-control.ir/power2">پریز هوشمند</CustomButton>
			</div>
		</Modal>
	);
};

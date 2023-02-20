import React from "react";

export const ProgressBarModal = ({ title, info, percentage }) => {
	return (
		<>
			<div
				className="fixed top-0 left-0 h-full w-full z-50 "
				style={{ background: "rgba(0,0,255,0.8)" }}
			></div>
			<div className="bg-white rounded p-2 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/3 w-1/3">
				<h1 className="text-lg">{title}</h1>
				<p className="text-sm ">{info}</p>

				<div className="w-full h-1 border-blue-900 rounded mt-2">
					<div
						className="h-full bg-blue-900 duration-300"
						style={{ width: percentage + "%" }}
					></div>
				</div>
				<span>{percentage}% </span>
			</div>
		</>
	);
};

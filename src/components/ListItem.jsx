import { ArrowCircleLeftRounded } from "@mui/icons-material";
import React from "react";
export function ListItem({
	className,
	vertical,
	onClick,
	beforeItems,
	image_src,
	items,
	remove_arrow,
}) {
	return (
		<div
			className={
				"hamedpro8977_list_item mb-1 flex relative border border-stone-400 rounded-lg mx-2 px-2 py-1 pr-3 bg-blue-500 duration-300 hover:bg-blue-700" +
				(typeof className == "undefined" ? "" : ` ${className}`) +
				(typeof vertical == "undefined" ? "" : vertical ? " flex-col" : "") +
				(typeof onClick !== "undefined" ? " cursor-pointer" : " cursor-default")
			}
			onClick={typeof onClick == "undefined" ? () => {} : onClick}
		>
			{typeof beforeItems == "undefined" ? <></> : <div className="mr-2">{beforeItems}</div>}
			{typeof image_src == "undefined" || image_src === null ? null : (
				<img
					src={image_src}
					className="w-1/3 mr-2"
				/>
			)}
			{items.map((item, index) => {
				if (vertical === true) {
					return (
						<React.Fragment key={index}>
							<h1 className={"mr-1 text-white "}>{item}</h1>
						</React.Fragment>
					);
				}
				return (
					<React.Fragment key={index}>
						{index != 0 ? <span className="text-gray-200">|</span> : null}
						<span className={"mr-1 text-white " + (index != 0 ? "ml-1" : "")}>
							{item}
						</span>
					</React.Fragment>
				);
			})}
			{remove_arrow !== true && (
				<div className="hamedpro8977_icon flex justify-content-center items-center">
					<i className="bi-arrow-left-short text-xl" />
				</div>
			)}
		</div>
	);
}

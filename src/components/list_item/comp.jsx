import { ArrowCircleRightRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import React from "react";
import "./styles.css";
export default function ListItem(props) {
	return (
		<div className="hamedpro8977_list_item relative border border-stone-400 rounded-lg mx-2 px-2 py-1 pr-3 bg-blue-600">
			{props.items.map((item, index) => {
				return (
					<React.Fragment key={index}>
						{index != 0 ? <span className="text-gray-200">|</span> : null}
						<span className={"mr-1 text-white " + (index != 0 ? "ml-1" : "")}>
							{item}
						</span>
					</React.Fragment>
				);
			})}
			<div className="hamedpro8977_icon flex justify-content-center items-center">
				<ArrowCircleRightRounded sx={{ color: "white" }} />{" "}
				{/* todo  fix issue of positioning arrow icon  */}
			</div>
		</div>
	);
}

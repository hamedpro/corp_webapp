import { ArrowBackIosRounded } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
export function SortingModal({ open, hideFn, setSortType, sortType }) {
	return (
		<Modal type="type1" className={"h-1/2 bg-sky-400"} is_visible={open} hideFn={hideFn}>
			<div className="flex m-2 space-x-2 items-center">
				<ArrowBackIosRounded
					className="hover:bg-blue-500 rounded"
					sx={{ color: "white" }}
					onClick={hideFn}
				/>
				<h1 className="text-lg text-white">sorting results</h1>
			</div>
			<div className="flex m-2 items-center">
				<Checkbox checked={sortType == "default"} onChange={() => setSortType("default")} />
				<h1>default mode</h1>
				{/* todo add a loading here becuse sort changing is slow at least now  */}
			</div>
			<div className="flex m-2 items-center">
				<Checkbox
					checked={sortType == "expensive_to_cheap"}
					onChange={() => setSortType("expensive_to_cheap")}
				/>
				<h1>expensive to cheap</h1>
			</div>

			<div className="flex m-2 items-center">
				<Checkbox
					checked={sortType == "cheap_to_expensive"}
					onChange={() => setSortType("cheap_to_expensive")}
				/>
				<h1>cheap to expensive</h1>
			</div>
		</Modal>
	);
}
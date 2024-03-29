import { Checkbox } from "@mui/material";
import { Modal } from "./Modal.jsx";
import { ArrowTitle } from "./ArrowTitle.jsx";
export function SortingModal({ open, hideFn, setSortType, sortType }) {
	return (
		<Modal
			type="type1"
			className={"h-1/2 bg-sky-800 text-white"}
			is_visible={open}
			hideFn={hideFn}
		>
			<ArrowTitle
				title={"مرتب کردن نتایج"}
				onClick={hideFn}
			/>
			<div className="flex m-2 items-center">
				<Checkbox
					sx={{ color: "white" }}
					checked={sortType == "default"}
					onChange={() => setSortType("default")}
				/>
				<h1>{"حالت پیشفرض"}</h1>
				{/* todo add a loading here becuse sort changing is slow at least now  */}
			</div>
			<div className="flex m-2 items-center">
				<Checkbox
					sx={{ color: "white" }}
					checked={sortType == "expensive_to_cheap"}
					onChange={() => setSortType("expensive_to_cheap")}
				/>
				<h1>{"گران به ارزان"}</h1>
			</div>

			<div className="flex m-2 items-center">
				<Checkbox
					sx={{ color: "white" }}
					checked={sortType == "cheap_to_expensive"}
					onChange={() => setSortType("cheap_to_expensive")}
				/>
				<h1>{"ارزان به گران"}</h1>
			</div>
		</Modal>
	);
}

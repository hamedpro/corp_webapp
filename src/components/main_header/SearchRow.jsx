import { SearchRounded } from "@mui/icons-material";
import React from "react";
export const SearchRow = ({ set_is_search_modal_visible }) => {
	return (
		<div
			className="border border-gray-400 rounded-lg flex items-center h-10 w-full px-2 space-x-1"
			onClick={() => set_is_search_modal_visible(true)}
		>
			<SearchRounded sx={{ color: "gray" }} />
			<h1 className="text-gray-700">جستجو در بین کالا ها ...</h1>
		</div>
	);
};

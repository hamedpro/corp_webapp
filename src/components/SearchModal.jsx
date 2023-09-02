import React, { useContext, useState } from "react";
import { Section } from "./Section";
import { useNavigate } from "react-router-dom";
import { ProductItem } from "./ProductItem";
import { ArrowTitle } from "./ArrowTitle";
import { context } from "freeflow-react";
export function SearchModal({ visibility, hide_func }) {
	var [search_query, set_search_query] = useState();
	var { cache } = useContext(context);
	if (visibility !== true) {
		return null;
	}
	var search_results;
	if (!search_query) {
		search_results = undefined;
	} else {
		search_results = cache.filter(
			(ci) =>
				ci.thing.type === "product" && JSON.stringify(ci.thing.value).includes(search_query)
		);
	}
	return (
		<div className="h-full w-full fixed bg-sky-800 top-0 left-0 z-50 flex flex-col">
			<div className="w-full flex">
				{" "}
				<ArrowTitle
					title="جستجو در محصولات"
					onClick={hide_func}
				/>
			</div>
			<div className="flex mx-2 my-2 h-10">
				<input
					type="text"
					id="search_input"
					className="border border-stone-400 rounded-lg px-2 w-full text-black"
					placeholder={"شروع به تایپ کنید"}
					dir="rtl"
					onChange={(e) => set_search_query(e.target.value)}
				/>
			</div>
			<Section
				title={"نتایج"}
				className="mx-2 overflow-y-scroll"
				innerClassName="px-1"
			>
				{search_results === undefined ? (
					<h1 className="text-white mx-2 mt-1">{"نتایج اینجا نمایش داده خواهند شد"}</h1>
				) : (
					<>
						<div className="h-full flex justify-between mx-2 mt-4 mb-2 text-sm border-b border-stone-400 ">
							<p className="text-stone-300">{"محصولات فیلتر شده"}</p>
							<p className="text-stone-300">
								{search_results.length} {"محصول"}
							</p>
						</div>
						<div className="flex flex-wrap justify-start mx-2">
							{search_results.map((ci) => {
								return (
									<ProductItem
										id={ci.thing_id}
										name={ci.thing.value.name}
										price={ci.thing.value.price}
										key={ci.thing_id}
										className="bg-white"
										description={ci.thing.value.description}
										beforeOnClick={hide_func}
									/>
								);
							})}
						</div>
					</>
				)}
			</Section>
		</div>
	);
}

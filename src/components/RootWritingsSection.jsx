import { Link } from "react-router-dom";
import React from "react";
import { WritingSquare } from "./WritingSquare";
import { WritingRow } from "./WritingRow";
export function RootWritingsSection(props) {
	if (props.writings === null) {
		return <h1>still loading writings ...</h1>;
	} else {
	}
	var sorted_writings = [...props.writings];
	sorted_writings.sort((i1, i2) => i1.publish_date < i2.publish_date);
	/* todo make sure about this sorting function above  */
	return (
		<div className="bg-gray-100 flex p-4 justify-center h-full my-1 overflow-x-auto flex-col">
			<div className="flex justify-between px-2 text-white mb-2 items-center text-lg">
				<h1 className="text-gray-700">آخرین نوشته ها</h1>
				<Link to="/writings" className="text-gray-700">
					مشاهده بیشتر
				</Link>
			</div>
			<div className="w-full flex h-fit flex-col sm:flex-row items-center sm:items-stretch">
				{sorted_writings.length === 0 ? (
					`there is not anything to show. (count of all published writings : ${sorted_writings.length})`
				) : (
					<WritingSquare writing={sorted_writings[0]} />
				)}
				<div className="flex flex-col w-full sm:w-2/3 overflow-hidden mt-6 sm:mt-0">
					{[1, 2, 3].map((number, index) => {
						var writing = sorted_writings[number];
						if (writing !== undefined) {
							return (
								<WritingRow
									{...writing}
									key={index}
									className={
										(index === 0 ? "rounded-t-lg" : "") +
										" " +
										(number === 3 ? "rounded-b-lg" : "")
									}
								/>
							);
						} else {
							return (
								<div
									key={index}
									className={
										`w-full h-1/3 bg-blue-100 flex-col border-x
										text-blue-600 border-b border-blue-300 flex px-6 justify-center
										cursor-pointer duration-200 hover:scale-105 hover:bg-blue-200 py-4 sm:py-0` +
										" " +
										(index === 0 ? "rounded-t-lg" : "") +
										" " +
										(number === 3 ? "rounded-b-lg" : "")
									}
								>
									<h1 className="text-xl">
										نوشته شماره {number + 1} برای نمایش وجود ندارد
									</h1>
									<p className="text-sm">
										{" "}
										(در مجموع {sorted_writings.length} نوشته منتشر شده است)
									</p>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}

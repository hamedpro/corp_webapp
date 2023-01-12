import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { customAjax } from "../custom_ajax";
import { WritingRow } from "./root/comp";
import Section from "./section/comp";

export const Writings = () => {
	var [writings, set_writings] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_table",
				table_name: "writings",
			},
		}).then((data) => set_writings(data.result), console.log);
	}, []);
	if (writings === null) return "loading writings ...";
	return (
		<Section title="نوشته ها" className="p-1">
			<div className="rounded-lg overflow-hidden m-2">
				{writings.map((writing, index) => {
					return (
						<Fragment key={writing.id}>
							<WritingRow {...writing} />
						</Fragment>
					);
				})}
			</div>
		</Section>
	);
};

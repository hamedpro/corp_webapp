import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { custom_axios } from "../../api/client";
import { WritingRow } from "./WritingRow";
import { Section } from "./Section";

export const Writings = () => {
	var [writings, set_writings] = useState(null);
	useEffect(() => {
		custom_axios({
			url: "/api-v2",
			headers: {
				task: "get_collection",
			},
			data: {
				collection_name: "writings",
				filters: {},
			},
		}).then((data) => set_writings(data.data), console.log);
	}, []);
	if (writings === null) return "loading writings ...";
	return (
		<Section title="نوشته ها" className="p-1">
			<div className="rounded-lg overflow-hidden m-2">
				{writings.map((writing, index) => {
					return (
						<Fragment key={writing._id}>
							<WritingRow {...writing} />
						</Fragment>
					);
				})}
			</div>
		</Section>
	);
};

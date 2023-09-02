import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Section } from "./Section";
import parse from "html-react-parser";
import editor_js_to_html from "editorjs-html";

export const Writing = () => {
	var { writing_id } = useParams();
	var [writing, set_writing] = useState(null);
	async function init_component() {
		var tmp = await custom_axios({
			url: "/api-v2",
			headers: {
				task: "get_collection",
			},
			data: {
				collection_name: "writings",
				filters: {
					_id: writing_id,
				},
			},
		});
		tmp = tmp.data;
		set_writing(tmp[0]);
	}
	useEffect(() => {
		init_component();
	}, []);

	if (writing === null) return "loading writing ...";

	var editor_js_to_html_parser = editor_js_to_html({
		table: (block) => {
			if (block.data.content.length === 0) return <b>[empty table]</b>;
			return renderToString(
				<table>
					<thead>
						<tr>
							{block.withHeadings &&
								block.data.content[0].map((i, index) => <th key={index}>{i}</th>)}
						</tr>
						<tr>
							{!block.withHeadings &&
								block.data.content[0].map((i, index) => <td key={index}>{i}</td>)}
						</tr>
					</thead>
					<tbody>
						{block.data.content.slice(1, block.data.content.length).map((i, index1) => (
							<tr key={index1}>
								{i.map((i, index2) => (
									<td key={index2}>{i}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);
		},
		checklist: (block) => {
			return renderToString(
				<>
					{block.data.items.map((i, index) => (
						<Fragment key={index}>
							<i className={i.checked ? "bi-toggle-on" : "bi-toggle-off"} />
							{i.text}
							<br />
						</Fragment>
					))}
				</>
			);
		},
	});

	return (
		<Section
			title={`نوشته ${writing_id}`}
			className="m-1"
		>
			<div className="p-2 flex flex-col sm:flex-row">
				<div className="w-full sm:w-1/2">
					<img src={`${vite_api_endpoint}/${writing.image_filename}`} />
				</div>
				<div className="w-full sm:w-1/2 p-2 flex flex-col">
					<h1 className="text-3xl">{writing.title}</h1>
					<p className="text-xs">
						حدود {Math.round((new Date().getTime() - writing.publish_date) / 3600000)}{" "}
						ساعت پیش | توسط {writing.publisher_username}
					</p>
					<div>{parse(editor_js_to_html_parser.parse(writing.data).join(""))}</div>
				</div>
			</div>
		</Section>
	);
};

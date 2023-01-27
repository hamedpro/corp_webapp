import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { custom_axios } from "../../api/client";
import { customAjax } from "../custom_ajax";
import Section from "./section/comp";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
export const Writing = () => {
	var [editor_js_instance, set_editor_js_instance] = useState(null);

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
	useEffect(() => {
		if (writing !== null) {
			var tmp = new EditorJS({
				readOnly: true,
				holder: "editor-js-div",
				data: writing["data"],
				tools: {
					header: {
						class: Header,
						inlineToolbar: true,
					},
					list: {
						class: List,
						inlineToolbar: true,
					},
					attach: {
						class: Attach,
						inlineToolbar: true,
					},
					table: {
						class: Table,
						inlineToolbar: true,
					},
					image: {
						class: ImageTool,
						inlineToolbar: true,
					},
					checklist: {
						class: Checklist,
						inlineToolbar: true,
					},
				},
				defaultBlock: "header",
				autofocus: true,
				placeholder: "start typing you note here...",
			});
			set_editor_js_instance(tmp);
		}
	}, [writing]);
	if (writing === null) return "loading writing ...";
	return (
		<Section title={`نوشته ${writing_id}`} className="m-1">
			<div className="p-2 flex flex-col sm:flex-row">
				<div className="w-full sm:w-1/2">
					<img src={`${window.api_endpoint}/${writing.image_filename}`} />
				</div>
				<div className="w-full sm:w-1/2 p-2 flex flex-col">
					<h1 className="text-3xl">{writing.title}</h1>
					<p className="text-xs">
						حدود {Math.round((new Date().getTime() - writing.publish_date) / 3600000)}{" "}
						ساعت پیش | توسط {writing.publisher_username}
					</p>
					<div id="editor-js-div"></div>
				</div>
			</div>
		</Section>
	);
};

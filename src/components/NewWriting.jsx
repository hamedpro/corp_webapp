import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import React from "react";
import { customAjax } from "../custom_ajax";
import Section from "./section/comp";
import { StyledDiv, StyledInput } from "./styled_elements";
import { useEffect } from "react";
import { useState } from "react";
import { new_document } from "../../api/client";

export const NewWriting = () => {
	var [editor_js_instance, set_editor_js_instance] = useState(null);
	async function submit_new_writing() {
		var el_files = document.getElementById("image_input").files;
		if (el_files.length === 0) {
			alert("please select a photo");
			return;
		}
		var form = new FormData();
		form.append("file", el_files[0]);
		var server_response = await fetch(vite_api_endpoint, {
			method: "POST",
			body: form,
			headers: {
				task_name: "upload",
			},
		});
		var { new_filename } = await server_response.json();
		new_document({
			collection_name: "writings",
			document: {
				title: document.getElementById("title_input").value,
				data: await editor_js_instance.save(),
				image_filename: new_filename,
				publish_date: new Date().getTime(),
				publisher_username: localStorage.getItem("username"),
			},
		}).then(
			(data) => {
				alert("all done ");
			},
			(error) => {
				console.log(error);
				alert("something went wrong. details in console ");
			}
		);
	}
	useEffect(() => {
		var editor_js_configs = {
			holder: "editor-js-div",
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
		};
		var tmp = new EditorJS(editor_js_configs);
		set_editor_js_instance(tmp);
	}, []);
	return (
		<Section title="ثبت نوشته جدید" className="m-1" innerClassName="p-2">
			<h1>انتخاب تصویر برای نوشته جدید:</h1>
			<input id="image_input" type="file" />

			<h1>یک عنوان برای این نوشته وارد کنید:</h1>
			<StyledInput id="title_input" />
			<h1>متن این نوشته را اینجا وارد کنید :</h1>
			<div id="editor-js-div" className="border border-stone-600 rounded px-1"></div>
			<StyledDiv onClick={submit_new_writing} className="w-fit mt-2">
				انتشار این نوشته{" "}
			</StyledDiv>
		</Section>
	);
};

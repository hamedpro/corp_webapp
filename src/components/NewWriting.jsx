import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Attach from "@editorjs/attaches";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import React from "react";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";
import { useEffect } from "react";
import { useState } from "react";
import { custom_axios, new_document } from "../../api/client";
import { ProgressBarModal } from "./ProgressBarModal";

export function NewWriting() {
	var [editor_js_instance, set_editor_js_instance] = useState(null);
	var [upload_state, set_upload_state] = useState({ is_uploading: false, percent: undefined });
	async function submit_new_writing() {
		var el_files = document.getElementById("image_input").files;
		if (el_files.length === 0) {
			alert("please select a photo");
			return;
		}
		var form = new FormData();
		form.append("file", el_files[0]);
		var { new_filename } = (
			await custom_axios({
				headers: {
					task_name: "upload",
				},
				data: form,
				method: "post",
				onUploadProgress: (e) => {
					set_upload_state({
						is_uploading: true,
						percent: Math.round((e.loaded * 100) / e.total),
					});
				},
			})
		).data;
		set_upload_state({
			is_uploading: false,
			percent: undefined,
		});
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

				table: {
					class: Table,
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
		<>
			{upload_state.percent && (
				<ProgressBarModal
					title="بارگذاری عکس نوشته"
					info="عکس نوشته در حال بارگذاری است ..."
					percentage={upload_state.percent}
				/>
			)}
			<Section title="ثبت نوشته جدید" className="m-1 w-full" innerClassName="p-2">
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
		</>
	);
}

import { useState } from "react";
import { customAjax } from "../custom_ajax";
import { DownloadCenter } from "./DownloadCenter";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";

export function ManageDownloadCenter() {
    var [counter,set_counter] = useState(1)
    
    function upload_files() {
        var input_files = document.getElementById('file_input').files
        var files = []
        Object.keys(input_files).forEach(key=>{
            files.push(input_files[key])
        })
        customAjax({
            params: {
                task_name: 'new_download_center_item',
                upload_dir: './uploaded/download_center',
                publisher_username: window.localStorage.getItem('username'),
                title: document.getElementById('file_title').value,
                description : document.getElementById('file_description').value
            },
            files,
        }).then(data => {
            alert('done!')
        }, err => {
            alert('something went wrong')
            console.log(err)
        }).finally(() => {
            set_counter(counter + 1)
        })
    }
	return (
		<div className="flex flex-col">
			<DownloadCenter admin_mode />
			<Section title="بارگذاری فایل جدید" className="mt-2" innerClassName="px-2">
				<input id="file_input" type={"file"} className="mt-1" />
				<p>نام فایل جدید را وارد کنید :‌</p>
				<StyledInput id="file_title" className="block" />
				<p>توضیحی برای فایل جدید وارد کنید :‌</p>
				<StyledInput id="file_description" className="block" />
				<StyledDiv onClick={upload_files} className="w-fit mt-4 text-lg">
					بارگذاری این فایل
				</StyledDiv>
			</Section>
		</div>
	);
}

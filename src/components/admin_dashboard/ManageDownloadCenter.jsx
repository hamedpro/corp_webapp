import { useState } from "react";
import { customAjax } from "../../custom_ajax";
import { DownloadCenter } from "../DownloadCenter";
import Section from "../section/comp";
import { StyledDiv } from "../styled_elements";

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
                task_name: 'upload',
                upload_dir : './uploaded/download_center',
                files_names : JSON.stringify([1,2,3,4])
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
			<DownloadCenter />
            <Section title="upload new files" className="mt-2" innerClassName="px-2">
                <input id="file_input" type={'file'}
                    className="mt-1"
                />
                <StyledDiv
                    onClick={upload_files}
                    className="w-fit mt-4 text-lg"
                >
                upload selected files
                </StyledDiv>

            </Section>
		</div>
	);
}

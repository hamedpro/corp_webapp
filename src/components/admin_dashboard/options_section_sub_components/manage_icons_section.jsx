import { useEffect, useState } from 'react';
import { customAjax } from '../../../custom_ajax';
import Section from '../../section/comp'
export function ManageIconsSection() {
	function fetch_data() {
		
	}
	useEffect(fetch_data, [])

	function config_and_open_input(icon_type) {
		var common_input = document.getElementById('common_input')
		common_input.onchange = () => upload_icon(icon_type)
		common_input.click()
	}
	function upload_icon(icon_type) { 
		var common_input = document.getElementById('common_input')
		customAjax({
			params: {
				task_name: "upload_icon",
				icon_type
			},
			files :[common_input.files[0]]
		}).then(d => {
			alert('done')
			fetch_data()
		}, e => {
			alert('something went wrong')
			console.log(e)
		})
	}
	function del_icon(icon_type) {
		customAjax({
			params: {
				task_name: "delete_icon",
				icon_type //todo : rm -rf the written files when there is not any file name in custom upload of server.cjs
			}
		}).then(d => {
			alert('done')
			fetch_data()
		}, e => {
			alert('something went wrong')
			console.log(e)
		})
	}
	return (
		<>
			<input id="common_input" type="file" className="hidden" />
			<Section title="manage icons">
				<div className='flex flex-col items-start px-2'>
			<button onClick={()=>config_and_open_input("square")}>{ml({ en: "upload new square icon", fa: "بارگزاری آیکون مربع جدید" })}</button>
			<button onClick={()=>config_and_open_input("rectangle")}>{ml({ en: "upload new rectangle icon", fa: "بارگزاری آیکون مستطیل جدید" })}</button>
			<button onClick={()=>config_and_open_input("favicon")}>{ml({ en: "upload new favicon", fa: "ریز آیکون جدید" })}</button>
			<button onClick={()=>del_icon('square')}>{ml({ en: "delete square icon", fa: "حذف کردن آیکون مربع" })}</button>
			<button onClick={()=>del_icon('rectangle')}>{ml({ en: "delete rectangle icon", fa: "حذف کردن آیکون مستطیل" })}</button>
			<button onClick={()=>del_icon('favicon')}>{ml({ en: "delete favicon", fa: "حذف کردن ریز آیکون" })}</button>
			</div>
			</Section>
		</>
			
	);
}

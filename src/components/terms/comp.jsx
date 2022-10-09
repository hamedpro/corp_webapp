import { useState } from "react";
import Section from "../section/comp";
import { customAjax } from "../../custom_ajax";
import { useEffect } from "react";
import { Loading } from "../loading/comp";
import { Alert } from "../alert/comp";
import { Info } from "@mui/icons-material";
export default () => {
	var [terms, set_terms] = useState(null)
	function fetch_data() {
		customAjax({
			params: {
				task_name :"get_terms"
			}
		}).then(data => {
			set_terms(data.result)
		}, error => {
			alert('something went wrong')
			console.log(error)
		})
	}
	useEffect(fetch_data,[])
	return (
		<Section title="terms of use" className="mx-1" innerClassName="px-2">
			{terms === null && (
				<Loading />
			)}
			{terms !== null && terms.length === 0 && (
				<Alert icon={<Info />}>there is not any terms added by admins</Alert>
			)}
			{terms !== null && terms.length !== 0 && (
				terms.map(term => {
					return (
						<p>#{term.id} : {term.title} : {term.text}</p>
					)
				})
			)}
		</Section>
	);
};


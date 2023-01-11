import React from "react";
import { useParams } from "react-router-dom";

export const Writing = () => {
	var { writing_id } = useParams();
	return (
		<div>
			<h1>Writing {writing_id}</h1>
		</div>
	);
};

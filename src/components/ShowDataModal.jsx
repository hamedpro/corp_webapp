import React from "react";

export const ShowDataModal = (props) => {
	if (props.visibility == true) {
		return (
			<div>
				<h1>{props.title}</h1>
				<hr />
				<div>{props.children}</div>
			</div>
		);
	} else {
		return <></>;
	}
};

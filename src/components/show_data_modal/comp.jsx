import React from "react";

const ShowDataModal = (props) => {
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

export default ShowDataModal;

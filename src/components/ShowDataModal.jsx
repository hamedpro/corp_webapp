import React from "react";

export const ShowDataModal = ({ visibility, title, children }) => {
	if (visibility == true) {
		return (
			<div>
				<h1>{title}</h1>
				<hr />
				<div>{children}</div>
			</div>
		);
	} else {
		return <></>;
	}
};

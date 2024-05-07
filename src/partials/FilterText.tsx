import React from "react";
import { Link } from "react-router-dom";

export const FilterText = ({ label, count }: { label: string; count: string }) => {
	return (
		<li className="mb-2">
			<Link
				className="text-decoration-none text-body text-secondary-hover transition-all d-flex justify-content-between align-items-center"
				to="#"
			>
				<span>
					<i className="ri-arrow-right-s-line align-bottom ms-n1"></i> {label}
				</span>{" "}
				{count && <span className="text-muted ms-4">({count})</span>}
			</Link>
		</li>
	);
};

import React from "react";

export const FilterPrice = () => {
	return (
		<>
			<div className="filter-price mt-6"></div>
			<div className="d-flex justify-content-between align-items-center mt-7">
				<div className="input-group mb-0 me-2 border">
					<span className="input-group-text bg-transparent fs-7 p-2 text-muted border-0">
						$
					</span>
					<input
						type="number"
						min="00"
						max="1000"
						step="1"
						className="filter-min form-control-sm border flex-grow-1 text-muted border-0"
					/>
				</div>
				<div className="input-group mb-0 ms-2 border">
					<span className="input-group-text bg-transparent fs-7 p-2 text-muted border-0">
						$
					</span>
					<input
						type="number"
						min="00"
						max="1000"
						step="1"
						className="filter-max form-control-sm flex-grow-1 text-muted border-0"
					/>
				</div>
			</div>
		</>
	);
};

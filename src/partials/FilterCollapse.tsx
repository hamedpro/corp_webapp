import React from "react";
import filters_one from "../data/filters-one.json";
export const FilterCollapse = () => {
	return (
		<div className="row gx-5">
			<div className="col-4 widget-filter-price">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Price</p>
				{/* {{> filters/filter-price }} */}
			</div>

			<div className="col-4">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Sizes</p>
				<div>
					<div className="filter-options mt-3">
						{filters_one.sizes.map((i) => {
							return null;
							/*  {{> filters/filter-checkbox-two this type="sizes" }} */
						})}
					</div>
				</div>
			</div>

			<div className="col-4">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Colour</p>
				<div>
					<div className="filter-options mt-3">
						{filters_one.colours.map((i) => {
							return null;
							/*  {{> filters/filter-colour this type="colours" }} */
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

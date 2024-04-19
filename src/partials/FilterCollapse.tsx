import React from "react";
import filters_one from "../data/filters-one.json";
import { FilterPrice } from "./FilterPrice";
import { FilterCheckbox } from "./FilterCheckbox";
import { FilterCheckboxTwo } from "./FilterCheckboxTwo";
import { FilterColour } from "./FilterColour";
export const FilterCollapse = () => {
	return (
		<div className="row gx-5">
			<div className="col-4 widget-filter-price">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Price</p>
				{/* {{> filters/filter-price }} */}
				<FilterPrice />
			</div>

			<div className="col-4">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Sizes</p>
				<div>
					<div className="filter-options mt-3">
						{filters_one.sizes.map((i, index) => {
							return (
								<FilterCheckboxTwo
									{...i}
									type="sizes"
									index={index}
									key={index}
								/>
							);
							/*  {{> filters/filter-checkbox-two this type="sizes" }} */
						})}
					</div>
				</div>
			</div>

			<div className="col-4">
				<p className="small fs-6 fw-bolder border-bottom pb-3 mb-4">Colour</p>
				<div>
					<div className="filter-options mt-3">
						{filters_one.colours.map((i, index) => {
							return (
								<FilterColour
									{...i}
									type="colurs"
									key={index}
									index={index}
								/>
							);
							/*  {{> filters/filter-colour this type="colours" }} */
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

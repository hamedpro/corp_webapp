import filters_one from "../data/filters-one.json";
import { FilterCheckbox } from "./FilterCheckbox";
import { FilterCheckboxTwo } from "./FilterCheckboxTwo";
import { FilterColour } from "./FilterColour";
import { FilterPrice } from "./FilterPrice";
import { FilterText } from "./FilterText";
export const AsideMenuOne = () => {
	return (
		<aside>
			{filters_one.categories && (
				<div className="mb-4">
					<h2 className="mb-4 fs-6 mt-2 fw-bolder">Jacket Category</h2>
					<nav>
						<ul className="list-unstyled list-default-text">
							{filters_one.categories.map((i, index) => (
								<FilterText
									{...i}
									key={index}
								/>
							))}
						</ul>
					</nav>
				</div>
			)}

			<div className="py-4 widget-filter widget-filter-price border-top">
				<a
					className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
					data-bs-toggle="collapse"
					href="#filter-price"
					role="button"
					aria-expanded="true"
					aria-controls="filter-price"
				>
					Price
				</a>
				<div
					id="filter-price"
					className="collapse show"
				>
					<FilterPrice />
				</div>
			</div>

			{filters_one.brands && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-brands"
						role="button"
						aria-expanded="true"
						aria-controls="filter-brands"
					>
						Brands
					</a>
					<div
						id="filter-brands"
						className="collapse show"
					>
						<div className="input-group my-3 py-1">
							<input
								type="text"
								className="form-control py-2 filter-search rounded"
								placeholder="Search"
								aria-label="Search"
							/>
							<span className="input-group-text bg-transparent px-2 position-absolute top-7 end-0 border-0 z-index-20">
								<i className="ri-search-2-line text-muted"></i>
							</span>
						</div>
						<div className="simplebar-wrapper">
							<div
								className="filter-options"
								data-pixr-simplebar
							>
								{filters_one.brands.map((i, index) => {
									return (
										<FilterCheckbox
											key={index}
											{...i}
											type="brand"
											index={index}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}

			{filters_one.type && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-type"
						role="button"
						aria-expanded="true"
						aria-controls="filter-type"
					>
						Type
					</a>
					<div
						id="filter-type"
						className="collapse show"
					>
						<div className="input-group my-3 py-1">
							<input
								type="text"
								className="form-control py-2 filter-search rounded"
								placeholder="Search"
								aria-label="Search"
							/>
							<span className="input-group-text bg-transparent px-2 position-absolute top-7 end-0 border-0 z-index-20">
								<i className="ri-search-2-line text-muted"></i>
							</span>
						</div>
						<div className="filter-options">
							{filters_one.type.map((i, index) => {
								return (
									<FilterCheckbox
										{...i}
										type="brand"
										index={index}
										key={index}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{filters_one.sizes && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-sizes"
						role="button"
						aria-expanded="true"
						aria-controls="filter-sizes"
					>
						Sizes
					</a>
					<div
						id="filter-sizes"
						className="collapse show"
					>
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
							})}
						</div>
					</div>
				</div>
			)}

			{filters_one.colours && (
				<div className="py-4 widget-filter border-top">
					<a
						className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron"
						data-bs-toggle="collapse"
						href="#filter-colour"
						role="button"
						aria-expanded="true"
						aria-controls="filter-colour"
					>
						Colour
					</a>
					<div
						id="filter-colour"
						className="collapse show"
					>
						<div className="filter-options mt-3">
							{filters_one.colours.map((i, index) => {
								return (
									<FilterColour
										{...i}
										key={index}
										type="colours"
										index={index}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</aside>
	);
};

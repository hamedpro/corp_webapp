import { ArrowBackIosRounded, Cancel, InfoRounded } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Modal from "../Modal/Modal.jsx";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { clone_simple_object } from "../../common";
import { multi_lang_helper as ml } from "../../common";
import { ArrowTitle } from "../ArrowTitle.jsx";
export function FilteringModal({
	open,
	hideFn,
	filterOptions,
	setFilterOptions,
	default_filter_options,
}) {
	function apply_maximum_price_filter() {
		var cloned_state = clone_simple_object(filterOptions);
		var entered_price = Number(document.getElementById("maximum_price_input").value);
		setFilterOptions({
			...cloned_state,
			maximumPrice: entered_price,
		});
	}
	function apply_minimum_price_filter() {
		var cloned_state = clone_simple_object(filterOptions);
		var entered_price = Number(document.getElementById("minimum_price_input").value);
		setFilterOptions({
			...cloned_state,
			minimumPrice: entered_price,
		});
	}
	return (
		<Modal type="type1" className={"h-2/3 bg-sky-800"} is_visible={open} hideFn={hideFn}>
			<ArrowTitle title={ml({
						en: "filtering results",
						fa: "فیلتر کردن نتایج",
					})} onClick={hideFn} />
			<Section
				title={ml({
					en: "current filters",
					fa: "فیلتر های فعال",
				})}
				className="mt-4 mx-2 mb-2"
			>
				<div className="flex m-3 mb-0 flex-col">
					{Object.keys(filterOptions).filter(
						(filterOptionKey) =>
							filterOptions[filterOptionKey] !==
							default_filter_options[filterOptionKey]
					).length == 0 ? (
						<Alert icon={<InfoRounded sx={{ color: "white" }} />}>
							{ml({
								en: "there is not currently any filter set",
								fa: "هیچ فیلتری فعال نشده است",
							})}
						</Alert>
					) : null}
					{Object.keys(filterOptions)
						.filter(
							(filterOptionKey) =>
								filterOptions[filterOptionKey] !==
								default_filter_options[filterOptionKey]
						)
						.map((filterOptionKey, index) => {
							return (
								<div
									key={index}
									className="flex shrink-0 bg-blue-600 p-1 rounded items-center space-x-1 mb-2"
								>
									<Cancel
										sx={{ color: "white" }}
										fontSize="small"
										onClick={() => {
											var new_state = { ...filterOptions };
											new_state[filterOptionKey] =
												default_filter_options[filterOptionKey];
											setFilterOptions(new_state);
										}}
										className="cursor-pointer"
									/>
									<span className="text-white text-sm">
										{filterOptionKey} :{" "}
										{typeof filterOptions[filterOptionKey] == "boolean"
											? "true"
												? filterOptions[filterOptionKey]
												: "false"
											: filterOptions[filterOptionKey]}
									</span>
								</div>
							);
						})}
				</div>
			</Section>
			<Section title={ml({ en: "change filters", fa: "تغییر فیلتر ها" })} className="mx-2 mb-2">
				<div className="flex px-2 flex-col">
					<h1 className="text-white">
						{ml({
							en: "minimum price:",
							fa: "حداقل قیمت:",
						})}
					</h1>
					<div className="flex space-x-2 my-1 mb-2">
						<input className="w-1/2 rounded px-1" id="minimum_price_input" />
						<button
							className="text-white border border-stone-400 px-1 rounded"
							onClick={apply_minimum_price_filter}
						>
							{ml({
								en: "apply",
								fa: "تایید",
							})}
						</button>
					</div>

					<h1 className="text-white">
						{ml({
							en: "maximum price:",
							fa: "حداکثر قیمت :",
						})}
					</h1>
					<div className="flex space-x-2 my-1 mb-2">
						<input className="w-1/2 rounded px-1" id="maximum_price_input" />
						<button
							className="text-white border border-stone-400 px-1 rounded"
							onClick={apply_maximum_price_filter}
						>
							{ml({
								en: "apply",
								fa: "تایید",
							})}
						</button>
					</div>

					<div className="flex items-center">
						<Checkbox
							checked={filterOptions["just_with_image"]}
							onChange={() =>
								setFilterOptions({
									...filterOptions,
									just_with_image: !filterOptions["just_with_image"],
								})
							}
							sx={{color:"white"}}
						/>
						<h1 className="text-white">
							{ml({
								en: "just show products with image",
								fa: "فقط محصولات عکس دار",
							})}
						</h1>
					</div>
				</div>
			</Section>
		</Modal>
	);
}

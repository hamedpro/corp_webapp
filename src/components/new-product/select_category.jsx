import { CircleOutlined, CircleRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { customAjax } from "../../custom_ajax";

export function SelectCategory({
	set_category,
	category,
	select_category_tab,
	set_select_category_tab,
}) {
	var [current_categories, set_current_categories] = useState(null);

	function CustomInput({ id, onChange, placeholder }) {
		return (
			<input
				id={id}
				onChange={onChange}
				className="border border-green-400 rounded px-2 py-1"
				placeholder={placeholder ? placeholder : ""}
			/>
		);
	}
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				var tmp = [];
				var tmp = data.result.map((product) => {
					return product.category;
				});
				tmp = [...new Set(tmp)];
				set_current_categories(tmp);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<div className="mt-2">
			<>
				<p className="text-xl">
					{ml({
						en: "select category:",
						fa: "انتخاب دسته بندی کالا:",
					})}
				</p>
				<div className="w-fit border border-blue-400 rounded flex text-sm mb-2">
					<div
						className={
							"hover:bg-blue-700 hover:text-white border-r border-stone-400 p-1 flex justify-center items-center cursor-pointer" +
							(select_category_tab == "existing" ? " bg-blue-600 text-white" : "")
						}
						onClick={() => {
							set_select_category_tab("existing");
							fetch_data();
						}}
					>
						{ml({
							en: "select from existing categories",
							fa: "انتخاب دسته بندی از دسته بندی های موجود",
						})}
					</div>
					<div
						className={
							"hover:bg-blue-700 hover:text-white p-1 flex justify-center items-center cursor-pointer" +
							(select_category_tab == "new" ? " bg-blue-600 text-white" : "")
						}
						onClick={() => set_select_category_tab("new")}
					>
						{ml({
							en: "create a new category",
							fa: "ساختن دسته بندی جدید",
						})}
					</div>
				</div>
			</>

			{select_category_tab == "existing" && (
				<>
					{current_categories === null ? (
						<h1>
							{ml({
								en: "loading ...",
								fa: "در حال بارگزاری ...",
							})}
						</h1>
					) : (
						<>
							{current_categories.length !== 0 ? (
								<div className="mt-1 flex flex-col space-y-1">
									{current_categories.map((cat, index) => {
										return (
											<div
												key={index}
												className="flex space-x-1"
												onClick={() => set_category(cat)}
											>
												{cat == category ? (
													<CircleRounded />
												) : (
													<CircleOutlined />
												)}
												<p>{cat}</p>
											</div>
										);
									})}
								</div>
							) : (
								<>
									<h1>
										{ml({
											en: "there is not any product category set",
											fa: "هنوز هیچ دسته بندی کالایی ثبت نشده است",
										})}
									</h1>
									<p>
										{ml({
											en: "you should create a new one",
											fa: "شما باید یک دسته بندی جدید درست کنید",
										})}
									</p>
								</>
							)}
						</>
					)}
				</>
			)}

			{select_category_tab == "new" && (
				<>
					<CustomInput
						id="new_category_input"
						placeholder={ml({
							en: "enter category name here...",
							fa: "نام دسته بندی جدید خود را وارد کنید...",
						})}
					/>
				</>
			)}
		</div>
	);
}

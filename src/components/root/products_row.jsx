import React from "react";
import { Loading } from "../loading/comp";
import ProductItem from "../products/product_item";
import { multi_lang_helper as ml } from "../../common";
import { useNavigate } from "react-router-dom";
export function ProductsRow({ products, icon, title, className = "" }) {
	var nav = useNavigate();
	return (
		<>
			{products === null ? (
				<Loading />
			) : (
				<div
					className={["flex bg-gray-100 mt-1  text-white flex-col p-2", className].join(
						" "
					)}
				>
					<div className="flex justify-between text-lg">
						<h1 className="text-gray-700">محصولات ما</h1>
						<h1
							className="underline cursor-pointer text-gray-700"
							onClick={() => nav("/products")}
						>
							مشاهده همه محصولات
						</h1>
					</div>
					<div className="w-full p-4 flex  overflow-x-auto">
						{products.length == 0 ? (
							<div className="h-full w-fit">
								<h1>
									{ml({
										en: "there is not any product with this specification",
										fa: "هیچ کالایی با این مشخصات پیدا نشد",
									})}
								</h1>
							</div>
						) : (
							<>
								{products.map((product, index) => {
									return (
										<React.Fragment key={index}>
											<ProductItem
												id={product.id}
												name={product.name}
												price={product.price}
												className={
													"overflow-hidden bg-blue-300 text-black " +
													(index == 0 ? "rounded-r-xl" : "") +
													(index == products.length - 1
														? "rounded-l-xl"
														: "")
												}
												description={product.description}
											/>
										</React.Fragment>
									);
								})}
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}

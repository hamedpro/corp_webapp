import React from "react";
import { Loading } from "../loading/comp";
import ProductItem from "../products/product_item";
import { multi_lang_helper as ml } from "../../common";
export function ProductsRow({ products, icon, title ,className=""}) {
	return (
		<>
			{products === null ? (
				<Loading />
			) : (
				<div className={["flex bg-sky-700 py-3 overflow-x-auto px-2 text-white",className].join(' ')}>
					<div className="flex flex-col justify-center px-5 items-center space-y-2">
						<div className="h-14 w-14 bg-white rounded-full flex justify-center items-center">
							{icon}
						</div>
							<h1>{title}</h1>
							
					</div>
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
												"w-1/2 md:1/4 overflow-hidden bg-blue-300 text-black " +
												(index == 0 ? "rounded-l-xl" : "") +
												(index == products.length - 1 ? "rounded-r-xl" : "")
											}
											discount_percent={product.discount_percent}
											description={product.description}
											category={product.category}
										/>
									</React.Fragment>
								);
							})}
						</>
					)}
				</div>
			)}
		</>
	);
}

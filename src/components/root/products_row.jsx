import React from "react";
import { Loading } from "../loading/comp";
import ProductItem from "../products/product_item";

export function ProductsRow({ products, icon, title }) {
	return (
		<>
			{products === null ? (
				<Loading />
			) : (
				<div className="flex bg-sky-200 rounded py-3 overflow-x-auto px-2">
					<div className="flex flex-col justify-center px-5 items-center space-y-2">
						<div className="h-14 w-14 bg-blue-500 rounded-full flex justify-center items-center">
							{icon}
						</div>
						<h1>{title}</h1>
					</div>
					{products.length == 0 ? (
						<div className="h-full w-fit">
							<h1>there is not any product with this specification</h1>
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
												"w-56 overflow-hidden " +
												(index == 0 ? "rounded-l-xl" : "") +
												(index == products.length - 1 ? "rounded-r-xl" : "")
											}
											discount_percent={product.discount_percent}
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

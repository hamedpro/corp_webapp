import { Button } from "@mui/material";
import { useState } from "react";

export default function AddToShoppingBagBar(props) {
	var [this_product_shopping_count,set_this_product_shopping_count] = useState(1)
	var button_class_name = "h-8 w-8 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-800 rounded"
	return (
		<div className="mt-3 realative bottom-0 w-full py-2 bg-blue-400 flex items-center px-2 z-30">
			<div className="w-2/5 flex flex-col text-sm">
				<p className="block">price:</p>
				<b className="block">
					{props.price + " "} <span className="inline">(Toman)</span>
				</b>
			</div>
			<div className="w-3/5">
				{this_product_shopping_count == 0 ? (
					<Button
						variant="contained"
						sx={{ width: "100%" }}
						onClick={() => {
							alert("this feature is under development");
						}}
					>
						add to shopping bag
					</Button>
				) : (
					<div className="flex w-full px-4 space-x-2 justify-end">
						<button className={button_class_name}>-</button>
						<div className="h-8 w-8 flex items-center justify-center">
							{this_product_shopping_count}
						</div>
						<button className={button_class_name}>+</button>
					</div>
				)}
			</div>
		</div>
	);
}

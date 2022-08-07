import { Button } from "@mui/material";
import { useState } from "react";

export default function FixedBarDown(props) {
	var [this_product_shopping_count, set_this_product_shopping_count] = useState(1);
	function SecondForm() {
		return (
			<div className="flex w-full px-4">
				<div className="w-4/12">
					<Button
						variant="contained"
						className="h-8 text-lg"
						sx={{ minHeight: 0, minWidth: 0, width: "100%" }}
					>
						-
					</Button>
				</div>

				<div className="w-4/12 h-8 rounded flex justify-center items-center">
					{this_product_shopping_count}
				</div>
				<div className="w-4/12">
					<Button
						variant="contained"
						className="h-8 text-lg"
						sx={{ minHeight: 0, minWidth: 0, width: "100%" }}
					>
						+
					</Button>
				</div>
			</div>
		);
	}
	return (
		<div className="fixed bottom-0 w-full h-14 bg-blue-400 flex items-center px-2 z-50">
			<div className="w-2/5 flex flex-col">
				<p className="block text-sm">price:</p>
				<b className="block">
					{props.price + " "} <span className="text-sm inline">(Toman)</span>
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
					<SecondForm />
				)}
			</div>
		</div>
	);
}

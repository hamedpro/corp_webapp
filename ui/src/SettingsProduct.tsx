import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products_collection_document } from "./types";
import { custom_axios } from "../helpers";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ToggleButton } from "primereact/togglebutton";
import { Button } from "primereact/button";

function ProductEditor({
	product,
	fetch_product,
}: {
	product: products_collection_document;
	fetch_product: () => Promise<void>;
}) {
	var [internal_product, set_internal_product] = useState(product);
	useEffect(() => {
		set_internal_product(product);
	}, [product]);
	async function update_product(patch: object) {
		await custom_axios({
			url: `/collections/products/${product.id}`,
			method: "put",
			data: patch,
		});
		await fetch_product();
	}
	return (
		<div className="flex gap-y-3 flex-col">
			<div className="flex items-center justify-between">
				<h1>ویرایش محصول {product.id}</h1>
				<Button
					disabled={JSON.stringify(product) === JSON.stringify(internal_product)}
					onClick={() =>
						update_product({
							name: internal_product.name,
							description: internal_product.description,
						})
					}
				>
					ذخیره
				</Button>
			</div>
			<p>نام محصول: </p>
			<InputText
				value={internal_product.name}
				onChange={(e) =>
					set_internal_product((prev) => ({ ...prev, name: e.target.value }))
				}
			/>
			<p>توضیحات محصول</p>
			<InputTextarea
				autoResize
				value={internal_product.description}
				onChange={(e) =>
					set_internal_product((prev) => ({ ...prev, description: e.target.value }))
				}
			/>
		</div>
	);
}
export const SettingsProduct = () => {
	var { product_id } = useParams();
	var [product, set_product] = useState<products_collection_document | undefined>();
	async function fetch_data() {
		var response = await custom_axios<products_collection_document[]>({
			url: "/collections/products",
		});
		var search_pointer = response.data.find((product) => product.id === product_id);
		if (search_pointer === undefined) throw new Error("could not find the product in database");
		set_product(search_pointer);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	if (product === undefined) return "product is not loaded yet";
	return (
		<div className="p-4">
			<ProductEditor
				product={product}
				fetch_product={fetch_data}
			/>
		</div>
	);
};

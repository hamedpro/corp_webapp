import React, { ChangeEventHandler, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { custom_axios, server_endpoint } from "../helpers";
import { products_collection_document } from "./types";
import { useNavigate } from "react-router-dom";

export const Products = () => {
	var navigate = useNavigate();
	const [query, setQuery] = useState("");
	var [products, set_products] = useState<products_collection_document[] | undefined>();
	async function fetch_data() {
		var response = await custom_axios<products_collection_document[]>({
			url: "/collections/products",
		});
		set_products(response.data);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	if (products === undefined) return "products collection is not loaded";

	const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
		setQuery(e.target.value);
	};

	let filteredProducts = products;
	if (query) {
		filteredProducts = products.filter((product) => {
			return (
				product.name.toLowerCase().includes(query.toLowerCase()) ||
				product.description.toLowerCase().includes(query.toLowerCase())
			);
		});
	}

	return (
		<div>
			<div className="p-4 gap-y-4 flex flex-col">
				<InputText
					value={query}
					onChange={handleSearch}
					placeholder="جستجو محصول"
				/>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
					className="text-neutral-600"
				>
					<span className="whitespace-nowrap">
						{query ? <span>در جستجوی "{query}"</span> : "نمایش همه موارد"}
					</span>
					<hr className="w-full bg-neutral-700 text-neutral-500 mx-4" />
					<span className="whitespace-nowrap">{filteredProducts.length} نتیجه</span>
				</div>
			</div>
			<div className="flex flex-wrap justify-start m-4 rounded-md">
				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 bg-neutral-50 hover:bg-neutral-200 transition cursor-pointer"
						onClick={() => navigate(`/products/${product.id}`)}
					>
						<div className="bg-white shadow-sm rounded p-4">
							{product.cover_images.length > 0 ? (
								<img
									src={`${server_endpoint}/files/${product.cover_images[0]}`}
									alt={product.name}
									className="w-full h-48 object-cover rounded-t"
								/>
							) : (
								<div className="flex justify-center h-48">
									<i className="bi bi-image-x text-4xl text-gray-400" />
								</div>
							)}
							<h2 className="text-lg font-bold text-neutral-700">{product.name}</h2>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

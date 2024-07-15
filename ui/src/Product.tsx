import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { custom_axios, server_endpoint } from "../helpers";
import { products_collection_document } from "./types";
import ReactImageGallery from "react-image-gallery";

export const Product = () => {
	const { product_id } = useParams();
	const [products, setProducts] = useState<products_collection_document[] | undefined>();

	useEffect(() => {
		async function fetchProducts() {
			const response = await custom_axios<products_collection_document[]>({
				url: "/collections/products",
			});
			setProducts(response.data);
		}
		fetchProducts();
	}, []);
	if (products === undefined) return "products collection is not loaded";
	const product = products.find((product) => product.id === product_id);

	if (!product) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<h2 className="text-2xl font-bold text-red-500">Error 404: Product not found</h2>
				<p className="text-lg text-gray-500">
					Sorry, the product you are looking for does not exist.
				</p>
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="border border-solid border-neutral-300 p-4">
				<ReactImageGallery
					items={product.cover_images.map((imageId, index) => ({
						original: `${server_endpoint}/files/${imageId}`,
						thumbnail: `${server_endpoint}/files/${imageId}`,
					}))}
					thumbnailPosition="right"
				/>
			</div>
			<h2 className="text-2xl font-bold">{product.name}</h2>
			<p className="text-lg">{product.description}</p>
		</div>
	);
};

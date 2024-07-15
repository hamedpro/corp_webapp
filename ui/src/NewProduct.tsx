import React, { useState } from "react";
import { custom_axios } from "../helpers";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import ImageGallery from "react-image-gallery";
export const NewProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [coverImages, setCoverImages] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);

	const handleNameChange = (value: string) => {
		setName(value);
	};

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const handleCoverImageChange = (files: FileList) => {
		for (const file of files) {
			setCoverImages((prev) => [...prev, file]);
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUpload = async () => {
		var new_assets = [];
		for (const file of coverImages) {
			var form = new FormData();
			form.append("file", file);
			var { asset_id, filename }: { asset_id: number; filename: string } = (
				await custom_axios({
					url: "/files",
					method: "post",
					data: form,
				})
			).data;
			new_assets.push(asset_id);
		}
		try {
			await custom_axios({
				method: "post",
				url: "/collections/products",
				data: { name, description, cover_images: new_assets },
			});
		} catch (error) {
			console.error(error);
		}
		alert("done");
	};
	return (
		<div className="container py-2 px-4 flex flex-col gap-y-3">
			<h2>محصول جدید</h2>

			<label>نام محصول:</label>

			<InputText
				type="text"
				value={name}
				onChange={(e) => handleNameChange(e.target.value)}
			/>

			<label>توضیحات محصول:</label>

			<InputTextarea
				autoResize
				value={description}
				onChange={(e) => handleDescriptionChange(e.target.value)}
			/>
			<div className="flex w-100 items-center justify-between">
				<label>تصاویر محصول:</label>
				<Button
					size="small"
					onClick={() => document.getElementById("file_input")?.click()}
				>
					عکس جدید
				</Button>
				<input
					className="hidden"
					id="file_input"
					type="file"
					accept="image/*"
					multiple
					onChange={(e) => {
						if (e.target.files !== null) {
							handleCoverImageChange(e.target.files);
						}
					}}
				/>
			</div>
			{imagePreviews.length === 0 ? (
				<div className="w-100 border border-solid border-neutral-700 h-32 flex items-center justify-center flex-col">
					<h1>هیچ عکسی انتخاب نشده است</h1>
					<p className="text-neutral-500">حداقل یک عکس باید انتخاب شده باشد</p>
				</div>
			) : (
				<div className="p-4 border border-neutral-700 border-solid">
					<ImageGallery
						items={imagePreviews.map((i) => ({ original: i, thumbnail: i }))}
					/>
				</div>
			)}

			<Button
				onClick={handleUpload}
				className="w-fit"
				disabled={imagePreviews.length === 0}
			>
				ثبت محصول جدید
			</Button>
		</div>
	);
};

import React, { useState } from "react";
import { custom_axios } from "../helpers";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Message } from "primereact/message";
import ImageGallery from "react-image-gallery";

export const NewProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [coverImages, setCoverImages] = useState<any[]>([]);

	const handleNameChange = (value: string) => {
		setName(value);
	};

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const handleCoverImageChange = async (files: FileList) => {
		for (const file of files) {
			const reader = new FileReader();
			reader.onload = () => {
				const newImage = {
					status: "uploading",
					file,
					progress: 0,
					preview: reader.result as string,
				};
				setCoverImages((prev) => [...prev, newImage]);

				uploadImage(newImage);
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadImage = async (image: any) => {
		const form = new FormData();
		form.append("file", image.file);

		try {
			const { data } = await custom_axios.post("/files", form, {
				onUploadProgress: (progressEvent) => {
					if (progressEvent.total === undefined)
						throw new Error("progressEvent.total was undefined");
					const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setCoverImages((prevImages) =>
						prevImages.map((img) =>
							img.file === image.file ? { ...img, progress } : img
						)
					);
				},
			});

			const { asset_id } = data;

			setCoverImages((prevImages) =>
				prevImages.map((img) =>
					img.file === image.file ? { ...img, status: "uploaded", asset_id } : img
				)
			);
		} catch (error) {
			console.error("خطا در آپلود فایل:", error);
		}
	};

	const handleUpload = async () => {
		const newAssets = coverImages
			.filter((img) => img.status === "uploaded")
			.map((img) => img.asset_id);

		try {
			await custom_axios.post("/collections/products", {
				name,
				description,
				cover_images: newAssets,
			});
			alert("محصول با موفقیت ثبت شد");
		} catch (error) {
			console.error("خطا در ثبت محصول:", error);
		}
	};

	const isUploading = coverImages.some((img) => img.status === "uploading");

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

			{coverImages.length === 0 ? (
				<div className="w-100 border border-solid border-neutral-700 h-32 flex items-center justify-center flex-col">
					<h1>هیچ عکسی انتخاب نشده است</h1>
					<p className="text-neutral-500">حداقل یک عکس باید انتخاب شده باشد</p>
				</div>
			) : (
				<div className="p-4 border border-neutral-700 border-solid">
					<ImageGallery
						items={coverImages.map((i) => ({
							original: i.preview,
							thumbnail: i.preview,
						}))}
					/>
				</div>
			)}

			{coverImages.some((img) => img.status === "uploading") && (
				<div className="my-4">
					{coverImages.map((item, index) =>
						item.status === "uploading" ? (
							<div
								key={index}
								className="my-2"
							>
								<p>
									{item.file.name} ({(item.file.size / 1024).toFixed(2)} KB)
								</p>
								<ProgressBar value={item.progress} />
							</div>
						) : null
					)}
				</div>
			)}

			{isUploading && (
				<Message
					severity="info"
					text="در حال آپلود تصاویر، لطفا صبر کنید..."
				/>
			)}

			<Button
				onClick={handleUpload}
				className="w-fit"
				disabled={isUploading || coverImages.length === 0}
			>
				ثبت محصول جدید
			</Button>
		</div>
	);
};

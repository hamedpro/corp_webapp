import { Link } from "react-router-dom";
import { useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import nice_blue_gradient_bg from "./assets/nice-blue-gradient-bg.avif";
import { custom_axios, deep_copy, roundDownToNDigits } from "../helpers";
import { downloadables_collection_document } from "./types";

export const NewFile = () => {
	var [queue, set_queue] = useState<
		{
			filename: string;
			status:
				| { value: "done"; asset_id: number }
				| { value: "uploading_process"; percentage: number }
				| { value: "error"; message: string };
		}[]
	>([]);
	async function upload(file: File): Promise<void> {
		var form = new FormData();
		form.append("file", file);
		set_queue((prev) => {
			var clone = deep_copy(prev);
			return [
				...clone,
				{ filename: file.name, status: { value: "uploading_process", percentage: 0 } },
			];
		});
		try {
			var response = (
				await custom_axios({
					url: "/files",
					method: "post",
					data: form,
					onUploadProgress: (e) => {
						set_queue((prev) => {
							var clone = deep_copy(prev);
							var search_pointer = clone.find(
								(queue_item) => queue_item.filename === file.name
							);
							if (search_pointer === undefined) throw new Error();
							if (e.progress === undefined)
								throw new Error("e.progress === undefined");
							search_pointer.status = {
								value: "uploading_process",
								percentage: e.progress * 100,
							};
							return clone;
						});
					},
				})
			).data;
		} catch (error) {
			set_queue((prev) => {
				var clone = deep_copy(prev);
				var pointer = clone.find((queue_item) => queue_item.filename === file.name);
				if (pointer === undefined) throw new Error();
				pointer.status = { value: "error", message: "متاسفانه خطایی رخ داد" };
				return clone;
			});
		}
		var { asset_id, filename }: { asset_id: number; filename: string } = response;
		var new_downloadable: Omit<downloadables_collection_document, "id"> = {
			file_id: asset_id,
			name: filename,
			category: "-",
		};
		await custom_axios({
			url: "/collections/downloadables",
			data: new_downloadable,
			method: "post",
		});
		set_queue((prev) => {
			var clone = deep_copy(prev);
			var pointer = clone.find((queue_item) => queue_item.filename === file.name);
			if (pointer === undefined) throw new Error();
			pointer.status = { value: "done", asset_id };
			return clone;
		});
	}
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		for (const file of files) {
			upload(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				backgroundImage: `url(${nice_blue_gradient_bg})`,
				padding: "0px 12px",
				overflowY: "auto",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginBottom: "36px",
				}}
			>
				<h1
					style={{ margin: "36px 0px 12px 0px", fontSize: "46px", textAlign: "center" }}
					className="text-neutral-800"
				>
					آپلود فایل جدید
				</h1>
				<p
					className="text-neutral-500"
					style={{
						maxWidth: "530px",
						textAlign: "center",
						fontSize: "20px",
						margin: "6px 0px 32px 0px",
					}}
				>
					پس از اتمام بارگذاری فایل میتوانید نام و دسته بندی فایل بارگذاری شده را ویرایش
					کنید
				</p>
				<div
					style={{
						width: "100%",
						background: "white",
						borderRadius: "8px",
						padding: "8px",
					}}
				>
					<input
						multiple
						type="file"
						id="file_input"
						style={{ display: "none" }}
						onChange={(e) => {
							if (e.target.files !== null) {
								for (const file of e.target.files) {
									upload(file);
								}
							}
						}}
					/>
					<div
						style={{
							width: "100%",
							height: "100%",
							padding: "48px 12px 0px 12px",
							borderWidth: "1px",
							borderStyle: "dashed",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: "8px",
							transition: "200ms",
							background: "rgba(0, 0, 0, 0.02)",
							flexDirection: "column",
						}}
						className="border-neutral-300 hover:border-blue-500 cursor-pointer"
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onClick={() => document.getElementById("file_input")?.click()}
					>
						<i
							className="bi bi-folder2-open text-blue-500"
							style={{ fontSize: "48px" }}
						/>
						<p
							style={{ padding: "0px", marginTop: "8px", fontSize: "16px" }}
							className="text-neutral-700"
						>
							بکشید و رها کنید
						</p>
						<div
							style={{
								width: "100%",
								display: "flex",
								marginTop: "24px",
								marginBottom: "8px",
								justifyContent: "space-between",
							}}
						>
							<span
								style={{ fontSize: "12px" }}
								className="text-blue-500 hover:text-blue-700 cursor-pointer"
							>
								جستجو در رایانه
							</span>
							<span
								style={{ fontSize: "12px" }}
								className="text-blue-500 hover:text-blue-700 cursor-pointer"
							>
								رسانه پشتیبانی شده: همه
							</span>
						</div>
					</div>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							rowGap: "12px",
							padding: "0px 6px",
						}}
					>
						{queue.map((queue_item, index, array) => (
							<div
								key={queue_item.filename}
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: "8px",
									minHeight: "32px",
									borderBottomWidth:
										index !== array.length - 1 &&
										queue_item.status.value !== "uploading_process"
											? "1px"
											: "none",
									borderBottomStyle:
										index !== array.length - 1 &&
										queue_item.status.value !== "uploading_process"
											? "solid"
											: "none",
									marginTop: index === 0 ? "12px" : "none",
								}}
								className="border-neutral-200"
							>
								{queue_item.status.value === "uploading_process" && (
									<>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												columnGap: "4px",
											}}
										>
											<i
												className="pi pi-spin pi-spinner"
												style={{
													marginRight: "6px",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											/>
											<span>
												{queue_item.filename} ({" "}
												{roundDownToNDigits(
													queue_item.status.percentage,
													2
												)}
												% )
											</span>
										</div>
										<ProgressBar
											showValue={false}
											value={queue_item.status.percentage}
											style={{ width: "100%", height: "1px" }}
										/>
									</>
								)}

								{queue_item.status.value === "done" && (
									<>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												columnGap: "4px",
												justifyContent: "space-between",
											}}
										>
											<div style={{ display: "flex" }}>
												<i
													className="bi bi-check2-all"
													style={{
														marginRight: "6px",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}
												/>
												<span>{queue_item.filename}</span>
											</div>
											<Link
												className="text-blue-500"
												to={`/settings/files/${queue_item.status.asset_id}`}
											>
												صفحه اطلاعات
											</Link>
										</div>
									</>
								)}
								{queue_item.status.value === "error" && (
									<>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												columnGap: "4px",
											}}
										>
											<i
												className="bi bi-exclamation-octagon"
												style={{
													marginRight: "6px",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											/>
											<span>{queue_item.filename}</span>
											<span>خطا: {queue_item.status.message}</span>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useState, ChangeEvent, useEffect, useDebugValue, useRef } from "react";
import { Message } from "primereact/message";
import { Checkbox } from "primereact/checkbox";
import { downloadables_collection_document } from "./types";
import { custom_axios, findUnique } from "../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const File = () => {
	var toast = useRef<Toast>(null);
	var nav = useNavigate();
	var [new_category, set_new_category] = useState<string>("");
	var { file_id } = useParams();
	var [downloadables, set_downloadables] = useState<
		downloadables_collection_document[] | undefined
	>();

	var [new_document, set_new_document] = useState<
		downloadables_collection_document | undefined
	>();

	async function fetch_data() {
		var response = await custom_axios<downloadables_collection_document[]>({
			url: "/collections/downloadables",
		});
		set_downloadables(response.data);
		var p = response.data.find((d) => d.file_id === Number(file_id));
		set_new_document(p);
	}
	async function put_new_document() {
		if (new_document === undefined)
			throw new Error("cant put new data: new_document state is not loaded");
		await custom_axios({
			url: `/collections/downloadables/${new_document.id}`,
			method: "put",
			data: {
				file_id: new_document.file_id,
				name: new_document.name,
				category: new_document.category,
				description: new_document.description,
			},
		});
		toast.current?.show({
			severity: "success",
			detail: "اطلاعات جدید با موفقیت ثبت شد",
		});
	}
	async function upload_new_category() {
		if (new_document === undefined)
			throw new Error("cant put new data: new_document state is not loaded");
		await custom_axios({
			url: `/collections/downloadables/${new_document.id}`,
			method: "put",
			data: {
				category: new_category,
			},
		});
		set_new_category("");
		await fetch_data();
	}
	async function delete_downloadable_item() {
		if (window.confirm("آیا از حذف این فایل اطمینان دارید؟") === false) return;
		if (new_document === undefined)
			throw new Error("cant put new data: new_document state is not loaded");
		await custom_axios({
			url: `/collections/downloadables/${new_document.id}`,
			method: "delete",
		});
		toast.current?.show({
			severity: "warn",
			detail: "با موفقیت حذف شد",
		});
		nav("/settings");
	}
	useEffect(() => {
		fetch_data();
	}, []);
	if (downloadables === undefined) return "downloadables collection is not loaded";
	if (new_document === undefined) return "new_document is not loaded";
	return (
		<>
			<Toast ref={toast} />
			<div style={{ padding: "0px 16px", display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						borderBottomWidth: "1px",
						borderBottomStyle: "solid",
						alignItems: "center",
						marginBottom: "18px",
					}}
					className="border-neutral-300"
				>
					<h1>فایل شماره {new_document.file_id}</h1>
					<Button
						severity="danger"
						onClick={delete_downloadable_item}
					>
						<i className="bi bi-trash" />
					</Button>
				</div>
				<p>
					در این بخش می توانید اطلاعات این فایل اعم از نام و دسته بندی آن را ویرایش کنید
				</p>
				<h3 style={{ margin: "8px 0px" }}>نام فایل</h3>
				<InputText
					style={{ width: "400px" }}
					onChange={(e) =>
						set_new_document((prev) => {
							if (prev === undefined)
								throw new Error(
									"at this point new_document state must not be undefined"
								);
							return {
								...prev,
								name: e.target.value,
							};
						})
					}
					value={new_document.name}
				/>
				<p
					className="text-neutral-500"
					style={{ marginTop: "8px" }}
				>
					فایل آپلودی شما با این نام نمایش داده خواهد شد
				</p>
				<h3 style={{ margin: "8px 0px" }}>توضیحات</h3>
				<InputText
					style={{ width: "400px" }}
					onChange={(e) =>
						set_new_document((prev) => {
							if (prev === undefined)
								throw new Error(
									"at this point new_document state must not be undefined"
								);
							return {
								...prev,
								description: e.target.value,
							};
						})
					}
					value={new_document.description}
				/>
				<p
					className="text-neutral-500"
					style={{ marginTop: "8px" }}
				>
					در صورت تمایل محتویات فایل را برای مشتری توضیح بدهید
				</p>

				<h3 style={{ margin: "8px 0px", alignItems: "center" }}>دسته بندی فایل</h3>
				<div style={{ display: "flex", columnGap: "16px", alignItems: "center" }}>
					<Dropdown
						style={{ width: "220px", alignItems: "center" }}
						value={new_document.category}
						options={findUnique(downloadables.map((d) => d.category)).map(
							(category) => ({
								label: category,
								value: category,
							})
						)}
						onChange={(e) =>
							set_new_document((prev) => {
								if (prev === undefined)
									throw new Error(
										"at this point new_document state must not be undefined"
									);
								return { ...prev, category: e.value };
							})
						}
						optionLabel="label"
						placeholder="انتخاب دسته بندی"
						checkmark={true}
					/>
				</div>
				{new_document.category === "-" && (
					<Message
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: "24px",
							maxWidth: "600px",
						}}
						pt={{
							icon: {
								style: {
									height: "30px",
									width: "30px",
									margin: "0px 20px 0px 12px",
								},
							},
						}}
						text="این فایل بارگذاری شده در هیچ دسته بندی ای قرار ندارد. برای دسترسی بهتر آن را در یکی از دسته بندی های موجود قرار دهید یا دسته بندی جدیدی ایجاد کنید"
					/>
				)}
				<h3 style={{ margin: "8px 0px" }}>دسته بندی جدید</h3>
				<div style={{ display: "flex", columnGap: "8px" }}>
					<InputText
						value={new_category}
						style={{ width: "220px" }}
						onChange={(e) => set_new_category(e.target.value)}
					/>
					<Button
						size="small"
						outlined
						onClick={upload_new_category}
					>
						<i
							className="bi bi-send-plus"
							style={{ transform: "scaleX(-1)" }}
						/>
					</Button>
				</div>
				<p
					className="text-neutral-500"
					style={{ marginTop: "8px" }}
				>
					اگر دسته بندی مورد نظر شما وجود ندارد با یک کلیک آن را ایجاد کنید
				</p>
				<div style={{ display: "flex", marginTop: "24px", columnGap: "8px" }}>
					<Button
						size="small"
						outlined
						onClick={() => nav("/settings/")}
					>
						بازگشت
					</Button>
					<Button
						size="small"
						onClick={put_new_document}
					>
						ثبت تغییرات
					</Button>
				</div>
			</div>
		</>
	);
};

import React, { useEffect, useState } from "react";
import { downloadables_collection_document } from "./types";
import { custom_axios, download_a_file } from "../helpers";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
export const DownloadablesTable = ({
	filter_category_name,
	super_user_options,
}: {
	filter_category_name?: string;
	super_user_options?: boolean;
}) => {
	var [downloadables, set_downloadables] = useState<
		downloadables_collection_document[] | undefined
	>();
	async function fetch_data() {
		var response = await custom_axios<downloadables_collection_document[]>({
			url: "/collections/downloadables",
		});
		//console.log(response.data);
		set_downloadables(response.data);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	if (downloadables === undefined) return "downloadables collection is not loaded";
	async function delete_downloadable_item(document_id: string) {
		if (window.confirm("آیا از حذف این فایل اطمینان دارید؟") === false) return;

		await custom_axios({
			url: `/collections/downloadables/${document_id}`,
			method: "delete",
		});
		alert("با موفقیت انجام شد");
		await fetch_data();
	}
	return (
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
				<h1>دانلود ها</h1>
			</div>
			<p>فایل های بارگذاری شده توسط مدیران سایت برای دانلود در این بخش نمایش داده می شوند</p>

			<DataTable
				emptyMessage="هیچ فایلی بارگذاری نشده است"
				style={{ marginTop: "28px" }}
				value={downloadables.filter((item) => {
					if (filter_category_name === undefined) return true;
					return item.category === filter_category_name;
				})}
			>
				<Column
					header="شناسه فایل"
					field="file_id"
				/>
				<Column
					header="نام فایل"
					field="name"
				/>
				<Column
					header="توضیحات فایل"
					field="description"
				/>
				<Column
					header="گزینه ها"
					body={(row) => (
						<div
							style={{ display: "flex" }}
							className="gap-x-1"
						>
							<Button
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								onClick={() => download_a_file(row.file_id)}
							>
								<i className="bi-cloud-download" />
							</Button>
							{super_user_options === true && (
								<Button
									severity="danger"
									onClick={() => delete_downloadable_item(row.id)}
								>
									<i className="bi bi-trash" />
								</Button>
							)}
						</div>
					)}
				/>
			</DataTable>
		</div>
	);
};

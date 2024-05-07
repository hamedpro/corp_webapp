import React, { useEffect, useState } from "react";
import { downloadables_collection_document } from "./types";
import { custom_axios, download_a_file } from "../helpers";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
export const Downloads = () => {
	var [downloadables, set_downloadables] = useState<
		downloadables_collection_document[] | undefined
	>();
	async function fetch_data() {
		var response = await custom_axios<downloadables_collection_document[]>({
			url: "/collections/downloadables",
		});
		set_downloadables(response.data);
	}
	useEffect(() => {
		fetch_data();
	}, []);

	if (downloadables === undefined) return "downloadables collection is not loaded";
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
				value={downloadables}
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
					body={(row) => (
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
					)}
				/>
			</DataTable>
		</div>
	);
};

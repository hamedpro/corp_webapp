import React, { useEffect, useState } from "react";
import { downloadables_collection_document, products_collection_document } from "./types";
import { custom_axios, download_a_file } from "../helpers";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate, useSearchParams } from "react-router-dom";
export const SettingsProducts = () => {
	var navigate = useNavigate();
	var [products, set_products] = useState<products_collection_document[] | undefined>();
	async function fetch_data() {
		var response = await custom_axios<products_collection_document[]>({
			url: "/collections/products",
		});
		//console.log(response.data);
		set_products(response.data);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	if (products === undefined) return "products collection is not loaded";
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
				<h1>محصولات</h1>
			</div>
			<p>برای ویرایش یا حذف هر کدام از محصول ها بر روی آن کلیک کنید</p>

			<DataTable
				emptyMessage="هیچ محصولی تاکنون ثبت نشده است"
				style={{ marginTop: "28px" }}
				value={products}
			>
				<Column
					header="شناسه محصول"
					field="id"
				/>
				<Column
					header="نام محصول"
					field="name"
				/>
				<Column
					header="خلاصه توضیح محصول"
					field="description"
					body={(row) =>
						row.description.length > 30
							? row.description.split("").slice(0, 30).join("") + "..."
							: row.description
					}
				/>
				<Column
					header="گزینه ها"
					body={(row) => (
						<div
							style={{ display: "flex" }}
							className="gap-x-1"
						>
							<Button
								severity="info"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								onClick={() => navigate(`/settings/products/${row.id}`)}
							>
								<i className="bi-pencil" />
							</Button>
						</div>
					)}
				/>
			</DataTable>
		</div>
	);
};

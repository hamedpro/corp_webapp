import React, { useEffect, useState } from "react";
import { products_collection_document } from "./types";
import { custom_axios } from "../helpers";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SettingsProducts = () => {
	const navigate = useNavigate();
	const [products, set_products] = useState<products_collection_document[] | undefined>();

	// Fetch products data
	async function fetch_data() {
		try {
			const response = await custom_axios<products_collection_document[]>({
				url: "/collections/products",
			});
			set_products(response.data);
		} catch (error) {
			console.error("Failed to fetch products:", error);
		}
	}

	// Delete a product
	const deleteProduct = async (id: string) => {
		try {
			await custom_axios({
				url: `/collections/products/${id}`,
				method: "DELETE",
			});
			await fetch_data();
			Swal.fire({
				icon: "success",
				title: "حذف شد!",
				text: "محصول با موفقیت حذف شد.",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "اوه!",
				text: "در هنگام حذف محصول مشکلی پیش آمد.",
			});
		}
	};

	useEffect(() => {
		fetch_data();
	}, []);

	if (products === undefined) return "لیست محصولات بارگذاری نشده است";

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
			<p>برای ویرایش یا حذف هر کدام از محصول‌ها بر روی آن کلیک کنید</p>

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
					header="گزینه‌ها"
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
							<Button
								severity="danger"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								onClick={() => {
									Swal.fire({
										title: "آیا مطمئن هستید؟",
										text: "این عمل قابل برگشت نیست!",
										icon: "warning",
										showCancelButton: true,
										confirmButtonColor: "#3085d6",
										cancelButtonColor: "#d33",
										confirmButtonText: "بله، حذف کن!",
										cancelButtonText: "انصراف",
									}).then((result) => {
										if (result.isConfirmed) {
											deleteProduct(row.id);
										}
									});
								}}
							>
								<i className="bi-trash" />
							</Button>
						</div>
					)}
				/>
			</DataTable>
		</div>
	);
};

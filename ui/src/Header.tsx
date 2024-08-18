import { MenuItem } from "primereact/menuitem";
import { useLocation, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { useEffect, useState } from "react";
import { custom_axios, findUnique } from "../helpers";
import { downloadables_collection_document } from "./types";

export const Header = () => {
	var [download_categories, set_download_categories] = useState<string[] | undefined>(undefined);
	var loc = useLocation();
	var nav = useNavigate();

	useEffect(() => {
		custom_axios<downloadables_collection_document[]>({
			url: "/collections/downloadables",
		}).then(
			(response) => {
				set_download_categories(findUnique(response.data.map((i) => i.category)));
			},
			(error) => {
				alert("something went wrong when loading download categories");
				console.error(error);
			}
		);
	}, []);
	if (download_categories === undefined) return "Loading download categories";
	var model: MenuItem[] = [
		{
			label: "صفحه اصلی",
			icon: (
				<i
					className="bi bi-house-heart"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav(`/`),
		},
		{
			label: "محصولات",
			icon: (
				<i
					className="bi bi-shop-window"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav("/products"),
		},
		{
			label: "کنترل اینترنتی",
			icon: (
				<i
					className="bi-sliders2"
					style={{ margin: "0px 4px" }}
				/>
			),
			items: [
				{
					label: "چیلر",
					icon: (
						<i
							className="bi bi-link"
							style={{ margin: "0px 4px" }}
						/>
					),
					command: () => window.location.assign("https://pishro-control.ir/chiller"),
				},
				{
					label: "داکت اسپلیت",
					icon: (
						<i
							className="bi bi-link"
							style={{ margin: "0px 4px" }}
						/>
					),
					command: () => window.location.assign("https://mpkchiller.com/duct"),
				},
				{
					label: "فن کوئل",
					icon: (
						<i
							className="bi bi-link"
							style={{ margin: "0px 4px" }}
						/>
					),
					command: () => window.location.assign("https://mpkchiller.com/dimmer"),
				},
				{
					label: "کولر آبی",
					icon: (
						<i
							className="bi bi-link"
							style={{ margin: "0px 4px" }}
						/>
					),
					command: () => window.location.assign("https://pishro-control.ir/cooler_hjm"),
				},
				{
					label: "پریز هوشمند",
					icon: (
						<i
							className="bi bi-link"
							style={{ margin: "0px 4px" }}
						/>
					),
					command: () =>
						window.location.assign("https://pishro-control.ir/timer_thermo3"),
				},
			],
		},
		{
			label: "درباره ما",
			icon: (
				<i
					className="pi pi-id-card"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav("/about-us"),
		},
		{
			label: "تماس با ما",
			icon: (
				<i
					className="pi pi-phone"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav("/contact-us"),
		},
		{
			label: "دانلود ها",
			icon: (
				<i
					className="bi bi-cloud-download"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav("/downloads"),
			items: download_categories.map((cat_name) => ({
				label: cat_name,
				icon: (
					<i
						className="bi bi-cloud-download"
						style={{ margin: "0px 4px" }}
					/>
				),
				command: () => nav(`/downloads?category_name=${cat_name}`),
			})),
		},
		{
			label: "تنظیمات",
			icon: (
				<i
					className="bi bi-gear-wide-connected"
					style={{ margin: "0px 4px" }}
				/>
			),
			command: () => nav("/settings"),
		},
	];
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-evenly",
				borderBottomWidth: "0px",
				borderBottomStyle: "solid",
			}}
			className="border-neutral-300 bg-neutral-100"
		>
			<Menubar
				start={
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<b>شرکت پیشرو کنترل وطن</b>
					</div>
				}
				model={model}
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderRadius: "0px",
				}}
			/>
		</div>
	);
};

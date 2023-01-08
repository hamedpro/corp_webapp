import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../image_slider/comp";
import { ProductsRow } from "./products_row";
import {
	Article,
	Business,
	ContactPage,
	Discount,
	Download,
	InfoRounded,
	Phone,
	Settings,
	SettingsApplications,
	Stars,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { multi_lang_helper as ml, shuffle } from "../../common";
export default function Root() {
	var [products, set_products] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	var suggested_products = () => (products === null ? null : shuffle(products).slice(0, 7));
	var nav = useNavigate();
	useEffect(fetch_data, []);
	return (
		<>
			<ProductsRow
				icon={<Stars sx={{ color: "darkblue" }} />}
				title="محصولات ما"
				products={suggested_products()}
			/>

			<div className="bg-sky-700 flex flex-row p-4 items-center h-full my-1">
				<div
					className="w-1/4 border-2 border-stone-500 rounded-lg flex justify-center items-center"
					style={{ aspectRatio: 1 }}
				>
					<Settings sx={{ width: "90%", height: "90%", color: "white" }} />
				</div>
				<div className="h-full text-white w-1/2 p-2">
					<h1 className="text-2xl">کنترل اینترنتی</h1>
					<p>در این بخش میتوانید فلان کار را بکنید</p>
					<p>در این بخش میتوانید فلان کار را بکنید</p>
					<button
						className="border border-stone-100 rounded px-2 my-2"
						onClick={() => window.location.assign("http://mpkchiller.com/dimmer")}
					>
						برو به کنترل اینترنتی
					</button>
				</div>
			</div>
			<div className="bg-sky-700 flex flex-row p-4 items-center h-full my-1">
				<div
					className="w-1/4 border-2 border-stone-500 rounded-lg flex justify-center items-center"
					style={{ aspectRatio: 1 }}
				>
					<Download sx={{ width: "90%", height: "90%", color: "white" }} />
				</div>
				<div className="h-full text-white w-1/2 p-2">
					<h1 className="text-2xl">بخش دانلود ها</h1>
					<p>
						در این بخش میتوانید فایل هایی که برای دانلود قرار داده شده اند را بارگیری
						کنید
					</p>
					<button
						className="border border-stone-100 rounded px-2 my-2"
						onClick={() => nav("/download-center")}
					>
						برو به بخش دانلود ها
					</button>
				</div>
			</div>

			<div className="bg-sky-700 flex flex-row p-4 items-center h-full my-1 overflow-x-auto">
				<div
					className=" shrink-0 w-1/4 border-2 border-stone-500 rounded-lg flex justify-center items-center flex-col"
					style={{ aspectRatio: 1 }}
				>
					<Article sx={{ width: "90%", height: "90%", color: "white" }} />
					<h1 className="text-white">مشاهده همه موارد...</h1>
				</div>
				<div className="shrink-0 h-full w-40 bg-white">rtetrw</div>
				<div className="shrink-0 h-full w-40 bg-white">rtetrw</div>
				<div className="shrink-0 h-full w-40 bg-white">rtetrw</div>
				<div className="shrink-0 h-full w-40 bg-white">rtetrw</div>
			</div>
			<div className="bg-sky-700 flex flex-row p-4 items-center h-full my-1">
				<div
					className="w-1/4 border-2 border-stone-500 rounded-lg flex justify-center items-center"
					style={{ aspectRatio: 1 }}
				>
					<Business sx={{ width: "90%", height: "90%", color: "white" }} />
				</div>
				<div className="h-full text-white w-1/2 p-2">
					<h1 className="text-2xl">درباره ما</h1>
					<p>توضیحات شرکت اینجا نمایش داده خواهد شد</p>
					<button
						className="border border-stone-100 rounded px-2 my-2"
						onClick={() => nav("/download-center")}
					>
						برو به درباره ما
					</button>
				</div>
			</div>

			<div className="bg-sky-700 flex flex-row p-4 items-center h-full my-1">
				<div
					className="w-1/4 border-2 border-stone-500 rounded-lg flex justify-center items-center"
					style={{ aspectRatio: 1 }}
				>
					<Phone sx={{ width: "90%", height: "90%", color: "white" }} />
				</div>
				<div className="h-full text-white w-1/2 p-2">
					<h1 className="text-2xl">تماس با ما</h1>
					<p>پل های ارتباطی ما را مشاهده کنید</p>
					<button
						className="border border-stone-100 rounded px-2 my-2"
						onClick={() => nav("/download-center")}
					>
						برو به تماس با ما
					</button>
				</div>
			</div>
		</>
	);
}

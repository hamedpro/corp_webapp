import { Link, useNavigate } from "react-router-dom";
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
import { gen_link_to_file, multi_lang_helper as ml, shuffle } from "../../common";
function Writings({ writings }) {
	var nav = useNavigate();
	var sorted_writings = writings.sort((i1, i2) => i1.publish_date < i2.publish_date);
	return (
		<div className="bg-sky-700 flex p-4 justify-center h-full my-1 overflow-x-auto flex-col">
			<div className="flex justify-between px-2 text-white">
				<h1>آخرین نوشته ها</h1>
				<Link to="/writings">مشاهده همه نوشته ها</Link>
			</div>
			<div className="w-full flex h-fit">
				{sorted_writings.length === 0 ? (
					`there is not anything to show. (count of all published writings : ${sorted_writings.length})`
				) : (
					<>
						<div
							className="bg-blue-900 w-1/3 mx-2 flex justify-center items-center relative text-white "
							style={{ aspectRatio: 1 }}
						>
							<img
								src={window.api_endpoint + "/" + sorted_writings[0].image_filename}
							/>
							<h1 className="absolute top-1/3">{sorted_writings[0].title}</h1>
							<p className="absolute top-1/2">
								{sorted_writings[0].publisher_username}
							</p>
						</div>
					</>
				)}
				<div className="flex flex-col w-2/3">
					{[1, 2, 3].map((number, index) => {
						var writing = sorted_writings[number];
						if (writing !== undefined) {
							return (
								<div
									key={index}
									className="w-full h-1/3 bg-red-00 text-white border border-blue-400 flex-row flex"
									onClick={() => nav(`/writings/${writing.id}`)}
								>
									<div className="h-20 bg-green-700 w-20 flex justify-center items-center">
										{" "}
										<img src={gen_link_to_file(writing.image_filename)} />
									</div>
									<h1>
										نوشته شماره {writing.id} : {writing.title}
									</h1>
								</div>
							);
						} else {
							return (
								<div key={index} className="w-full h-1/3 bg-red-800 text-white ">
									کلا {sorted_writings.length} نوشته منتشر شده است پس نوشته شماره
									{number + 1} ای برای نمایش وجود ندارد
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}
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
	var [writings, set_writings] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_table",
				table_name: "writings",
			},
		}).then((data) => set_writings(data.result), console.log);
	}, []);
	if (writings === null) return "loading ...";
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
			<Writings writings={writings} />
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

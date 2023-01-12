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
function CustomBlock({ title, info, button_text, button_onclick, Icon }) {
	return (
		<div className="bg-sky-700 flex p-4 items-center h-full my-1 justify-center flex-col">
			<div
				className="w-1/4 rounded-lg flex justify-center items-center"
				style={{ aspectRatio: 1 }}
			>
				<Icon sx={{ width: "90%", height: "90%", color: "white" }} />
			</div>
			<div className="h-full text-white w-1/2 p-2 text-center">
				<div>
					<h1 className="text-4xl mb-2">{title}</h1>
					<p className="mb-6 text-lg">{info}</p>
				</div>
				<button className="border rounded px-2 my-2 text-2xl" onClick={button_onclick}>
					{button_text}
				</button>
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
			<div className="w-full"></div>
			<CustomBlock
				Icon={Settings}
				button_text={"برو به کنترل اینترنتی"}
				title="کنترل اینترنتی"
				info={"برای تغییر مسیر به صفحه کنترل اینترنتی کلیک کنید"}
				button_onclick={() => window.location.assign("http://mpkchiller.com/dimmer")}
			/>

			<CustomBlock
				Icon={Download}
				button_text={"برو به بخش دانلود ها"}
				title="کنترل اینترنتی"
				info={"فایل های قابل بارگیری را از اینجا بارگیری کنید"}
				button_onclick={() => () => nav("/download-center")}
			/>

			<Writings writings={writings} />
			<CustomBlock
				Icon={Business}
				button_text={"برو به درباره ما"}
				title="درباره ما"
				info={"توضیحات شرکت اینجا نمایش داده خواهد شد"}
				button_onclick={() => () => nav("/about-us")}
			/>

			<CustomBlock
				Icon={Phone}
				button_text={"برو به تماس با ما"}
				title="تماس با ما"
				info={"پل های ارتباطی ما را مشاهده کنید"}
				button_onclick={() => () => nav("/contact-us")}
			/>
		</>
	);
}

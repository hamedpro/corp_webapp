import { Link, useNavigate } from "react-router-dom";
import { ProductsRow } from "./products_row";
import "./styles.css";
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
import { custom_axios } from "../../../api/client";
export function WritingRow({ publish_date, publisher_username, image_filename, _id, title }) {
	var nav = useNavigate();
	return (
		<div
			className={`w-full h-1/3 bg-blue-100  text-blue-600 
				flex-row border-b border-blue-300 flex 
				cursor-pointer duration-200 hover:scale-105 hover:bg-blue-200 px-6`}
			onClick={() => nav(`/writings/${_id}`)}
		>
			<div className="flex items-center">
				<div className="w-20 h-20 flex justify-center items-center">
					<img src={gen_link_to_file(image_filename)} className="rounded" />
				</div>
			</div>
			<div className="flex flex-col p-2 justify-center">
				<h1 className="items-start text-2xl">{title}</h1>
				<p className="text-sm">
					حدود {Math.round((new Date().getTime() - publish_date) / 3600000)} ساعت پیش |
					توسط {publisher_username}
				</p>
			</div>
		</div>
	);
}
export function Writings(props) {
	var nav = useNavigate();
	if (props.writings === null) {
		return <h1>still loading writings ...</h1>
	} else {
		console.log(window.API_ENDPOINT)
	}
	var sorted_writings = [...props.writings]
	sorted_writings.sort((i1, i2) => i1.publish_date < i2.publish_date);
	/* todo make sure about this sorting function above  */
	return (
		<div className="bg-sky-700 flex p-4 justify-center h-full my-1 overflow-x-auto flex-col">
			<div className="flex justify-between px-2 text-white mb-2 items-center text-lg">
				<h1 className="">آخرین نوشته ها</h1>
				<Link to="/writings">مشاهده بیشتر</Link>
			</div>
			<div className="w-full flex h-fit flex-col sm:flex-row items-center sm:items-stretch">
				{sorted_writings.length === 0 ? (
					`there is not anything to show. (count of all published writings : ${sorted_writings.length})`
				) : (
					<>
						<div
							className="bg-blue-300 cursor-pointer rounded-lg w-full sm:w-1/3 mx-2 flex justify-center items-center relative text-white overflow-hidden"
							style={{ aspectRatio: 1 }}
							onClick={() => nav(`/writings/${sorted_writings[0]._id}`)}
						>
							<img
								src={window.api_endpoint + "/" + sorted_writings[0].image_filename}
								className="first_writing_image duration-200 h-full aspect-auto"
							/>
							<div className="absolute h-1/2 top-0 w-full p-2">
								<p className="text-sm">
									حدود{" "}
									{Math.round(
										(new Date().getTime() - sorted_writings[0].publish_date) /
											3600000
									)}{" "}
									ساعت پیش | توسط {sorted_writings[0].publisher_username}
								</p>
							</div>
							<div
								className="absolute h-1/3 top-2/3 w-full  p-2"
								style={{ background: "rgb(0, 0 ,255,0.6)" }}
							>
								<h1 className="text-2xl"> {sorted_writings[0].title}</h1>
							</div>
						</div>
					</>
				)}
				<div className="flex flex-col w-full sm:w-2/3 rounded-lg overflow-hidden mt-6 sm:mt-0">
					{[1, 2, 3].map((number, index) => {
						var writing = sorted_writings[number];
						if (writing !== undefined) {
							return <WritingRow {...writing} key={index} />;
						} else {
							return (
								<div
									key={index}
									className={`w-full h-1/3 bg-blue-100 flex-col
										text-blue-600 border-b border-blue-300 flex px-6 justify-center
										cursor-pointer duration-200 hover:scale-105 hover:bg-blue-200 py-4 sm:py-0`}
								>
									<h1 className="text-xl">
										نوشته شماره {number + 1} برای نمایش وجود ندارد
									</h1>
									<p className="text-sm">
										{" "}
										(در مجموع {sorted_writings.length} نوشته منتشر شده است)
									</p>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}
export function CustomBlock({ title, info, button_text, button_onclick, Icon }) {
	return (
		<div className="bg-sky-700 flex p-4 items-center h-full my-1 justify-center sm:justify-start flex-col sm:flex-row">
			<div
				className="w-1/4 rounded-lg flex justify-center items-center"
				style={{ aspectRatio: 1 }}
			>
				<Icon sx={{ width: "90%", height: "90%", color: "white" }} />
			</div>
			<div className="h-full text-white w-3/4 p-2 text-center">
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
		custom_axios({
			url: "/api-v2",
			headers: { task: "get_collection" },
			data: {
				collection_name: "writings",
				filters: {},
			},
		}).then((data) => set_writings(data.data), console.log);
	}, []);
	if (writings === null) return "loading ...";
	return (
		<>
			<ProductsRow
				icon={<Stars sx={{ color: "darkblue" }} />}
				title="محصولات ما"
				products={suggested_products()}
			/>
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
				title="بخش دانلود ها"
				info={"فایل های قابل بارگیری را از اینجا بارگیری کنید"}
				button_onclick={() => nav("/download-center")}
			/>

			<Writings writings={writings} />
			<CustomBlock
				Icon={Business}
				button_text={"برو به درباره ما"}
				title="درباره ما"
				info={"توضیحات شرکت اینجا نمایش داده خواهد شد"}
				button_onclick={() => nav("/about-us")}
			/>

			<CustomBlock
				Icon={Phone}
				button_text={"برو به تماس با ما"}
				title="تماس با ما"
				info={"پل های ارتباطی ما را مشاهده کنید"}
				button_onclick={() => nav("/contact-us")}
			/>
		</>
	);
}

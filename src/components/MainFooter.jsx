import { useEffect, useState } from "react";
import { get_company_info } from "../../api/client";
import { multi_lang_helper as ml } from "../common";
import { LocationOn, Phone } from "@mui/icons-material";
import github_icon from "../../github-icon.png";
export function MainFooter() {
	var [company_info, set_company_info] = useState(null);
	async function fetch_data() {
		set_company_info(await get_company_info());
	}
	useEffect(() => {
		fetch_data();
	}, []);

	if (company_info === null) {
		return "در حال بارگذاری اطلاعات شرکت ...";
	}
	return (
		<>
			<div className="bg-sky-700 text-white flex items-end flex-col p-2">
				<div className="flex justify-center items-center w-full">
					<img
						src={github_icon}
						className=" w-3/4 h-32 rounded-lg flex items-center justify-center bg-white"
					/>
				</div>
				<h1 className="text-3xl mt-4 mb-1">اطلاعات تماس</h1>
				<hr className="bg-white  w-full mb-2" />
				<h1 dir="rtl" className="mb-2 text-xl">
					<LocationOn />
					آدرس : {company_info.address || "بدون آدرس"}
				</h1>
				<h1 dir="rtl" className="text-xl">
					<Phone />
					تلفن: {company_info.landline_phone_number || "بدون شماره تلفن ثابت"}
				</h1>
			</div>
		</>
	);
}

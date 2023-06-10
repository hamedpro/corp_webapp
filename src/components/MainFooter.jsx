import { useEffect, useState } from "react";
import { get_company_info } from "../../api/client";
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
			<div className="bg-sky-700 text-white flex sm:justify-start sm:items-center flex-col sm:flex-row-reverse p-2 sm:space-x-4">
				<div className="flex justify-center items-center w-full sm:w-fit">
					<img
						src={github_icon}
						className=" h-20 rounded-lg flex items-center justify-center"
					/>
				</div>
				<div className="px-5">
					<h1 dir="rtl" className="mb-2 text-3xl px-2">
						{company_info.name || "بدون نام"}
					</h1>
					<h1 dir="rtl" className="mb-2 text-xl">
						<LocationOn />
						آدرس : {company_info.address || "بدون آدرس"}
					</h1>
					<h1 dir="rtl" className="text-xl">
						<Phone />
						تلفن: {company_info.landline_phone_number || "بدون شماره تلفن ثابت"}
					</h1>
				</div>
			</div>
		</>
	);
}

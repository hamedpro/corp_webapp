import { useContext } from "react";
import { context } from "freeflow-react";
export function MainFooter() {
	var { cache, rest_endpoint } = useContext(context);
	var company_info = cache.find((ci) => ci.thing.type === "company_info") || {
		name: "بدون نام",
		address: "هنوز آدرس شرکت تنظیم نشده است",
		landline_phone_number: "هنوز شماره تلفن ثابت تنظیم نشده است.",
		company_photo_file_id: undefined,
	};

	return (
		<div
			style={{ boxSizing: "border-box" }}
			className="bg-sky-700 text-white flex sm:justify-start sm:items-center flex-col sm:flex-row p-2 sm:space-x-4 h-32"
		>
			<div className="flex justify-center items-center w-full sm:w-fit">
				{company_info.company_photo_file_id !== undefined && (
					<img
						src={new URL(`/files/${company_info.company_photo_file_id}`, rest_endpoint)}
						className=" h-20 rounded-lg flex items-center justify-center"
					/>
				)}
			</div>
			<div className="px-5">
				<h1
					dir="rtl"
					className="mb-2 text-3xl px-2"
				>
					{company_info.name || "بدون نام"}
				</h1>
				<h1
					dir="rtl"
					className="mb-2 text-xl"
				>
					<i className="bi bi-geo-alt"></i>
					آدرس : {company_info.address || "بدون آدرس"}
				</h1>
				<h1
					dir="rtl"
					className="text-xl"
				>
					<i className="bi bi-telephone" />
					تلفن: {company_info.landline_phone_number || "بدون شماره تلفن ثابت"}
				</h1>
			</div>
		</div>
	);
}

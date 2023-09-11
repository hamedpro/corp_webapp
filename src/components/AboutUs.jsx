import { Section } from "./Section";
import { CompanyInfo } from "./CompanyInfo.jsx";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export function AboutUs() {
	var nav = useNavigate();
	return (
		<>
			<Section
				title={"اطلاعات شرکت"}
				className="m-2"
			>
				<CompanyInfo type="about_us" />
				<div className="relative">
					<Section
						title="ارتباط با ما"
						className="px-2 mt-2"
					>
						<div className="p-2">
							<h1>برای ارتباط با ما میتوانید از این طرق ذکر شده استفاده کنید :</h1>
							<ul className="list-disc">
								<li className="mx-6">ارسال تیکت پشتیبانی</li>
								<li className="mx-6">ارتباط تلفنی</li>
								<li className="mx-6">ارسال پست الکترونیک</li>
								<li className="mx-6">بازدید حضوری</li>
							</ul>
							<span>برای مشاهده اطلاعات بیشتر از </span>
							<button
								onClick={() => nav("/contact-us")}
								className="border border-gray-200 px-1 rounded mx-1 text-white bg-blue-500  hover:bg-blue-700 duration-150"
							>
								<InfoOutlined sx={{ fontSize: "17px" }} />{" "}
								<span>صفحه تماس با ما</span>
							</button>
							<span>استفاده کنید </span>
						</div>
					</Section>
				</div>
			</Section>
		</>
	);
}

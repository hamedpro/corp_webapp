import config from "../data/config.json";
import svg_divider_top_lr from "../assets/svg-divider-top-lr.svg";
import { ReviewStarsSmall } from "./ReviewStarsSmall";
import { Link } from "react-router-dom";
export const BannerImageHotspot = () => {
	return (
		<>
			<div className="position-absolute z-index-50 text-white top-0 start-0 end-0">
				<img src="/svg-divider-top-lr.svg" />
				{/* {{> svg/svg-divider-top-lr colorclassName="text-white" positionclassName="top-0 start-0 end-0" }} */}
			</div>

			<div
				className="w-100 h-100 bg-img-cover bg-pos-center-center hotspot-container py-5 py-md-7 py-lg-10"
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
				}}
			>
				<div
					className="container py-lg-8 position-relative z-index-10 d-flex align-items-center"
					data-aos="fade-left"
					style={{ justifyContent: "end" }}
				>
					<div
						className="py-8 d-flex justify-content-end align-items-start align-items-lg-end flex-column col-lg-4 text-lg-end"
						style={{ direction: "rtl", alignItems: "start" }}
					>
						<p className="small fw-bolder text-uppercase tracking-wider mb-2 text-muted">
							درباره ما
						</p>
						<h2 className="display-5 fw-bold mb-3">شرکت پیشرو کنترل وطن</h2>
						<p className="lead d-none d-lg-block">
							"با افتخار معرفی می‌کنیم: پیشرو کنترل وطن، همراهی شما در جهت هوشمندی و
							ارتقاء کیفیت زندگی. از چیلرهای پیشرفته تا وسایل هوشمند برقی، ما به شما
							فرصتی بی‌نظیر برای تجربه‌ی تازگی، کارایی و صرفه‌جویی ارائه می‌دهیم. با
							پیشرو کنترل وطن، به دنیایی پر از نوآوری، راحتی و اطمینان خوش آمدید."
						</p>
						<Link
							className="text-decoration-none fw-bolder"
							to="#"
						>
							مشاهده محصولات &larr;
						</Link>
					</div>
				</div>
			</div>

			<div className="position-absolute z-index-50 text-white bottom-0 start-0 end-0">
				<img src="/svg-divider-bottom-rl.svg" />
				{/* {{> svg/svg-divider-bottom-rl colorclassName="text-white" positionclassName="bottom-0 start-0 end-0" }} */}
			</div>
		</>
	);
};

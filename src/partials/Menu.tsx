import { Link } from "react-router-dom";
import { DropdownLinks } from "./DropdownLinks";

export const Menu = () => {
	var products_dropdown_model = [
		{
			title: "آخرین محصولات",
			items: [
				"لپ تاپ گیمینگ",
				"هدفون بی‌سیم",
				"کفش ورزشی",
				"ساعت هوشمند",
				"کتابخانه چوبی",
				"صندلی اداری",
				"ماشین اسباب‌بازی",
				"پاوربانک قابل حمل",
				"کیف دستی چرم",
				"تبلت رنگی",
			],
		},
		{
			title: "پرفروش ترین ها",
			items: [
				"لپ تاپ گیمینگ",
				"هدفون بی‌سیم",
				"کفش ورزشی",
				"ساعت هوشمند",
				"کتابخانه چوبی",
				"صندلی اداری",
				"ماشین اسباب‌بازی",
				"پاوربانک قابل حمل",
				"کیف دستی چرم",
				"تبلت رنگی",
			],
		},
	];
	var downloads_dropdown_model = [
		{
			title: "دسته بندی ها",
			items: [
				"فایل های چیلر ۲۲",
				"راهنمای استفاده از ابزار ۲",
				"عکس برد pcb",
				"عکس مدار جدید",
				"برنامه پریز هوشمند",
				"اسکریپت ۶۸",
				"عکس برد pcb",
				"عکس مدار جدید",
				"برنامه پریز هوشمند",
				"اسکریپت ۶۸",
			],
		},
		{
			title: "آخرین فایل ها",
			items: [
				"آهنگ شادمهر عقیلی - دلم گرفته",
				"آهنگ محسن چاوشی - دلبر",
				"آهنگ بنیامین بهادری - دلبری",
				"آهنگ مازیار فلاحی - بی تو برگشتم",
				"آهنگ امیر تتلو - بی تو بی من",
				"آهنگ محمدرضا گلزار - بی تو بی من",
				"آهنگ محسن یگانه - بی تو بی من",
				"آهنگ محسن چاوشی - بی تو بی من",
				"آهنگ محسن یگانه - بی تو بی من",
				"آهنگ محسن چاوشی - بی تو بی من",
			],
		},
	];
	return (
		<ul className="navbar-nav py-lg-2 mx-auto">
			<li className="nav-item me-lg-4 dropdown position-static">
				<Link
					className="nav-link fw-bolder dropdown-toggle py-lg-4"
					to="#"
					role="button"
					data-bs-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					محصولات
				</Link>

				<div className="dropdown-menu dropdown-megamenu">
					<div className="container">
						<div className="row g-0">
							<div className="col-12 col-lg-7">
								<DropdownLinks model={products_dropdown_model} />
							</div>

							<div className="d-none d-lg-block col-lg-5">
								<div
									className="vw-50 h-100 bg-img-cover bg-pos-center-center position-absolute"
									style={{
										backgroundImage:
											"url(/assets/images/banners/oriental-tiles.png)",
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li className="nav-item me-lg-4 dropdown position-static">
				<Link
					className="nav-link fw-bolder dropdown-toggle py-lg-4"
					to="#"
					role="button"
					data-bs-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					دانلود ها
				</Link>

				<div className="dropdown-menu dropdown-megamenu">
					<div className="container">
						<div className="row g-0">
							<div className="col-12 col-lg-7">
								<DropdownLinks model={downloads_dropdown_model} />
							</div>

							<div className="d-none d-lg-block col-lg-5">
								<div
									className="vw-50 h-100 bg-img-cover bg-pos-center-center position-absolute"
									style={{
										backgroundImage: "url(/assets/images/banners/banner-4.jpg)",
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li className="nav-item me-lg-4">
				<Link
					className="nav-link fw-bolder py-lg-4"
					to="#"
				>
					درباره ما
				</Link>
			</li>
			<li className="nav-item me-lg-4">
				<Link
					className="nav-link fw-bolder py-lg-4"
					to="#"
				>
					تماس با ما
				</Link>
			</li>
			{/* <li className="nav-item dropdown me-lg-4">
				<Link
					className="nav-link fw-bolder dropdown-toggle py-lg-4"
					to="#"
					role="button"
					data-bs-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					بیشتر
				</Link>
				<ul className="dropdown-menu">
					<li>
						<Link
							className="dropdown-item"
							to="/index.html"
						></Link>
					</li>
					<li>
						<Link
							className="dropdown-item"
							to="/category"
						>
							Category
						</Link>
					</li>
					<li>
						<Link
							className="dropdown-item"
							to="/product"
						>
							Product
						</Link>
					</li>
					<li>
						<Link
							className="dropdown-item"
							to="/cart"
						>
							Cart
						</Link>
					</li>
					<li>
						<Link
							className="dropdown-item"
							to="/checkout"
						>
							Checkout
						</Link>
					</li>
				</ul>
			</li> */}
		</ul>
	);
};

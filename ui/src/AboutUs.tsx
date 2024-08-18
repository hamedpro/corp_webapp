import React from "react";
import board_image from "../src/assets/board.png";
export const AboutUs = () => {
	return (
		<>
			<div
				className="w-full h-48 flex items-center px-8 bg-sky-500"
				style={
					{
						/* background: "linear-gradient(0deg, rgb(166 180 255) 0%, rgb(47 47 255) 100%)", */
					}
				}
			>
				<div className="flex flex-col w-72">
					<h1 className="text-neutral-100">معرفی شرکت پیشرو کنترل وطن</h1>
					<div className="h-1 w-full rounded-lg bg-neutral-500"></div>
					<p className="text-neutral-200"></p>
				</div>
			</div>
			<div className="flex justify-between w-full p-8 flex-col-reverse md:flex-row gap-x-12 items-center md:items-start">
				<div className="flex flex-col mt-8 md:mt-0 md:items-start items-center">
					<h3 className="text-neutral-700 bg-neutral-200 p-3 rounded-xl w-fit m-0">
						تاسیس شرکت
					</h3>
					{/* <div className="h-1 w-full rounded-lg bg-neutral-500"></div> */}
					<p className="text-neutral-500">
						شرکت پیشرو کنترل وطن در سال ۱۴۰۱ و پس از سال ها فعالیت مدیران مجموعه در
						زمینه اتوماسیون و تولید سیستم های کنترلی و همچنین سیستم های تهویه مطبوع
						پیشرفته نظیر GHP تاسیس شد.
					</p>
					<h3 className="text-neutral-700 bg-neutral-200 p-3 rounded-xl w-fit m-0">
						سوابق شرکت
					</h3>
					<p className="text-neutral-500">
						پیشرو کنترل وطن نامی آشنا در سیستمهای کنترل تهویه مطبوع ایران با تمرکز بر
						تولید و طراحی بردهای الکترونیکی به عنوان یکی از پیشگامان این حوزه شناخته
						میشود ما در پیشرو کنترل وطن با بهره گیری از دانش فنی روز و تیمی متخصص به
						ارائه راهکارهای نوآورانه در زمینه سیستمهای هوشمند کنترلی و اتوماسیون صنعتی
						می پردازیم
					</p>
					<h3 className="text-neutral-700 bg-neutral-200 p-3 rounded-xl w-fit m-0">
						تعهد کیفیت
					</h3>
					<p className="text-neutral-500">
						ما به تعهد خود برای کیفیت برتر و پشتیبانی فنی مستمر افتخار میکنیم و همواره
						در جستجوی راههایی برای پیشرفت و نوآوری در محصولات و خدمات خود هستیم با پیشرو
						کنترل وطن شما به قلب تکنولوژی نوین صنعت الکترونیک قدم میگذارید و میتوانید از
						مزایای یک سیستم کنترلی پیشرفته بهره مند شوید.
					</p>
					<h3 className="text-neutral-700 bg-neutral-200 p-3 rounded-xl w-fit m-0">
						فناوری به روز
					</h3>
					<p className="text-neutral-500">
						ما در پیشرو کنترل وطن محصولاتی با قابلیتهای پیشرفته و رابط کاربری آسان ارائه
						میدهیم که نه تنها در بازار داخلی بلکه در بازارهای بین المللی نیز رقابتی
						باشند خدمات پس از فروش ما نیز به همان اندازه که به کیفیت محصولاتمان اهمیت
						میدهیم، حائز اهمیت است.
					</p>
				</div>
				<img
					className="bg-sky-500 rounded-xl w-full aspect-square md:aspect-auto md:h-96 md:w-96 shrink-0"
					src={board_image}
				/>
			</div>
			<div className="p-8">
				<h2 className="text-neutral-700 mt-4">نقاط قوت مجموعه</h2>
				<p className="text-neutral-500 mt-2">
					در ادامه به برخی از زمینه های فعالیت مجموعه پیشرو کنترل وطن اشاره میکنیم.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
					{[
						{
							title: "سیستم‌های کنترل تهویه",
							marketingDescription:
								"سیستم‌های کنترل الکترونیکی ما برای دستگاه‌های تهویه مطبوع به گونه‌ای طراحی شده‌اند که عملکرد بهینه و مصرف انرژی بهینه را تضمین کنند. این سیستم‌ها با تکنولوژی پیشرفته و امکانات هوشمند، به کاربران امکان می‌دهند تا محیطی راحت و کنترل‌شده را تجربه کنند.",
						},
						{
							title: "دستگاه‌های چیلر و GHP",
							marketingDescription:
								"دستگاه‌های چیلر و GHP ما با استفاده از آخرین تکنولوژی‌ها و استانداردهای جهانی تولید می‌شوند. این دستگاه‌ها دارای عملکرد بالا و طول عمر طولانی هستند و طراحی آن‌ها به گونه‌ای است که نیازهای مختلف مشتریان را به بهترین شکل ممکن برآورده می‌کنند.",
						},
						{
							title: "تجهیزات اتوماسیون تولید",
							marketingDescription:
								"تجهیزات اتوماسیون ما به خطوط تولید این امکان را می‌دهند که با دقت و سرعت بیشتری کار کنند. این تجهیزات با استفاده از تکنولوژی‌های روز به بهینه‌سازی فرآیندها و کاهش خطاهای انسانی کمک می‌کنند و باعث افزایش بهره‌وری و کاهش هزینه‌ها می‌شوند.",
						},
						{
							title: "هوشمند سازی",
							marketingDescription:
								"راهکارهای هوشمند سازی ما به کسب‌وکارها کمک می‌کند تا با استفاده از سیستم‌های پیشرفته و داده‌های تحلیلی، عملیات خود را بهینه کنند. این راهکارها به کاربران این امکان را می‌دهند که تصمیمات بهتری بگیرند و به راحتی به پیشرفت‌های صنعتی دست یابند.",
						},
					].map((item) => (
						<div className="bg-neutral-200 bg-opacity-50 p-4 rounded-lg hover:bg-neutral-300 cursor-pointer transition duration-300 ease-in-out">
							<div className="flex items-center text-neutral-700 mb-2">
								<span
									role="img"
									aria-label="question-mark"
									className="mr-2"
								>
									❓
								</span>
								<strong>{item.title}</strong>
							</div>
							<p className="text-neutral-500">{item.marketingDescription}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

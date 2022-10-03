import { Info } from "@mui/icons-material";
import { customAjax } from "../../custom_ajax";
import { Alert } from "../alert/comp";
import Section from "../section/comp";

export function Welcome({ set_tab }) {
	function start_initialization() {
		customAjax({
			params: {
				task_name: "undo_all",
				//todo make sure about undo all
			},
		}).then(
			() => {
				set_tab("first_admin_setup");
			},
			(error) => {
				alert(
					ml({
						en: "something went wrong while deleting previous data",
						fa: "در هنگام حذف داده های قدیمی خطایی پیش آمد",
					})
				);
			}
		);
	}
	return (
		<Section title={ml({ en: "welcome", fa: "خوش آمدید" })} className="mx-1" innerClassName="px-2" top_line_style={{marginBottom:"14px"}}>
			<div className="flex flex-col">
				<h1 className="text-xl text-center mt-2">
					{ml({
						en: "welcome to your new instance of corp_webapp project",
						fa: "به نسخه جدید پروژه کرپ وب اب خوش آمدید",
					})}
				</h1>
				<p className="text-stone-800 text-center mt-1 mb-1">
					{ml({
						en: `in order to start your online shop you have to initialize the app first it's 3
						steps will take more than 5 min of your time !`,
					})}
				</p>
				<Alert icon={<Info />}>
				<p className="text-stone-900">
					{ml({
						en: `notice: this process will first reset everything about this app, so if you have
						done this initialization before consider you have to backup your products and
						... first`,
						fa: "توجه! :‌این فرآیند ابتدا اطلاعات قدیمی تولید شده توسط خودش را حذف میکند تا از وقوع مشکلات جلوگیری کند پس اگر در گذشته از این برنامه استفاده کرده اید ابتدا از داده های خود نسخه پشتیبان تهیه  کنید",
					})}
				</p>
				</Alert>
				<button
					className="border border-blue-400 bg-blue-600 text-white px-2 rounded mt-2 text-xl hover:bg-blue-700 py-1 duration-300"
					onClick={start_initialization}
				>
					{ml({
						en: "start initialization",
						fa: "شروع راه اندازی برنامه",
					})}
				</button>
			</div>
		</Section>
	);
}

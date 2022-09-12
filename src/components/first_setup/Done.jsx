import { useNavigate } from "react-router-dom";
import Section from "../section/comp";
export function Done() {
	var nav = useNavigate();
	return (
		<Section title={ml({ en: "result", fa: "نتیجه" })}>
			<div className="flex items-center justify-center">
				<h1>
					{ml({
						en: `the first setup is done successfuly and now the app is ready to be used by your
						users`,
						fa: "تنظیم اولیه با موفقیت انجام شد و برنامه الان آماده استفاده توسط کاربران است",
					})}
				</h1>
				<br />
				<br />
				<button
					className="border borer-blue-400 px-2"
					onClick={() => {
						nav("/");
						window.location.reload();
					}}
				>
					{ml({ en: "start using the application", fa: "شروع استفاده از برنامه" })}
				</button>
			</div>
		</Section>
	);
}

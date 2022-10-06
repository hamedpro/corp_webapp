import { Style } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Section from "../section/comp";
import { StyledDiv } from "../styled_elements";
export function Done() {
	var nav = useNavigate();
	return (
		<Section title={ml({ en: "result", fa: "نتیجه" })}
			className="mx-1"
			innerClassName={"px-1"}>
			<div className="flex items-center justify-center flex-col">
				<h1 className="text-lg">
					{ml({
						en: `the first setup is done successfuly and now the app is ready to be used by your
						users`,
						fa: "تنظیم اولیه با موفقیت انجام شد و برنامه الان آماده استفاده توسط کاربران است",
					})}
				</h1>
				<StyledDiv
					className="border borer-blue-400 px-2 mt-2 text-lg"
					onClick={() => {
						nav("/");
						window.location.reload();
					}}
				>
					{ml({ en: "start using the application", fa: "شروع استفاده از برنامه" })}
				</StyledDiv>
			</div>
		</Section>
	);
}

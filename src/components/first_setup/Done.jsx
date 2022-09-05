import { useNavigate } from "react-router-dom";
import Section from "../section/comp";
export function Done() {
	var nav = useNavigate();
	return (
		<Section title="result">
			<div className="flex items-center justify-center">
				<h1>
					the first setup is done successfuly and now the app is ready to be used by your
					users
				</h1>
				<button
					className="border borer-blue-400 px-2"
					onClick={() => {
						nav("/");
						window.location.reload();
					}}
				>
					start using the application
				</button>
			</div>
		</Section>
	);
}

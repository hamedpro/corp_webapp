import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";

export function Welcome({ set_tab }) {
	function start_initialization() {
		customAjax({
			params: {
				task_name: "undo_all",
				//todo make sure about undo all
			},
		}).then(
			(data) => {
				customAjax({
					route: "/init",
				}).then(
					(data) => {
						set_tab("first_admin_setup");
					},
					(error) => {
						alert(
							ml({
								en: "something went wrong while initializing the app",
								fa: "",
							})
						);
					}
				);
			},
			(error) => {
				alert(
					ml({
						en: "something went wrong while deleting previous data",
						fa: "",
					})
				);
			}
		);
	}
	return (
		<Section title={ml({ en: "welcome", fa: "" })}>
			<div className="flex flex-col">
				<h1>
					{ml({
						en: "welcome to your new instance of corp_webapp project",
						fa: "",
					})}
				</h1>
				<p>
					{ml({
						en: `in order to start your online shop you have to initialize the app first it's 3
						steps will take more than 5 min of your time !`,
					})}
				</p>
				<p>
					{ml({
						en: `notice: this process will first reset everything about this app, so if you have
						done this initialization before consider you have to backup your products and
						... first`,
						fa: "",
					})}
				</p>
				<button
					className="border border-blue-400 px-2 rounded"
					onClick={start_initialization}
				>
					{ml({
						en: "start initialization",
						fa: "",
					})}
				</button>
			</div>
		</Section>
	);
}

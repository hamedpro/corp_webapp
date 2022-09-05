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
					params: {
						task_name: "init",
					},
				}).then(
					(data) => {
						set_tab("first_admin_setup");
					},
					(error) => {
						alert("something went wrong");
					}
				);
			},
			(error) => {
				alert("something went wrong while delete previous data");
			}
		);
	}
	return (
		<Section title="welcome">
			<div className="flex flex-col">
				<h1>welcome to your new instance of corp_webapp project</h1>
				<p>
					in order to start your online shop you have to initialize the app first it's 3
					steps will take more than 5 min of your time !
				</p>
				<p>
					notice: this process will first reset everything about this app, so if you have
					done this initialization before consider you have to backup your products and
					... first{" "}
				</p>
				<button
					className="border border-blue-400 px-2 rounded"
					onClick={start_initialization}
				>
					start initialization
				</button>
			</div>
		</Section>
	);
}

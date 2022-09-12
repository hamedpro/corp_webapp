import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";
export default function NewBlog() {
	async function upload_new_blog() {
		try {
			var response = await customAjax({
				params: {
					task_name: "add_new_blog",
					title: document.querySelector("#blog_title_input").value,
					text: document.querySelector("#blog_text_input").value,
					username: localStorage.getItem("username"),
				},
				verbose: true,
			});
			var blog_id = response.result;
			await customAjax({
				params: {
					task_name: "upload",
					files_names: JSON.stringify([blog_id]),
					relative_path: "./blog_images",
				},
				files: [document.getElementById("blog_image_input").files[0]],
				verbose: true,
			});
			alert(ml({ en: "done successfuly", fa: "" }));
		} catch (e) {
			alert(ml({ en: "something went wrong", fa: "" }));
			console.log(e);
		}
	}
	var inputClassName = "border border-gray-500";
	return (
		<Section
			title={ml({
				en: "new blog",
				fa: "",
			})}
			className="px-2"
		>
			<div className="px-2">
				<p>{ml({ en: "blog title :", fa: "" })}</p>
				<input id="blog_title_input" className={inputClassName} />

				<p>{ml({ en: "blog image :", fa: "" })}</p>
				<input type="file" id="blog_image_input" />

				<p>{ml({ en: "blog text :", fa: "" })}</p>
				<textarea
					id="blog_text_input"
					className={[inputClassName, "block"].join(" ")}
				></textarea>

				<button
					onClick={upload_new_blog}
					className="bg-gray-800 text-white px-2 py-1 rounded-lg mt-2"
				>
					{ml({
						en: "submit as",
						fa: "",
					})}{" "}
					@{window.localStorage.getItem("username")}
				</button>
			</div>
		</Section>
	);
}

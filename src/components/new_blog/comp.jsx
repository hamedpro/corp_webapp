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
			});
			var blog_id = response.result;
			await customAjax({
				params: {
					task_name: "set_blog_image",
					blog_id,
				},
				files: [document.getElementById("blog_image_input").files[0]],
			});
			alert("done successfuly");
		} catch (e) {
			alert("something went wrong");
			console.log(e);
		}
	}
	var inputClassName = "border border-gray-500";
	return (
		<Section title="new blog" className="px-2">
			<div className="px-2">
				<p>blog title :</p>
				<input id="blog_title_input" className={inputClassName} />

				<p>blog image :</p>
				<input type="file" id="blog_image_input" />

				<p>blog text :</p>
				<textarea
					id="blog_text_input"
					className={[inputClassName, "block"].join(" ")}
				></textarea>

				<button
					onClick={upload_new_blog}
					className="bg-gray-800 text-white px-2 py-1 rounded-lg mt-2"
				>
					submit as @{window.localStorage.getItem("username")}
				</button>
			</div>
		</Section>
	);
}

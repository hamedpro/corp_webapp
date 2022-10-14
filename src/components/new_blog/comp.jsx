import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";
import { StyledDiv, StyledInput } from "../styled_elements";
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
					upload_dir : "./uploaded/blog_images"
				},
				files: [document.getElementById("blog_image_input").files[0]],
				verbose: true,
			});
			alert(ml({ en: "done successfuly", fa: "باموفقیت انجام شد" }));
		} catch (e) {
			alert(ml({ en: "something went wrong", fa: "خطایی رخ داد" }));
			console.log(e);
		}
	}
	var inputClassName = "border border-gray-500";
	return (
		<Section
			title={ml({
				en: "new blog",
				fa: "بلاگ جدید",
			})}
			className="px-2"
		>
			<div className="px-2">
				<p className="mb-1">{ml({ en: "blog title :", fa: "موضوع بلاگ" })}</p>
				<StyledInput id="blog_title_input" className={inputClassName} />
				
				<p className="mt-2 mb-1">{ml({ en: "blog image :", fa: "عکس بلاگ" })}</p>
				<input type="file" id="blog_image_input" />

				<p className="mt-2 mb-1">{ml({ en: "blog text :", fa: "متن بلاگ" })}</p>
				<StyledInput
					textarea_mode
					id="blog_text_input"
					className={[inputClassName, "block"].join(" ")}
				/>

				<StyledDiv
					onClick={upload_new_blog}
					className="w-fit bg-blue-400 hover:bg-blue-600 duration-300 text-white px-2 py-1 rounded-lg mt-2"
				>
					{ml({
						en: "submit as",
						fa: "ثبت به عنوان",
					})}{" "}
					@{window.localStorage.getItem("username")}
				</StyledDiv>
			</div>
		</Section>
	);
}

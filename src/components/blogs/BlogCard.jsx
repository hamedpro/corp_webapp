import { useNavigate } from "react-router-dom";
import { gen_link_to_file } from "../../common";
export function BlogCard({ data, className = "" }) {
	var nav = useNavigate()
	return (
		<div
			onClick={ ()=>nav(`/blog-posts/${data.id}`)}
			className={["w-full border border-stone-500 rounded-lg flex p-2", className].join(" ")}
		>
			<div className="w-1/4 h-40 border border-yellow-500 bg-blue-400 flex justify-center items-center">
				<img
					src={gen_link_to_file(`./blog_images/${data.image_file_name}`)}
					style={{ height: "100%", objectFit: "contain" }}
				/>
			</div>
			<div className="w-3/4 h-40 pl-2">
				<h2>
					#{data.id} : {data.title}
				</h2>
				<p>
					last modified by {data.username} at{" "}
					{new Date(Number(data.last_modification_time)).toString()}
				</p>
			</div>
		</div>
	);
}

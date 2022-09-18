import Section from "../section/comp";
import { useParams } from "react-router-dom";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { Loading } from "../loading/comp";
export default function Blog() {
	var blog_id = useParams().blog_id;
	var [blog, set_blog] = useState(null)
	function fetch_data() {
		customAjax({
			params: { 
				task_name : "get_blog_posts"
			}
		}).then(data => {
			set_blog(data.result.find(i=> i.id == blog_id))
		}, e => {
			console.log(e)
		})
	}
	useEffect(fetch_data,[])
	return (
		<>
		<Loading is_loading={blog === null} />
			{blog !== null && (
			<div className="m-2 border border-stone-400 p-2">
				<img src={gen_link_to_file(`./blog_images/${blog.image_file_name}`)} className='h-48' style={{objectFit : 'contain'} } />
				<h1 className="text-lg">{blog.title}</h1>
				<p className="text-stone-400">last modified by {blog.username} at {new Date(Number(blog.last_modification_time)).toString() }</p>
				<p className="mt-2">
					{ blog.text}
				</p>
			</div>	
		) }
		
			</>
	);
}

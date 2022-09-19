import Section from "../section/comp";
import { useParams } from "react-router-dom";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { Loading } from "../loading/comp";
import { CustomTable } from "../custom_table/comp";
import { Alert } from "../alert/comp";
import { InfoRounded } from "@mui/icons-material";
export default function Blog() {
	var blog_id = useParams().blog_id;
	var [blog, set_blog] = useState(null);
	var [blog_comments,set_blog_comments] = useState(null)
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_blog_posts",
			},
		}).then(
			(data) => {
				set_blog(data.result.find((i) => i.id == Number(blog_id)));
			},
			(e) => {
				console.log(e);
			}
		);
		customAjax({
			params: {
				task_name : "get_all_blog_comments"
			}
		}).then(data => {
			set_blog_comments(data.result.filter(i => i.blog_id === Number(blog_id)))
		}, e => {
			console.log(e)
		})
	}
	function submit_new_comment() {
		var params ={
			task_name: "new_blog_comment",
			username: window.localStorage.getItem('username'),
			blog_id: Number(blog_id),
			title: document.getElementById('title_input').value,
			text: document.getElementById('text_input').value,
			time: new Date().getTime().toString()
		}
		console.log(params)
		customAjax({
			params
		}).then(data => {
			fetch_data()
		}, e => {
			console.log(e)
		})
	}
	useEffect(fetch_data, []);
	return ( 
		<>
			<Loading is_loading={blog === null} />
			{blog && (
				<div className="m-2 border border-stone-400 p-2">
					<img
						src={gen_link_to_file(`./blog_images/${blog.image_file_name}`)}
						className="h-48"
						style={{ objectFit: "contain" }}
					/>
					<h1 className="text-lg">{blog.title}</h1>
					<p className="text-stone-400">
						last modified by {blog.username} at{" "}
						{new Date(Number(blog.last_modification_time)).toString()}
					</p>
					<p className="mt-2">{blog.text}</p>
				</div>
			)}
			
			
			<Section
				title="comments"
				innerClassName="px-2"
			>
				{blog_comments !== null && blog_comments.length === 0 && (
					<Alert icon={<InfoRounded />}>
						there is not any comment submited for this blog
					</Alert>
				)}
				<Loading is_loading={ blog_comments === null} />
				{blog_comments !== null && blog_comments.map((comment, index) => {
					return (
						<div className="border border-stone-400" key={index}>
							<p># {comment.id}</p>
							<p>title : { comment.title}</p>
							<p>text : { comment.text}</p>
							<p>submited as @{comment.username} at { new Date(Number(comment.time)).toString()}</p>
						</div>
					)
				})}
			</Section>
			<Section title="new comment">
				<p>share your thought with us by sumbitting a new comment !</p>

				<p>comment title:</p>
				<input id="title_input" />

				<p>comment text:</p>
				<textarea id="text_input" />

				<button onClick={submit_new_comment}>submit</button>
			</Section>
		</>
	);
}

import { Edit, Info, InfoOutlined, InfoRounded, Person } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common";
import { Loading } from "../loading/comp";
import React, { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { ImageRow } from "../ImageRow";
import { useNavigate } from "react-router-dom";
export default function Blogs() {
	var [blogs, set_blogs] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_blog_posts",
			},
		}).then(
			(data) => {
				set_blogs(data.result);
			},
			(e) => {
				console.log(e);
			}
		);
	}
	useEffect(fetch_data, []);
	var nav = useNavigate()
	return (
		<>
			<Section
				title={ml({
					en: "blog posts",
					fa: "بلاگ پست ها",
				})}
				innerClassName="px-3"
				className="px-1"
			>
				<Loading is_loading={blogs === null} />
				{blogs !== null &&
					blogs.map((blog, index) => {
						return (
							<React.Fragment key={index}>
								<ImageRow onClick={()=> nav(`/blog-posts/${blog.id}`)}
									images={[gen_link_to_file(`./blog_images/${blog.image_file_name}`)]}
									items={[
										{ icon: <InfoOutlined sx={{ color: "darkblue" }} />, text: blog.text },
										{ icon: <Person sx={{ color: 'darkblue' }} />, text: blog.username },
										{icon : <Edit sx={{color:'darkblue'}}/>,text : `last modified : ${new Date(Number(blog.last_modification_time)).toString()}`}
									]}
									title={blog.title}
								/>
							</React.Fragment>
						);
					})}

				<div className="px-2">{/* todo */}</div>
			</Section>
		</>
	);
}

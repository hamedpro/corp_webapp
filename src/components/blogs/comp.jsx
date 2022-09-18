import { InfoRounded } from "@mui/icons-material";
import Section from "../section/comp";
import { Alert } from "../alert/comp";
import { multi_lang_helper as ml } from "../../common";
import { Loading } from "../loading/comp";
import React, { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { BlogCard } from "./BlogCard";
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
								<BlogCard data={blog} />
							</React.Fragment>
						);
					})}

				<div className="px-2">{/* todo */}</div>
			</Section>
		</>
	);
}

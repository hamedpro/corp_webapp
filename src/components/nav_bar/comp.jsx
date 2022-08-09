import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
	var nav = useNavigate();
	const [paths, set_paths] = useState([]);
	var loc = useLocation();
	useEffect(() => {
		var tmp = [];
		tmp.push({ name: "home", link: "/" });

		window.location.pathname.split("/").forEach((sp, index) => {
			if (index == 0) {
				return;
			}
			var link = window.location.pathname.split("/");
			link.length = index + 1;
			link = link.join("/");
			tmp.push({
				name: sp,
				link,
			});
			set_paths(tmp);
		});
	}, [loc]);
	//todo add link style to options below
	return (
		<div className="px-2 flex flex-row items-center mx-1 mt-2 border py-1 border-stone-300">
			{paths.map((path, index) => {
				return (
					<React.Fragment key={index}>
						<b className="mx-1" onClick={() => nav(path.link)}>
							{path.name}
						</b>
						<p style={{ display: index == paths.length - 1 ? "none" : "block" }}>/</p>
					</React.Fragment>
				);
			})}
		</div>
	);
}

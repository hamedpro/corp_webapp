import { useContext } from "react";

import { CustomImageSlider } from "./CustomImageSlider";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
export const ContentSlider = () => {
	var { cache, profiles_seed, rest_endpoint } = useContext(context);
	var content_slider_content = cache.find((ci) => ci.thing.type === "content_slider_content");
	var file_ids = [];
	if (content_slider_content?.thing.value !== undefined) {
		Object.keys(content_slider_content?.thing.value).forEach((breakpoint) => {
			file_ids = file_ids.concat(content_slider_content?.thing.value[breakpoint]);
		});
	}
	return (
		<div
			className="w-full relative"
			style={{ width: "100vw", height: "55vh" }}
		>
			<CustomImageSlider
				images_sources={file_ids
					.reverse()
					.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
			/>
		</div>
	);
};

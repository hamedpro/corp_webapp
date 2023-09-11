import { useContext } from "react";

import { CustomImageSlider } from "./CustomImageSlider";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
export const ContentSlider = () => {
	var { cache, profiles_seed, rest_endpoint } = useContext(context);
	var content_slider_content = cache.find((ci) => ci.thing.type === "content_slider_content");

	return (
		<div
			className="w-full relative"
			style={{ width: "100vw", height: "55vh" }}
		>
			<CustomImageSlider
				images_sources={(content_slider_content?.thing.value || [])
					.reverse()
					.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
			/>
		</div>
	);
};

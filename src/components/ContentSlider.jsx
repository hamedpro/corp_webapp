import { useContext } from "react";

import { CustomImageSlider } from "./CustomImageSlider";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
import { useWindowSize } from "@uidotdev/usehooks";
export const ContentSlider = () => {
	var { cache, profiles_seed, rest_endpoint } = useContext(context);
	var content_slider_content = cache.find((ci) => ci.thing.type === "content_slider_content");

	return (
		<div
			className="w-full relative"
			style={{ width: "100vw", height: "55vh" }}
		>
			<div className="sm:hidden">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["below_sm"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
			<div className="hidden sm:block md:hidden">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["sm"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
			<div className="hidden md:block lg:hidden">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["md"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
			<div className="hidden lg:block xl:hidden">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["lg"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
			<div className="hidden xl:block 2xl:hidden">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["xl"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
			<div className="hidden 2xl:block">
				<CustomImageSlider
					images_sources={(content_slider_content?.thing.value["2xl"] || [])

						.reverse()
						.map((image_id) => calc_file_url(profiles_seed, rest_endpoint, image_id))}
				/>
			</div>
		</div>
	);
};

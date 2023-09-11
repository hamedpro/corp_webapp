import { calc_file_url } from "freeflow-core/dist/utils";
import { context } from "freeflow-react";
import { Fragment, useContext } from "react";
import { register } from "swiper/element/bundle";
import "swiper/swiper-bundle.css";
register();
export function CustomImageSlider({ images_sources }) {
	return (
		<swiper-container
			navigation="true"
			speed="1500"
			loop="true"
			effect="fade"
			autoplay-delay="3000"
			class="w-full h-full flex items-center justify-center"
			autoplay-disable-on-interaction="false"
		>
			{images_sources.map((i) => (
				<Fragment key={i}>
					<swiper-slide
						style={{ height: "100%" }}
						class="flex justify-center items-center w-full h-full bg-stone-800 py-2"
					>
						<img
							className="h-full lg:scale-x-150 duration-300"
							key={i}
							src={i}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						/>
					</swiper-slide>
				</Fragment>
			))}
		</swiper-container>
	);
}

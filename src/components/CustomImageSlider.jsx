import { Fragment } from "react";
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
			autoplay-delay="5000"
			class="w-full h-full flex items-center justify-center"
		>
			{images_sources.map((i) => (
				<Fragment key={i}>
					<swiper-slide
						style={{ height: "55vh" }}
						class="flex justify-center items-center w-full h-full bg-white "
					>
						<img
							className="h-full "
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

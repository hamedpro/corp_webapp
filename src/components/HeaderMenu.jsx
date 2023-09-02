import { ListItem } from "./ListItem";
import { useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { Section } from "./Section";
import { header_options_array } from "./HeaderOptionsArray";
import { InternetControlModal } from "./InternetControlModal";
import { context } from "freeflow-react";
import { find_active_profile_seed } from "freeflow-core/dist/utils";

export const HeaderMenu = ({ hide_header_menu, visibility }) => {
	//props : hide_header_menu : function , visibility : boolean
	var { cache, profiles_seed } = useContext(context);
	var current_profile_seed = find_active_profile_seed(profiles_seed);

	var [is_open, set_is_open] = useState(false);
	var nav = useNavigate();
	var nav_and_hide_header_menu = (path) => {
		hide_header_menu();
		nav(path);
	};
	var current_user = cache.find((ci) => current_profile_seed?.user_id === ci.thing_id);
	var show_admin_routes = current_user?.user_id === -1;

	if (!visibility) {
		return null;
	}
	return (
		<>
			<InternetControlModal
				open={is_open}
				onClose={() => set_is_open(false)}
			/>

			<div className="bg-sky-800 absolute h-full w-full p-1 m-0 z-40 overflow-y-auto top-28 header_menu overflow-x-hidden">
				<Section title={"مسیر ها"}>
					{header_options_array
						.filter((option) => {
							if (option.just_for_admin) {
								return show_admin_routes;
							} else {
								return true;
							}
						})
						.map((option) => {
							return (
								<Fragment key={Math.random() * 10000}>
									<ListItem
										items={[option.text]}
										onClick={
											option.url
												? option.url.startsWith("http")
													? () => window.location.assign(option.url)
													: () => nav_and_hide_header_menu(option.url)
												: () => set_is_open(true)
										}
										beforeItems={<option.icon sx={{ color: "white" }} />}
									/>
								</Fragment>
							);
						})}
				</Section>
			</div>
		</>
	);
};

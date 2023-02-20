import { gen_link_to_file } from "../common";
import { ListItem } from "./ListItem";
export function ProductListItem({ items, onClick, images_path_names }) {
	//required props : "items" : array , "onClick" : function , "images_path_names" : array
	return (
		<ListItem
			items={items}
			onClick={onClick}
			image_src={
				images_path_names.length !== 0
					? gen_link_to_file("./product_images/" + images_path_names[0])
					: null
			}
		/>
	);
}

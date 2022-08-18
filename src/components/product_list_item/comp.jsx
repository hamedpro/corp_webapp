import ListItem from "../list_item/comp";
export default function ProductListItem(props) {
	//required props : "items" : array , "onClick" : function , "images_path_names" : array
	return (
		<ListItem
			items={props.items}
			onClick={props.onClick}
			image_src={
				props.images_path_names.length !== 0
					? "http://" +
					  location.hostname +
					  ":4000/product_images/" +
					  props.images_path_names[0]
					: null
			}
		/>
	);
}

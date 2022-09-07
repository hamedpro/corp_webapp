export function ManageIconsSection() {
	return (
		<Section title="manage icons">
			<button onClick={upload_new_square_icon}>upload new square icon</button>
			<button onClick={upload_new_rectangle_icon}>upload new rectangle icon</button>
			<button onClick={upload_new_favicon}>upload new favicon</button>
			<button onClick={delete_square_icon}>delete square icon</button>
			<button onClick={delete_rectangle_icon}>delete rectangle icon</button>
			<button onClick={delete_favicon}>delete favicon</button>
		</Section>
	);
}

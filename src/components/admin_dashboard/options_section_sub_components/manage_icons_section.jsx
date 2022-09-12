export function ManageIconsSection() {
	function upload() {}
	return (
		<Section title="manage icons">
			<button onClick={upload}>{ml({ en: "upload new square icon", fa: "" })}</button>
			<button onClick={upload}>{ml({ en: "upload new rectangle icon", fa: "" })}</button>
			<button onClick={upload}>{ml({ en: "upload new favicon", fa: "" })}</button>
			<button onClick={upload}>{ml({ en: "delete square icon", fa: "" })}</button>
			<button onClick={upload}>{ml({ en: "delete rectangle icon", fa: "" })}</button>
			<button onClick={upload}>{ml({ en: "delete favicon", fa: "" })}</button>
		</Section>
	);
}

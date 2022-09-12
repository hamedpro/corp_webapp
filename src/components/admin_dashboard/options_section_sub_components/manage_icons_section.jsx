export function ManageIconsSection() {
	function upload() {}
	return (
		<Section title="manage icons">
			<button onClick={upload}>{ml({ en: "upload new square icon", fa: "بارگزاری آیکون مربع جدید" })}</button>
			<button onClick={upload}>{ml({ en: "upload new rectangle icon", fa: "بارگزاری آیکون مستطیل جدید" })}</button>
			<button onClick={upload}>{ml({ en: "upload new favicon", fa: "ریز آیکون جدید" })}</button>
			<button onClick={upload}>{ml({ en: "delete square icon", fa: "حذف کردن آیکون مربع" })}</button>
			<button onClick={upload}>{ml({ en: "delete rectangle icon", fa: "حذف کردن آیکون مستطیل" })}</button>
			<button onClick={upload}>{ml({ en: "delete favicon", fa: "حذف کردن ریز آیکون" })}</button>
		</Section>
	);
}

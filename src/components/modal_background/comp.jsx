export function ModalBackground({ open }) {
	return (
		<div
			className={"fixed w-full h-full top-0 left-0 z-50" + (open ? "" : " hidden")}
			style={{ backgroundColor: "rgba(0,0,0,0.5)", filter: "blur(2px)" }}
		></div>
	);
}

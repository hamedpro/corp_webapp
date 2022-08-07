export default function ReviewItem(props) {
	return (
		<div className={"border border-blue-400 p-2" + " " + props.className}>
			<b>{props.review.text}</b>
			<p>cons : {JSON.parse(props.review.cons).join(",")}</p>
			<p>pros : {JSON.parse(props.review.pros).join(",")}</p>
			<p className="text-xs mt-2">
				by @{props.review.username} . posted in {props.review.date} {/* todo add date */}
			</p>
		</div>
	);
}

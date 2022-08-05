import { useNavigate } from "react-router-dom";

var LinkLikeP = (props) => {
	var nav = useNavigate();
	return (
		<p
			className={typeof props.className == "undefined" ? "" : props.className}
			style={{ cursor: "pointer" }}
			onClick={() => nav(props.link)}
		>
			{props.children}
		</p>
	);
};
export default LinkLikeP;

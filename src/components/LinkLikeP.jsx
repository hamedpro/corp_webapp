import { useNavigate } from "react-router-dom";
export var LinkLikeP = ({ className, link, children = "" }) => {
	var nav = useNavigate();
	return (
		<a
			className={[className, ""].join(" ")}
			style={{ cursor: "pointer" }}
			onClick={(e) => {
				e.preventDefault();
				nav(link);
			}}
		>
			{children}
		</a>
	);
};

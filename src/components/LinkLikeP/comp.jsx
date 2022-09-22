import { useNavigate } from "react-router-dom";
var LinkLikeP = ({className,link,children = ""}) => {
	var nav = useNavigate();
	return (
		<p
			className={className}
			style={{ cursor: "pointer" }}
			onClick={() => nav(link)}
		>
			{children}
		</p>
	);
};
export default LinkLikeP;

import { useNavigate } from "react-router-dom";

var LinkLikeP = (props) => {
	var nav = useNavigate();
	return <p onClick={() => nav(props.link)}>{props.children}</p>;
};
export default LinkLikeP;

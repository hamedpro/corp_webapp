import { List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LinkLikeP } from "../";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
export default function MainFooter() {
	var nav = useNavigate();
	return (
		<>
			<div className="flex p-2 h-16">
				<div className="w-1/3">
					<div className="h-1/2 w-full bg-blue-500"></div>
					<div className="h-1/2 w-full">corp_webapp</div>
				</div>
				<div className="w-1/3"></div>
				<div className="w-1/3 ">
					<Button
						size="small"
						variant="contained"
						color="success"
						className="flex items-center"
					>
						<span>go to top</span>
						<KeyboardArrowUpRoundedIcon />
					</Button>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="w-4/6">
					<p>
						all developed by <a href="https://github.com/hamedpro">@hamedpro</a>
					</p>
				</div>
				<div className="w-2/6">
					<Button>change lang</Button>
				</div>
			</div>
			<div className="flex flex-row">
				<LinkLikeP link="/new-support-ticket">report a bug</LinkLikeP> |
				<LinkLikeP link="/terms">terms of use</LinkLikeP> |
				<a href="https://github.com/hamedpro/corp-webapp">GitHub repository</a>
			</div>
		</>
	);
}

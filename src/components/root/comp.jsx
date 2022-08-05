import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Divider,
	Typography,
	Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useNavigate } from "react-router-dom";
export default function Root() {
	var nav = useNavigate();
	return (
		<>
			<div className="mt-2mx-auto border-blue-200 border-b w-full p-2 flex flex-row bg-stone-600 text-stone-100">
				<div className="w-1/3 min-h-0 flex justify-center items-center mx-2">
					<div className="h-32 w-32 bg-blue-400 rounded my-16"></div>
				</div>
				<div className="w-2/3 min-h-0 flex flex-col justify-center items-center">
					<div className="px-3">
						<Typography variant="h4" sx={{ mb: 1 }}>
							products list
						</Typography>
						<Typography variant="p" sx={{ mb: 1 }}>
							explore our products in a managed category system and find out which one
							meets your needs{" "}
						</Typography>
						<div className="flex flex-row mt-2">
							<Button
								variant="outlined"
								sx={{ color: "white", borderColor: red[50] }}
								onClick={() => nav("/products")}
							>
								explore products
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className=" justify-center items-center mx-auto border-blue-200 border-b w-full p-2 flex bg-stone-600 text-stone-100">
				<div className="w-4/5 min-h-0 flex flex-col justify-center items-center">
					<div className="h-20 w-20 bg-blue-400 rounded mt-2"></div>
					<Typography variant="h5">contact support</Typography>
					<Typography variant="p" className="text-stone-300" sx={{ textAlign: "center" }}>
						talk to support agents any time you have a problem or question about
						anything only by opening a new support ticket
					</Typography>
					<Button
						variant="contained"
						color="info"
						sx={{ mt: 2 }}
						onClick={() => nav("/new-support-ticket")}
					>
						new support ticket
					</Button>
				</div>
			</div>
		</>
	);
}

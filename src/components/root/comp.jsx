import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
export default function Root() {
	return (
		<div className="mt-2 mx-auto border border-blue-200 rounded w-full p-2">
			<List
				sx={{
					width: "100%",
					maxWidth: 360,
					bgcolor: "background.paper",
				}}
			>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ImageIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Photos" secondary="Jan 9, 2014" />
				</ListItem>
				<Divider variant="inset" component="li" />
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<WorkIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Work" secondary="Jan 7, 2014" />
				</ListItem>
				<Divider variant="inset" component="li" />
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<BeachAccessIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Vacation" secondary="July 20, 2014" />
				</ListItem>
			</List>
		</div>
	);
}

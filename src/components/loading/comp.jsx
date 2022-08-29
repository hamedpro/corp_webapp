import { LinearProgress } from "@mui/material";

export function Loading() {
	return (
		<div className="flex justify-center items-center">
			<span>loading data ...</span>
			<LinearProgress />
		</div>
	);
}

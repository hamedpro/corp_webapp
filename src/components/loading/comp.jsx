import { LinearProgress } from "@mui/material";

export function Loading({ is_loading = true, children }) {
	return (
		<>
			{is_loading ? (
				<>
					<div className="flex justify-center items-center">
						<span>loading data ...</span>
						<LinearProgress />
					</div>
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
}

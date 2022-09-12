import { LinearProgress } from "@mui/material";

export function Loading({ is_loading = true, children }) {
	return (
		<>
			{is_loading ? (
				<>
					<div className="flex justify-center items-center">
						<span>{ml({ en: "loading data ...", fa: "" })}</span>
						<LinearProgress />
					</div>
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
}

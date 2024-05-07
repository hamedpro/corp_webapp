import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { NewFile } from "./NewFile";
import { File } from "./File";

export const Settings = () => {
	var loc = useLocation();
	var nav = useNavigate();
	return (
		<div style={{ width: "100vw", height: "100vh", display: "flex" }}>
			<div
				style={{
					flex: "0 0 220px",
					padding: "12px",
					display: "flex",
					flexDirection: "column",
					rowGap: "8px",
					borderLeftStyle: "solid",
					borderRightWidth: "1px",
				}}
				className="border-neutral-200"
			>
				<h4
					style={{
						margin: "6px",
						display: "flex",

						alignItems: "center",
					}}
				>
					<i
						className="bi bi-gear-wide-connected"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginLeft: "4px",
						}}
					/>
					گزینه های مدیریتی
				</h4>
				<Button
					outlined={loc.pathname !== "/settings/new_file"}
					style={{
						width: "100%",
						display: "flex",
						alignItems: "center",
					}}
					onClick={() => nav("/settings/new_file")}
				>
					<i
						className="bi bi-cloud-upload"
						style={{
							marginLeft: "6px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
					<span>آپلود فایل</span>
				</Button>
			</div>
			<div style={{ flex: "1 1 auto", overflow: "auto" }}>
				<Routes>
					<Route
						path="new_file"
						element={<NewFile />}
					/>
				</Routes>
				<Routes>
					<Route
						path="files/:file_id"
						element={<File />}
					/>
				</Routes>
			</div>
		</div>
	);
};

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { customAjax } from "../../custom_ajax";
import Paper from "@mui/material/Paper";
export function PG() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ width: "50%" }}>
				<TableHead>
					<TableRow>
						<TableCell>
							{ml({
								en: "id",
								fa: "شناسه",
							})}
						</TableCell>
						<TableCell>username</TableCell>
						<TableCell>full name</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>1</TableCell>
						<TableCell>hamedpro</TableCell>
						<TableCell>hamed yaghoutpour</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

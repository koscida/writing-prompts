import { Box, Button } from "@mui/material";
import React from "react";
import MUIDenseTable from "../../inputs/MUIDenseTable";

export default function TableView({
	label,
	editLink,
	tableData: [tableHeaders, tableRows],
}) {
	return (
		<>
			<Box className="flexRow">
				<h3>{label}</h3>
				<Button href={editLink} variant="outlined">
					Edit
				</Button>
			</Box>
			<MUIDenseTable columns={tableHeaders} rows={tableRows} />
		</>
	);
}

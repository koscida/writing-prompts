import { Box, Button, Divider, Paper } from "@mui/material";
import React from "react";
import TableView from "../shared/TableView";

export default function Home({
	promptGenerator,

	characterTableData,
	promptTableData,
	tagTableData,
}) {
	// variables
	// const PromptGenerator = promptGenerator;

	// render
	return (
		<Box className="page">
			<Paper>{promptGenerator}</Paper>

			<Divider />

			<Paper>
				<Box>
					<h2>Data</h2>
				</Box>
				<Box
					className="flexRow"
					sx={{
						alignItems: "start",
						justifyContent: "space-evenly",
						"> *": { flex: "1" },
					}}
				>
					<Box>
						<TableView
							label={"Prompts"}
							editLink={"/prompts"}
							tableData={promptTableData}
						/>
					</Box>

					<Box>
						<TableView
							label={"Characters"}
							editLink={"/characters"}
							tableData={characterTableData}
						/>
					</Box>

					<Box>
						<TableView
							label={"Tags"}
							editLink={"/tags"}
							tableData={tagTableData}
						/>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

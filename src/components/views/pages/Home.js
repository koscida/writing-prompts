import { Box, Button, Divider, Paper } from "@mui/material";
import React from "react";
import MUIDenseTable from "../../inputs/MUIDenseTable";
import MUIButton from "../../inputs/MUIButton";

export default function Home({ characterList, promptList, tagList }) {
	// variables
	const getTags = (tagAssociation) =>
		Object.values(tagList)
			.filter((tag) => tag.association.includes(tagAssociation))
			.reduce((tags, tag) => [...tags, tag.name], []);
	const characterTags = getTags("character");
	const promptTags = getTags("prompt");

	// create tables
	const generateRows = (list, headers) =>
		Object.values(list).map((listItem) =>
			headers.reduce(
				(rowData, { field }) => ({
					...rowData,
					[field]: listItem[field],
				}),
				{}
			)
		);
	const characterHeaders = [
		{ field: "order", headerName: "#" },
		{ field: "name", headerName: "Name" },
		...characterTags.map((tag) => ({ field: tag, headerName: tag })),
	];
	const characterTableData = generateRows(characterList, characterHeaders);
	//
	const promptHeaders = [
		{ field: "order", headerName: "#" },
		{ field: "category", headerName: "Category" },
		{ field: "prompts", headerName: "Prompts" },
		...promptTags.map((tag) => ({ field: tag, headerName: tag })),
	];
	let promptTableData = generateRows(promptList, promptHeaders);
	// promptTableData = promptTableData.map((row) => ({
	// 	...row,
	// 	prompts: row.prompts.replaceAll("\n", "<br/>"),
	// }));

	const tagHeaders = [
		{ field: "order", headerName: "#" },
		{ field: "name", headerName: "Name" },
		{ field: "association", headerName: "Association" },
		{ field: "options", headerName: "Options" },
	];
	let tagTableData = generateRows(tagList, tagHeaders);
	// tagTableData = tagTableData.map((row) => ({
	// 	...row,
	// 	options: row.options.replaceAll("\n", "<br/>"),
	// }));

	// render
	return (
		<Box className="page">
			<Paper>
				<Box>
					<h1>Prompt Generator</h1>
				</Box>
				<Box>Results:</Box>
			</Paper>

			<Divider />

			<Paper>
				<Box>
					<h2>Data</h2>
				</Box>
				<Box
					className="flexRow0"
					sx={{ alignItems: "start", justifyContent: "space-evenly" }}
				>
					<Box>
						<Box className="flexRow">
							<h3>Characters</h3>
							<Button href="/characters" variant="outlined">
								Edit
							</Button>
						</Box>

						<MUIDenseTable
							columns={characterHeaders}
							rows={characterTableData}
						/>
					</Box>

					<Divider />

					<Box>
						<Box className="flexRow">
							<h3>Prompts</h3>
							<Button href="/prompts" variant="outlined">
								Edit
							</Button>
						</Box>
						<MUIDenseTable
							columns={promptHeaders}
							rows={promptTableData}
						/>
					</Box>

					<Divider />

					<Box>
						<Box className="flexRow">
							<h3>Tags</h3>
							<Button href="/tags" variant="outlined">
								Edit
							</Button>
						</Box>
						<MUIDenseTable
							columns={tagHeaders}
							rows={tagTableData}
						/>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

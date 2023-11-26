import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
} from "@mui/material";
import React from "react";
import MUIButton from "../../inputs/MUIButton";

export default function PromptResults({
	promptResults,
	handleSaveResults,
	handleGenerateNewResults,
}) {
	return (
		<>
			<style>{`
			.promptSection {
				h3 {
					margin: 0.5rem 0;
				}
				ul {
					padding: 0;
					> * { 
						padding: 0.5rem 0;
						margin: 0;
						border-bottom: 1px solid #ddd;
					}
					> *:last-child { border-bottom: 0; }
				}
			}
			`}</style>
			<Box>
				<h2>Results</h2>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "start",
					justifyContent: "space-evenly",
					"> *": { flex: "1", marginRight: "1rem" },
					"> *:last-child": { flex: "1", marginRight: 0 },
				}}
			>
				<Paper className="promptSection">
					<h3>Prompts</h3>

					<List>
						{promptResults.prompts.map((promptResult) => (
							<ListItem key={promptResult.id}>
								{promptResult.category} &mdash;{" "}
								{promptResult.prompt}
							</ListItem>
						))}
					</List>
				</Paper>

				<Paper className="promptSection">
					<h3>Characters</h3>

					<List>
						{promptResults.characters.map((promptResult) => (
							<ListItem key={promptResult.id}>
								{promptResult.name}
							</ListItem>
						))}
					</List>
				</Paper>

				<Paper className="promptSection">
					<h3>Tags</h3>

					<List>
						{promptResults.tags.map((promptResult) => (
							<ListItem key={promptResult.id}>
								{promptResult.name}: {promptResult.value}
							</ListItem>
						))}
					</List>
				</Paper>
			</Box>
			<Box className="flexRow">
				<MUIButton
					label={"Generate New Results"}
					onClick={handleGenerateNewResults}
				/>
				<MUIButton label={"Save Results"} onClick={handleSaveResults} />
			</Box>
		</>
	);
}

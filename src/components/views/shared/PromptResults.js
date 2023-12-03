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
import MUIDenseTable from "../../inputs/MUIDenseTable";

export default function PromptResults({
	promptResults,
	handleGenerateNewResults,
	handleAddResult,
}) {
	const createKeysFromResults = (keys) =>
		keys.map((key) => ({ field: key, headerName: key }));

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

			<Box
				sx={{
					display: "flex",
					alignItems: "start",
					justifyContent: "space-evenly",
					"> *": { flex: "1", marginRight: "1rem" },
					"> *:last-child": { flex: "1", marginRight: 0 },
				}}
			>
				<Box className="promptSection">
					<h3>Prompts</h3>

					<MUIDenseTable
						columns={createKeysFromResults(
							Object.keys(promptResults.prompts[0])
						)}
						rows={promptResults.prompts}
					/>
				</Box>

				<Box className="promptSection">
					<h3>Characters</h3>

					<MUIDenseTable
						columns={createKeysFromResults(
							Object.keys(promptResults.characters[0])
						)}
						rows={promptResults.characters}
					/>
				</Box>

				<Box className="promptSection">
					<h3>Tags</h3>

					<MUIDenseTable
						columns={createKeysFromResults(
							Object.keys(promptResults.tags[0])
						)}
						rows={promptResults.tags}
					/>
				</Box>
			</Box>
			{handleGenerateNewResults && handleAddResult ? (
				<Box className="flexRow">
					<MUIButton
						label={"Generate New Results"}
						onClick={handleGenerateNewResults}
					/>
					<MUIButton
						label={"Save Results"}
						onClick={handleAddResult}
					/>
				</Box>
			) : (
				<></>
			)}
		</>
	);
}

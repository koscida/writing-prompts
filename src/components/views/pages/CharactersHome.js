import React, { useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import CharactersList from "../shared/CharactersList";
import CharactersClear from "../shared/CharactersClear";
import CharacterView from "../shared/CharaterView";

export default function CharactersHome({
	characters,
	initNewCharacter,
	handleUpdateCharacter,
	handleDeleteCharacter,
	handleAddCharacter,
	handleClearCharacters,
}) {
	return (
		<Box className="page">
			<Paper>
				<h2>Characters</h2>

				<CharactersList
					characters={characters}
					handleUpdateCharacter={handleUpdateCharacter}
					handleDeleteCharacter={handleDeleteCharacter}
				/>
			</Paper>

			<Divider />

			<Paper className="flexRow">
				<Box>
					<h3>Add Character</h3>

					<CharacterView
						character={initNewCharacter}
						updateCharacter={handleAddCharacter}
					/>
				</Box>
				<Box>
					<h3>Clear Characters</h3>
					<CharactersClear
						handleClearCharacters={handleClearCharacters}
					/>
				</Box>
			</Paper>
		</Box>
	);
}

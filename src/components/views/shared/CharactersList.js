import React, { useState } from "react";
import CharacterView from "./CharaterView";
import { Box } from "@mui/material";

export default function CharactersList({
	characters,
	handleUpdateCharacter,
	handleDeleteCharacter,
}) {
	const charactersArr = Object.values(characters);

	// render

	return (
		<Box className="list">
			{charactersArr.length > 0 ? (
				charactersArr
					.sort((a, b) => a.order > b.order)
					.map((characterData) => (
						<CharacterView
							key={characterData.id}
							character={characterData}
							updateCharacter={handleUpdateCharacter}
							deleteCharacter={handleDeleteCharacter}
						/>
					))
			) : (
				<p>No characters, add one!</p>
			)}
		</Box>
	);
}

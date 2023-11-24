import React, { useState, useEffect } from "react";
import MUITextField from "../../inputs/MUITextField";
import { Box, Button } from "@mui/material";

export default function CharacterView({
	character,
	updateCharacter,
	deleteCharacter,
}) {
	const [characterData, setCharacterData] = useState(character);

	// effects

	useEffect(() => {
		setCharacterData(character);
	}, [character]);

	// handlers

	const handleNameChange = (e) => {
		const {
			target: { name, value },
		} = e;
		// console.log("--handleNameSave-- e: ", e);
		setCharacterData({ ...characterData, [name]: value });
	};

	const handleCharacterSave = () => {
		updateCharacter(characterData);
	};

	const handleCharacterDelete = () => {
		deleteCharacter(characterData);
	};

	// render

	return (
		<Box className="listItem flexRow">
			{characterData.order ? <Box>{characterData.order}</Box> : <></>}

			<MUITextField
				label={"Name"}
				value={characterData.name}
				name={"name"}
				handleChange={handleNameChange}
			/>

			<Button
				onClick={handleCharacterSave}
				variant="outlined"
				disabled={characterData === character}
			>
				Save
			</Button>

			{deleteCharacter ? (
				<Button onClick={handleCharacterDelete} variant="outlined">
					Delete
				</Button>
			) : (
				<></>
			)}
		</Box>
	);
}

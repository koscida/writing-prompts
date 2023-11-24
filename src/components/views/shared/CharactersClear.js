import { Button } from "@mui/material";
import React from "react";

export default function CharactersClear({ handleClearCharacters }) {
	return (
		<Button onClick={handleClearCharacters} variant="outlined">
			Clear all characters
		</Button>
	);
}

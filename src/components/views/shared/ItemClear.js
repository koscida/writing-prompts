import { Button } from "@mui/material";
import React from "react";

export default function ItemClear({ handleClear, label }) {
	return (
		<Button onClick={handleClear} variant="outlined">
			Clear all {label}
		</Button>
	);
}

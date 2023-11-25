import { Button } from "@mui/material";
import React from "react";

export default function MUIButton({ label, onClick, disabled = null }) {
	return (
		<Button
			onClick={onClick}
			variant="outlined"
			sx={{ margin: "0.5rem 0" }}
			disabled={disabled}
		>
			{label}
		</Button>
	);
}

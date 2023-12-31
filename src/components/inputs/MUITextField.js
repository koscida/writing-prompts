import React from "react";
import { Box, TextField } from "@mui/material";

export default function MUITextField({
	label,
	value,
	name,
	handleChange,
	styles = {},
}) {
	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		handleChange(name, value);
	};

	return (
		<TextField
			id={`textfield-${name}`}
			label={label}
			value={value}
			name={name}
			onChange={onChange}
			size="small"
			variant="outlined"
			sx={{ ...styles, marginTop: "0.5rem", marginBottom: "0.5rem" }}
		/>
	);
}

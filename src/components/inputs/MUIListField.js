import React from "react";
import { Box, TextField } from "@mui/material";

export default function MUIListField({
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
			fullWidth
			multiline
			rows={6}
			sx={{ ...styles, marginTop: "0.5rem", marginBottom: "0.5rem" }}
		/>
	);
}

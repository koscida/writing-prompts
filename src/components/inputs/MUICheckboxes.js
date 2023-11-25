import React from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

export default function MUICheckboxes({
	label,
	name,
	value,
	options,
	handleChange,
}) {
	const onChange = (e) => {
		const newName = e.target.name;
		// console.log("--onChange-- value: ", value, "newName: ", newName);

		const newValues = value.includes(newName)
			? value.filter((v) => v !== newName)
			: [...value, newName];

		handleChange(name, newValues);
	};

	return (
		<FormControl component="fieldset" variant="standard">
			<FormLabel component="legend">{label}</FormLabel>
			<FormGroup>
				{options.map((option, i) => (
					<FormControlLabel
						key={i}
						control={
							<Checkbox
								checked={value.includes(option.value)}
								onChange={onChange}
								name={option.value}
							/>
						}
						label={option.label}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
}

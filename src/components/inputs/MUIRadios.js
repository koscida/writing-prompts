import React from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	RadioGroup,
	Radio,
} from "@mui/material";

export default function MUIRadios({
	label,
	name,
	value,
	options,
	handleChange,
}) {
	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		handleChange(name, value);
	};

	return (
		<FormControl>
			<FormLabel id={name}>{label}</FormLabel>

			<RadioGroup name={name} onChange={onChange} value={value}>
				{options.map((option, i) => (
					<FormControlLabel
						key={i}
						value={option.value}
						control={<Radio size="small" />}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

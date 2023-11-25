import React from "react";
import MUIButton from "../../inputs/MUIButton";

export default function ItemClear({ handleClear, label }) {
	return (
		<>
			<p style={{ marginBottom: "0.5rem" }}>
				This will delete all {label ?? "items"} from the list. Cannot be
				undone.
			</p>
			<MUIButton label={`Clear all ${label}`} onClick={handleClear} />
		</>
	);
}

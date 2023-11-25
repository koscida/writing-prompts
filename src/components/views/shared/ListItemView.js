import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MUITextField from "../../inputs/MUITextField";
import MUICheckboxes from "../../inputs/MUICheckboxes";
import MUIListField from "../../inputs/MUIListField";
import MUIButton from "../../inputs/MUIButton";

export default function ListItemView({
	model,
	itemData,
	handleUpdateItem,
	handleDeleteItem,
}) {
	const [localItemData, setLocalItemData] = useState(itemData);

	// effects

	useEffect(() => {
		setLocalItemData(itemData);
	}, [itemData]);

	// handlers

	const handleChange = (name, value) => {
		// console.log("--handleChange-- name: ", name, " value: ", value);
		setLocalItemData({
			...localItemData,
			[name]: model.processValue(name, value),
		});
	};

	const handleClickSave = () => {
		handleUpdateItem(localItemData);
	};

	const handleClickDelete = () => {
		handleDeleteItem(localItemData);
	};

	// render
	if (!localItemData) return <></>;

	return (
		<Box className="listItem">
			{localItemData.order ? <Box>{localItemData.order}</Box> : <></>}

			{Object.values(model.getModelFields()).map((dataElement, i) => {
				const MUIField =
					dataElement.kind === "textField"
						? MUITextField
						: dataElement.kind === "checkbox"
						? MUICheckboxes
						: dataElement.kind === "listField"
						? MUIListField
						: MUITextField;

				return (
					<Box key={i}>
						<MUIField
							label={dataElement.label}
							name={dataElement.name}
							value={localItemData[dataElement.name]}
							options={dataElement.options}
							handleChange={handleChange}
						/>
					</Box>
				);
			})}

			<Box>
				<MUIButton
					label={"Save"}
					onClick={handleClickSave}
					disabled={localItemData === itemData}
				/>
			</Box>

			{handleDeleteItem ? (
				<Box>
					<MUIButton label={"Delete"} onClick={handleClickDelete} />
				</Box>
			) : (
				<></>
			)}
		</Box>
	);
}

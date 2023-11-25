import React, { useState, useEffect, Fragment } from "react";
import { Box } from "@mui/material";
import MUITextField from "../../inputs/MUITextField";
import MUICheckboxes from "../../inputs/MUICheckboxes";
import MUIListField from "../../inputs/MUIListField";
import MUIButton from "../../inputs/MUIButton";

export default function ListItemView({
	model,
	itemData,
	tagList,
	handleUpdateItem,
	handleDeleteItem,
}) {
	const [localItemData, setLocalItemData] = useState(itemData);

	const modelFields = model.getModelFields();
	const tagListByName = Object.values(tagList).reduce(
		(obj, tag) => ({ ...obj, [tag.name]: tag }),
		{}
	);

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

	if (!localItemData || !modelFields) return <></>;

	return (
		<Box className="listItem">
			{localItemData.order ? <Box>{localItemData.order}</Box> : <></>}

			{Object.entries(itemData).map(([name, dataValue], i) => {
				if (["id", "order"].includes(name))
					return <React.Fragment key={i}></React.Fragment>;

				let fieldModel = modelFields[name];
				if (!fieldModel) {
					const options = tagListByName[name].options
						.split("\n")
						.map((option) => ({ label: option, value: option }));
					// console.log("options: ", options);
					fieldModel = {
						label: name,
						name,
						kind: "checkbox",
						options,
					};
				}

				const MUIField =
					fieldModel.kind === "textField"
						? MUITextField
						: fieldModel.kind === "checkbox"
						? MUICheckboxes
						: fieldModel.kind === "listField"
						? MUIListField
						: MUICheckboxes;
				return (
					<Box key={i}>
						<MUIField
							key={`${i}-${name}`}
							label={fieldModel.label}
							name={fieldModel.name}
							value={localItemData[name]}
							options={fieldModel.options}
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

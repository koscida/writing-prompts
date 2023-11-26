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
	const tagListByName = tagList
		? Object.values(tagList).reduce(
				(obj, tag) => ({ ...obj, [tag.name]: tag }),
				{}
		  )
		: {};

	// effects

	useEffect(() => {
		setLocalItemData(itemData);
	}, [itemData]);

	// handlers

	const handleChange = (name, value) => {
		const newLocalItemData = {
			...localItemData,
			[name]: model.processValue(name, value),
		};
		setLocalItemData(newLocalItemData);
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

			{Object.keys(
				tagList ? model.initWithTags(tagList) : model.init()
			).map((name, i) => {
				if (["id", "order"].includes(name))
					return <React.Fragment key={i}></React.Fragment>;

				// get field model from model
				let fieldModel = modelFields[name];
				// if no field model, then a tag, create tag field model here
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

				// the value to display, pull from local item data or get a default
				const value = localItemData[name]
					? localItemData[name]
					: fieldModel.kind === "checkbox"
					? []
					: "";

				const MUIField =
					fieldModel.kind === "textField"
						? MUITextField
						: fieldModel.kind === "checkbox"
						? MUICheckboxes
						: fieldModel.kind === "listField"
						? MUIListField
						: MUITextField;
				return (
					<Box key={i}>
						<MUIField
							label={fieldModel.label}
							name={fieldModel.name}
							value={value}
							options={fieldModel.options}
							handleChange={handleChange}
						/>
					</Box>
				);
			})}

			<Box className="flexColumn">
				<Box>
					<MUIButton
						label={"Save"}
						onClick={handleClickSave}
						disabled={localItemData === itemData}
					/>
				</Box>
				{handleDeleteItem ? (
					<Box>
						<MUIButton
							label={"Delete"}
							onClick={handleClickDelete}
						/>
					</Box>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}

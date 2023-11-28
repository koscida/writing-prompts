import React, { useState, useEffect, Fragment } from "react";
import { Box } from "@mui/material";
import MUITextField from "../../inputs/MUITextField";
import MUICheckboxes from "../../inputs/MUICheckboxes";
import MUIListField from "../../inputs/MUIListField";
import MUIButton from "../../inputs/MUIButton";
import MUIRadios from "../../inputs/MUIRadios";

export default function ListItemView({
	model,
	tagList = null,

	itemData,
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
		const dataModel = model.getDataModel();

		// replace the updated data
		let newLocalItemData = {
			...localItemData,
			[name]: model.processValue(name, value),
		};
		console.log("--handleChange-- newLocalItemData: ", newLocalItemData);

		// update the limitations
		Object.entries({ ...newLocalItemData }).forEach(
			([fieldName, newFieldValue]) => {
				// if the field being updated is in the core data model
				// 	if there are limitations for the field

				if (dataModel[fieldName] && dataModel[fieldName].limitations) {
					console.log("-limitation-");

					// process the limitation

					const processLimitations = (limitations) =>
						limitations.forEach((limitation) => {
							const { field, value } = limitation;
							console.log("limitation: ", limitation);

							// apply new value
							newLocalItemData = {
								...newLocalItemData,
								[field]: value,
							};
						});

					//

					// if string, make array, so we can process all the limitations within an array
					if (typeof newFieldValue === "string") {
						newFieldValue = [newFieldValue];
					}

					// 	for each value selected
					newFieldValue.forEach((newFieldVal) => {
						// 	if there are limitations for that field's value
						if (dataModel[fieldName].limitations[newFieldVal]) {
							const limitations =
								dataModel[fieldName].limitations[newFieldVal]
									.limitations;

							processLimitations(limitations);
						}
					});
				}
			}
		);

		setLocalItemData(newLocalItemData);
	};

	const handleClickSave = () => {
		handleUpdateItem(localItemData);
	};

	const handleClickDelete = () => {
		handleDeleteItem(localItemData);
	};

	// components
	let itemEditingSections = [
		{ section: model.label, modelInit: model.init() },
	];
	if (tagList !== null) {
		itemEditingSections.push({
			section: "Tags",
			modelInit: model.initTags(tagList),
		});
	}

	// render

	if (!localItemData || !modelFields) return <></>;

	return (
		<Box
			className="listItem"
			sx={{
				"> *": {
					borderLeft: "1px solid #ddd",
				},
				"> *:first-of-type, > *:last-of-type": { border: 0 },
			}}
		>
			{localItemData.order ? <Box>{localItemData.order}</Box> : <></>}

			{itemEditingSections.map(({ section, modelInit }, i) => (
				<Box sx={{ flex: i === 0 ? 2 : 1 }} key={i}>
					<Box className="listItem">
						{Object.keys(modelInit).map((name, i) => {
							if (["id", "order"].includes(name))
								return (
									<React.Fragment key={i}></React.Fragment>
								);

							// get field model from model
							let fieldModel = modelFields[name];
							// if no field model, then a tag, create tag field model here
							if (!fieldModel) {
								const options = tagListByName[name].options
									.split("\n")
									.map((option) => ({
										label: option,
										value: option,
									}));
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
									: fieldModel.kind === "radio"
									? MUIRadios
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
					</Box>
				</Box>
			))}

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

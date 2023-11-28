import React, { useState, useEffect, Fragment } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
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
		// replace the updated data
		let newLocalItemData = {
			...localItemData,
			[name]: model.processValue(name, value),
		};

		// update the limitations
		newLocalItemData = model.processLimitations(newLocalItemData);

		setLocalItemData(newLocalItemData);
	};

	const handleClickSave = () => {
		handleUpdateItem(localItemData);
	};

	const handleClickDelete = () => {
		handleDeleteItem(localItemData);
	};

	const handleUpClick = () => {
		handleUpdateItem({ ...localItemData, order: localItemData.order - 1 });
	};
	const handleDownClick = () => {
		handleUpdateItem({ ...localItemData, order: localItemData.order + 1 });
	};

	// ////
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

	// ////
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
			{localItemData.order ? (
				<Box className="flexColumn">
					{localItemData.order}
					<IconButton
						aria-label="move item up"
						onClick={handleUpClick}
					>
						<KeyboardDoubleArrowUpIcon />
					</IconButton>
					<IconButton
						aria-label="move item down"
						onClick={handleDownClick}
					>
						<KeyboardDoubleArrowDownIcon />
					</IconButton>
				</Box>
			) : (
				<></>
			)}

			{itemEditingSections.map(({ section, modelInit }, i) => (
				<Box sx={{ flex: 1 }} key={i}>
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
								// get tag
								const tag = tagListByName[name];
								// create options
								const options = tag.options
									.split("\n")
									.map((option) => ({
										label: option,
										value: option,
									}));
								// console.log("options: ", options);

								const label = (
									<span>
										{name}{" "}
										<sub>
											<sup>
												<sub>({tag.relation})</sub>
											</sup>
										</sub>
									</span>
								);

								fieldModel = {
									label,
									name,
									kind: tag.inputType,
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

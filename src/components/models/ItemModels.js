import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import TagsHome from "../views/pages/TagsHome";
import PromptsHome from "../views/pages/PromptsHome";
import { v4 as uuidv4 } from "uuid";
import PromptResults from "../views/shared/PromptResults";

/////////////////////////////////////////////////////////////////////

// table helper

const generateRows = (list, headers) =>
	Object.values(list).map((listItem) =>
		headers.reduce(
			(rowData, { field }) => ({
				...rowData,
				[field]: listItem[field],
			}),
			{}
		)
	);

const entriesArrToObj = (processedData, [key, value]) => ({
	...processedData,
	[key]: value,
});

/////////////////////////////////////////////////////////////////////

// ////
// DataModel
//
//	grandparent
class DataModel {
	// properties
	type = "generic";
	label = "Generic";

	getStorageKey = () => `writingPrompts-${this.type}`;
}

// ////
// ItemModel
//
//	parent

class ItemModel extends DataModel {
	// properties
	uri = "#";

	//
	// init a new model (will not include order)
	init = (itemDataModel = null) => ({
		id: uuidv4(),

		...Object.entries(itemDataModel ?? this.getDataModel())
			.map(([key, input]) => {
				const initValue = ["textField", "listField", "radio"].includes(
					input.kind
				)
					? ""
					: ["checkbox"].includes(input.kind)
					? []
					: "";
				return [key, initValue];
			})
			.reduce(entriesArrToObj, {}),
	});
	initTags = (tagList) => ({
		...Object.values(tagList)
			.filter(
				(tag) =>
					tag.association === this.label ||
					tag.association.includes(this.label)
			)
			.map((tag) => [tag.name, []])
			.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
	});
	initWithTags = (tagList) => ({
		...this.init(),
		...this.initTags(tagList),
	});

	//
	// process values after submission
	processValue = (name, value) => {
		const m = this.getDataModel()[name];
		if (m && m.processData) return m.processData(value);
		return value;
	};
	processData = (data) =>
		Object.entries(data)
			.map(([key, value]) => {
				const processedValue = this.processValue(key, value);
				return [key, processedValue];
			})
			.reduce(entriesArrToObj, {});
	processLimitations = (newLocalItemData) => {
		const dataModel = this.getDataModel();

		Object.entries({ ...newLocalItemData }).forEach(
			([fieldName, newFieldValue]) => {
				// if the field being updated is in the core data model
				// 	if there are limitations for the field

				if (dataModel[fieldName] && dataModel[fieldName].limitations) {
					// process the limitation

					const processLimitations = (limitations) =>
						limitations.forEach((limitation) => {
							const { field, value } = limitation;

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
		return newLocalItemData;
	};

	//
	// get the input model
	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
	});
	getModelFields = () => this.getDataModel();

	//
	// table transformation
	getTableHeaders = (tagData) => [
		{ field: "order", headerName: "#" },
		...Object.values(this.getDataModel()).map((dataRow) => ({
			field: dataRow.name,
			headerName: dataRow.label,
		})),
		...tagData.map((tag) => ({ field: tag, headerName: tag })),
	];
	transformToTableData = (listData, tagData = []) => {
		const tableHeaders = this.getTableHeaders(tagData);
		return [tableHeaders, generateRows(listData, tableHeaders)];
	};
}

/////////////////////////////////////////////////////////////////////

// ////
// Item Models
//
// extends ItemModel (which extends DataModel)

// //
// PromptModel
export class PromptModel extends ItemModel {
	constructor() {
		super();
		this.type = "prompt";
		this.label = "Prompt";
		this.uri = "/prompts";
	}

	homeElement = PromptsHome;

	// override
	getDataModel = () => ({
		category: { label: "Category", name: "category", kind: "textField" },
		prompts: { label: "Prompts", name: "prompts", kind: "listField" },
	});
}

// //
// CharacterModel
export class CharacterModel extends ItemModel {
	constructor() {
		super();
		this.type = "character";
		this.label = "Character";
		this.uri = "/characters";
	}

	homeElement = CharactersHome;
}

// //
// TagModel
export class TagModel extends ItemModel {
	type = "tag";
	label = "Tag";
	uri = "/tags";

	homeElement = TagsHome;

	// override
	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
		options: {
			label: "Options",
			name: "options",
			kind: "listField",
			processValue: (value) => {
				// console.log("options--- value: ", value);
				if (typeof value === "string") {
					// console.log("replacing");
					value = value.replace(/,/gi, "\n");
				}
				return value;
			},
		},
		inputType: {
			label: "Input Type",
			name: "inputType",
			kind: "radio",
			options: [
				{ label: "Radios (single select)", value: "radio" },
				{ label: "Checkboxes (multiple select)", value: "checkbox" },
			],
		},
		association: {
			label: "Association",
			name: "association",
			kind: "checkbox",
			options: [
				{ label: "Character", value: "Character" },
				{ label: "Prompt", value: "Prompt" },
				{
					label: "None",
					value: "None",
				},
			],
			limitations: {
				None: {
					option: "None",
					limitations: [
						{ field: "association", value: ["None"] },
						{ field: "relation", value: "generator" },
					],
				},
			},
		},
		relation: {
			label: "Relation",
			name: "relation",
			kind: "radio",
			options: [
				{ label: "Tag Only", value: "tag" },
				{ label: "Include in Generation", value: "generator" },
			],
		},
	});
}

// ////
// DataModels
//
// extends DataModel

// ////
// GeneratorModel
export class GeneratorModel extends DataModel {
	constructor() {
		super();
		this.type = "generator";
		this.label = "Generator";
		this.uri = "#";
	}
}

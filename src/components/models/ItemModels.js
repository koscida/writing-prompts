import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import TagsHome from "../views/pages/TagsHome";
import PromptsHome from "../views/pages/PromptsHome";
import { v4 as uuidv4 } from "uuid";
import PromptResults from "../views/shared/PromptResults";

// ////
// ItemModel
//
//	parent

class ItemModel {
	// properties
	label = "Generic";
	type = "generic";
	getStorageKey = () => `writingPrompts-${this.type}`;

	// init a new model
	init = () => ({ id: uuidv4(), name: "" });
	initTags = (tagList) => ({
		...Object.values(tagList)
			.filter((tag) => tag.association === this.label)
			.map((tag) => [tag.name, []])
			.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
	});
	initWithTags = (tagList) => ({
		...this.init(),
		...this.initTags(tagList),
	});

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
			.reduce(
				(processedData, [key, value]) => ({
					...processedData,
					[key]: value,
				}),
				{}
			);

	// get the input model
	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
	});
	getModelFields = () => this.getDataModel();

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

// ////
// Models
//
//	children

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
	init = () => ({ id: uuidv4(), category: "", prompts: "" });

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
	init = () => ({
		id: uuidv4(),
		name: "",
		options: "",
		association: [],
		relation: [],
	});

	// override
	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
		options: {
			label: "Options",
			name: "options",
			kind: "listField",
			processValue: (value) => {
				console.log("options--- value: ", value);
				if (typeof value === "string") {
					console.log("replacing");
					value = value.replace(/,/gi, "\n");
				}
			},
		},
		association: {
			label: "Association",
			name: "association",
			kind: "radio",
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
					type: "nullDataOnOptionSelect",
					option: "None",
					field: "relation",
					value: "generator",
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
// ////
// ////
// GeneratorModel
export class GeneratorModel extends ItemModel {
	constructor() {
		super();
		this.type = "generator";
		this.label = "Generator";
		this.uri = "#";
	}

	homeElement = PromptResults;
}

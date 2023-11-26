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
	type = "generic";
	getStorageKey = () => `writingPrompts-${this.type}`;

	// init a new model
	init = () => ({ id: uuidv4(), name: "" });
	initWithTags = (tagList) => ({
		...this.init(),
		...Object.values(tagList)
			.filter((tag) => tag.association.includes(this.type))
			.map((tag) => [tag.name, []])
			.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
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
		{ field: "name", headerName: "Name" },
		...tagData.map((tag) => ({ field: tag, headerName: tag })),
	];
	transformToTableData = (listData, tagData = []) => {
		const tableHeaders = this.getTableHeaders(tagData);
		return [tableHeaders, generateRows(listData, tableHeaders)];
	};
}

// helper

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

	// override
	getTableHeaders = (tagData) => [
		{ field: "order", headerName: "#" },
		{ field: "category", headerName: "Category" },
		{ field: "prompts", headerName: "Prompts" },
		...tagData.map((tag) => ({ field: tag, headerName: tag })),
	];
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
	init = () => ({ id: uuidv4(), name: "", association: [], options: "" });

	// override
	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
		association: {
			label: "Association",
			name: "association",
			kind: "checkbox",
			options: [
				{ label: "Character", value: "character" },
				{ label: "Prompt", value: "prompt" },
			],
		},
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
	});

	// override
	getTableHeaders = (tagData) => [
		{ field: "order", headerName: "#" },
		{ field: "name", headerName: "Name" },
		{ field: "association", headerName: "Association" },
		{ field: "options", headerName: "Options" },
	];
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

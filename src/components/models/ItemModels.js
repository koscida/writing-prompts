import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import TagsHome from "../views/pages/TagsHome";
import PromptsHome from "../views/pages/PromptsHome";
import { v4 as uuidv4 } from "uuid";

// ////
// ItemModel
//
//	parent

class ItemModel {
	type = "generic";
	getStorageKey = () => `writingPrompts-${this.type}`;

	init = () => ({ id: uuidv4(), name: "" });
	initWithTags = (tagList) => ({
		...this.init(),
		...Object.values(tagList)
			.filter((tag) => tag.association.includes(this.type))
			.map((tag) => [tag.name, []])
			.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
	});

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

	getDataModel = () => ({
		name: { label: "Name", name: "name", kind: "textField" },
	});

	getModelFields = () => this.getDataModel();
}

// ////
// Models
//
//	children

// //
// CharacterModel
export class CharacterModel extends ItemModel {
	constructor(tagModel) {
		super();
		this.tagModel = tagModel;
		this.type = "character";
	}

	homeElement = CharactersHome;
}

// //
// PromptModel
export class PromptModel extends ItemModel {
	constructor(tagModel) {
		super();
		this.tagModel = tagModel;
		this.type = "prompt";
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
// TagModel
export class TagModel extends ItemModel {
	type = "tag";

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
}

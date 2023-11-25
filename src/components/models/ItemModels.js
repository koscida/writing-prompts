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
	init = () => ({ id: uuidv4(), name: "" });

	processValue = (name, value) => {
		if (this.getDataModel[name])
			return this.getDataModel[name.processData](value);
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
	storageKey = "writingPrompts-characters";

	homeElement = CharactersHome;

	// override
	getModelFields = () => {
		return { ...this.getDataModel() };
	};
}

// //
// PromptModel
export class PromptModel extends ItemModel {
	storageKey = "writingPrompts-prompts";

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
	storageKey = "writingPrompts-tags";

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

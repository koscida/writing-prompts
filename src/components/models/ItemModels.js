import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import TagsHome from "../views/pages/TagsHome";
import PromptsHome from "../views/pages/PromptsHome";
import { v4 as uuidv4 } from "uuid";

// ////
// ItemModel
//	parent

class ItemModel {
	processValue = (name, value) => {
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
}

// ////
// Models
//	children

export class CharacterModel extends ItemModel {
	storageKey = "writingPrompts-characters";

	homeElement = CharactersHome;
	init = () => ({ id: uuidv4(), name: "" });

	getDataModel = () => [{ label: "Name", name: "name", kind: "textField" }];
}

export class PromptModel extends ItemModel {
	storageKey = "writingPrompts-prompts";

	homeElement = PromptsHome;
	init = () => ({ id: uuidv4(), name: "" });

	getDataModel = () => [{ label: "Name", name: "name", kind: "textField" }];
}

export class TagModel extends ItemModel {
	storageKey = "writingPrompts-tags";

	homeElement = TagsHome;
	init = () => ({ id: uuidv4(), name: "", association: [], options: "" });
	processValue = (name, value) => {
		if (name === "options") {
			console.log("options--- name: ", name, ", value: ", value);
			if (typeof value === "string") {
				console.log("replacing");
				value = value.replace(/,/gi, "\n");
			}
		}

		return value;
	};

	getDataModel = () => [
		{ label: "Name", name: "name", kind: "textField" },
		{
			label: "Association",
			name: "association",
			kind: "checkbox",
			options: [
				{ label: "Character", value: "character" },
				{ label: "Prompt", value: "prompt" },
			],
		},
		{ label: "Options", name: "options", kind: "listField" },
	];
}

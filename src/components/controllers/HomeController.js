import React from "react";
import {
	CharacterModel,
	PromptModel,
	TagModel,
	GeneratorModel,
} from "../models/ItemModels";
import Home from "../views/pages/Home";
import PromptGenerator from "./PromptGenerator";
import useLocalStorage from "../data/useLocalStorage";

export default function HomeController() {
	// ////
	// variables

	// get all models
	const characterModel = new CharacterModel();
	const promptModel = new PromptModel();
	const tagModel = new TagModel();
	const generatorModel = new GeneratorModel();

	// local data (read-only)
	const [characterList] = useLocalStorage(characterModel.getStorageKey(), {});
	const [promptList] = useLocalStorage(promptModel.getStorageKey(), {});
	const [tagList] = useLocalStorage(tagModel.getStorageKey(), {});

	// prompt generator
	const [generatedPrompts, setGeneratedPrompts] = useLocalStorage(
		generatorModel.getStorageKey(),
		{}
	);

	// ////
	// process data

	// tag data
	const getTags = (tagAssociation) =>
		Object.values(tagList)
			.filter((tag) => tag.association === tagAssociation)
			.reduce((tags, tag) => [...tags, tag.name], []);
	const characterTags = getTags("Character");
	const promptTags = getTags("Prompt");
	console.log("characterTags: ", characterTags, ", promptTags: ", promptTags);

	// get table data
	const characterTableData = characterModel.transformToTableData(
		characterList,
		characterTags
	);
	const promptTableData = promptModel.transformToTableData(
		promptList,
		promptTags
	);
	const tagTableData = tagModel.transformToTableData(tagList);

	// ////
	// generator

	// create the generator

	const promptGenerator = (
		<PromptGenerator
			generatorModel={generatorModel}
			characterList={characterList}
			promptList={promptList}
			tagList={tagList}
		/>
	);

	return (
		<Home
			promptGenerator={promptGenerator}
			characterTableData={characterTableData}
			promptTableData={promptTableData}
			tagTableData={tagTableData}
		/>
	);
}

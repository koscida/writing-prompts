import React from "react";
import {
	CharacterModel,
	PromptModel,
	TagModel,
	ResultsModel,
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
	const resultsModel = new ResultsModel();

	// local data (read-only)
	const [characterList] = useLocalStorage(characterModel.getStorageKey(), {});
	const [promptList] = useLocalStorage(promptModel.getStorageKey(), {});
	const [tagList] = useLocalStorage(tagModel.getStorageKey(), {});

	// ////
	// process data

	// tag data
	const characterTags = Object.keys(characterModel.initTags(tagList));
	const promptTags = Object.keys(promptModel.initTags(tagList));
	// console.log("characterTags: ", characterTags, ", promptTags: ", promptTags);

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
			resultsModel={resultsModel}
			promptModel={promptModel}
			promptList={promptList}
			characterModel={characterModel}
			characterList={characterList}
			tagList={tagList}
			tagModel={tagModel}
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

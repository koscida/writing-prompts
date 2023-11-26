import React from "react";
import useLocalStorage from "../data/useLocalStorage";
import PromptResults from "../views/shared/PromptResults";

export default function PromptGenerator({
	generatorModel,
	promptList,
	characterList,
	tagList,
}) {
	// ////
	// generator

	const getRandom = (list) => {
		const listLen = list.length;
		const randIdx = Math.floor(Math.random() * listLen);
		const listEle = list[randIdx];
		return listEle;
	};

	//
	// prompt results

	const promptArr = Object.values(promptList);

	const prompts = [1, 2, 3].map((id) => {
		const promptCategory = getRandom(promptArr);
		const category = promptCategory.category;

		const prompts = promptCategory.prompts.split("\n");
		const prompt = getRandom(prompts);

		return {
			id,
			category,
			prompt,
		};
	});

	//
	// character results

	const characterArr = Object.values(characterList);

	const characters = [1, 2].map((id) => {
		const character = getRandom(characterArr);
		return {
			id,
			name: character.name,
		};
	});

	//
	// tag results

	const tagArr = Object.values(tagList);

	const tags = tagArr
		.filter((tag) => tag.association.length === 0)
		.map((tag) => {
			const tagOptions = tag.options.split("\n");
			const value = getRandom(tagOptions);
			return { id: tag.id, name: tag.name, value };
		});

	//
	// combine results

	const promptResults = {
		prompts,
		characters,
		tags,
	};

	// results handlers

	const handleSaveResults = () => {};
	const handleGenerateNewResults = () => {};

	// ////
	// render

	return (
		<PromptResults
			promptResults={promptResults}
			handleSaveResults={handleSaveResults}
			handleGenerateNewResults={handleGenerateNewResults}
		/>
	);
}

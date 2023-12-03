import React from "react";
import useLocalStorage from "../data/useLocalStorage";
import PromptResults from "../views/shared/PromptResults";
import ItemFactory from "../models/ItemFactory";

export default function PromptGenerator({
	resultsModel,
	promptModel,
	promptList,
	characterModel,
	characterList,
	tagList,
	tagModel,
}) {
	// prompt generator
	const [generatedPrompts, setGeneratedPrompts] = useLocalStorage(
		resultsModel.getStorageKey(),
		{}
	);
	const generatedPromptsEntries = Object.entries(generatedPrompts);

	// re-store tags
	const tagListByName = Object.values(tagList).reduce(
		(obj, tag) => ({ ...obj, [tag.name]: tag }),
		{}
	);
	// get tags
	const characterTags = Object.keys(characterModel.initTags(tagList));
	const promptTags = Object.keys(promptModel.initTags(tagList));

	// ////
	// generator

	const getRandom = (list) => {
		const listLen = list.length;
		const randIdx = Math.floor(Math.random() * listLen);
		const listEle = list[randIdx];
		return listEle;
	};

	const getStaticTags = (catTags, randItem) =>
		catTags
			.filter(
				(tagName) =>
					tagListByName[tagName] &&
					tagListByName[tagName].relation === "tag"
			)
			.map((tagName) => [tagName, randItem[tagName]])
			.reduce((o, [k, v]) => ({ ...o, [k]: v }), {});

	const getGeneratorTags = (catTags, randItem) =>
		catTags
			.filter(
				(tagName) =>
					tagListByName[tagName] &&
					tagListByName[tagName].relation === "generator"
			)
			.map((tagName) => {
				const tagOption = randItem[tagName]
					? Array.isArray(randItem[tagName])
						? getRandom(randItem[tagName])
						: getRandom(randItem[tagName].split("\n"))
					: "";
				// const tagOption = "";
				return [tagName, tagOption];
			})
			.reduce((o, [k, v]) => ({ ...o, [k]: v }), {});

	// ////
	// prompt results

	const promptArr = Object.values(promptList);

	const prompts = [1, 2, 3].map((id) => {
		// get the rand category
		const promptItem = getRandom(promptArr);
		const category = promptItem.category;
		// get the rand prompt
		const prompts = promptItem.prompts.split("\n");
		const prompt = getRandom(prompts);

		// get the static tags only
		const staticTags = getStaticTags(promptTags, promptItem);
		// console.log("staticTags: ", staticTags);

		// get the rand tags
		const generatorTags = getGeneratorTags(promptTags, promptItem);
		// console.log("generatorTags: ", generatorTags);

		// create results
		return {
			Category: category,
			Prompt: prompt,
			...staticTags,
			...generatorTags,
		};
	});

	// ////
	// character results

	const characterArr = Object.values(characterList);

	const characters = [1, 2].map((id) => {
		// get rand character
		const character = getRandom(characterArr);

		// get the static tags only
		const staticTags = getStaticTags(characterTags, character);
		// console.log("staticTags: ", staticTags);

		// get the rand tags
		const generatorTags = getGeneratorTags(characterTags, character);
		// console.log("generatorTags: ", generatorTags);

		// create results
		return {
			Name: character.name,
			...staticTags,
			...generatorTags,
		};
	});

	// ////
	// tag results

	const tagArr = Object.values(tagList);

	const tags = tagArr
		.filter(
			(tag) =>
				tag.association === "None" || tag.association.includes("None")
		)
		.map((tag) => {
			const tagOptions = tag.options.split("\n");
			const value = getRandom(tagOptions);
			return { Name: tag.name, Option: value };
		});

	// ////
	// combine results

	const promptResults = {
		prompts,
		characters,
		tags,
	};
	// console.log("promptResults: ", promptResults);

	// ////

	// ////
	// results handlers

	const handleAddResult = () => {
		// set the order to be at the last element
		promptResults["order"] = generatedPromptsEntries.length + 1;

		// set the id to be random
		promptResults["id"] = promptModel.init()["id"];

		// save
		console.log("--handleAddResult-- result: ", promptResults);
		setGeneratedPrompts({
			...generatedPrompts,
			[promptResults.id]: promptResults,
		});
	};
	const handleGenerateNewResults = () => {
		setGeneratedPrompts({ ...generatedPrompts });
	};

	// ////
	// render

	return (
		<>
			<PromptResults
				promptResults={promptResults}
				handleGenerateNewResults={handleGenerateNewResults}
				handleAddResult={handleAddResult}
			/>
		</>
	);
}

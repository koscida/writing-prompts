import React from "react";
import { CharacterModel, PromptModel, TagModel } from "../models/ItemModels";
import Home from "../views/pages/Home";
import PromptGenerator from "../models/PromptGenerator";

export default function HomeController() {
	const characterModel = new CharacterModel();
	const promptModel = new PromptModel();
	const tagModel = new TagModel();

	return (
		<PromptGenerator
			characterModel={characterModel}
			promptModel={promptModel}
			tagModel={tagModel}
			view={Home}
		/>
	);
}

import React from "react";
import PromptsHome from "../views/pages/PromptsHome";
import { PromptModel, TagModel } from "../models/ItemModels";
import ItemFactory from "../models/ItemFactory";

export default function PromptsController() {
	const tagModel = new TagModel();
	const promptModel = new PromptModel();

	return (
		<ItemFactory
			model={promptModel}
			tagModel={tagModel}
			view={PromptsHome}
		/>
	);
}

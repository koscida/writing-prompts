import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import { CharacterModel, TagModel } from "../models/ItemModels";
import ItemFactory from "../models/ItemFactory";

export default function CharactersController() {
	const tagModel = new TagModel();
	const characterModel = new CharacterModel();

	return (
		<ItemFactory
			model={characterModel}
			tagModel={tagModel}
			view={CharactersHome}
		/>
	);
}

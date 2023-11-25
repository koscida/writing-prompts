import React from "react";
import CharactersHome from "../views/pages/CharactersHome";
import ListsController from "./ListsController";

export default function CharactersController({ characterModel, tagModel }) {
	return <ListsController model={characterModel} tagModel={tagModel} />;
}

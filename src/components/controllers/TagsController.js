import React from "react";
import { TagModel } from "../models/ItemModels";
import TagsHome from "../views/pages/TagsHome";
import ItemFactory from "../models/ItemFactory";

export default function TagsController() {
	const tagModel = new TagModel();

	return <ItemFactory model={tagModel} view={TagsHome} />;
}

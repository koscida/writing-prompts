import React from "react";
import { ResultsModel, TagModel } from "../models/ItemModels";
import ResultsHome from "../views/pages/ResultsHome";
import ItemFactory from "../models/ItemFactory";

export default function ResultsController() {
	const resultsModel = new ResultsModel();
	const tagModel = new TagModel();

	return (
		<ItemFactory
			model={resultsModel}
			tagModel={tagModel}
			view={ResultsHome}
		/>
	);
}

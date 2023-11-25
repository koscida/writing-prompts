import React from "react";
import ListsController from "./ListsController";

export default function PromptsController({ promptModel, tagModel }) {
	return <ListsController model={promptModel} tagModel={tagModel} />;
}

import Home from "../views/pages/Home";
import ListsController from "../controllers/ListsController";
import { CharacterModel, PromptModel, TagModel } from "../models/ItemModels";

const navigationLinks = {
	Home: [
		{
			to: "/",
			label: "Home",
			element: <Home />,
		},
	],
	Edit: [
		{
			to: "characters",
			label: "Characters",
			element: <ListsController model={new CharacterModel()} />,
		},
		{
			to: "prompts",
			label: "Prompts",
			element: <ListsController model={new PromptModel()} />,
		},

		{
			to: "tags",
			label: "Tags",
			element: <ListsController model={new TagModel()} />,
		},
	],
};

export default navigationLinks;

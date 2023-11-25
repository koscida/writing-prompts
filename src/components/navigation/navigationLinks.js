import Home from "../views/pages/Home";
import PromptsController from "../controllers/PromptsController";
import TagsController from "../controllers/TagsController";
import CharactersController from "../controllers/CharactersController";
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
			element: <CharactersController />,
		},
		{
			to: "prompts",
			label: "Prompts",
			element: <PromptsController />,
		},

		{
			to: "tags",
			label: "Tags",
			element: <TagsController />,
		},
	],
};

export default navigationLinks;

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
			element: (
				<CharactersController
					characterModel={new CharacterModel()}
					tagModel={new TagModel()}
				/>
			),
		},
		{
			to: "prompts",
			label: "Prompts",
			element: (
				<PromptsController
					promptModel={new PromptModel()}
					tagModel={new TagModel()}
				/>
			),
		},

		{
			to: "tags",
			label: "Tags",
			element: <TagsController tagModel={new TagModel()} />,
		},
	],
};

export default navigationLinks;

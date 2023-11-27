import HomeController from "../controllers/HomeController";
import PromptsController from "../controllers/PromptsController";
import TagsController from "../controllers/TagsController";
import CharactersController from "../controllers/CharactersController";
import ResultsController from "../controllers/ResultsController";

const navigationLinks = {
	Home: [
		{
			to: "/",
			label: "Home",
			element: <HomeController />,
		},
	],
	Edit: [
		{
			to: "prompts",
			label: "Prompts",
			element: <PromptsController />,
		},
		{
			to: "characters",
			label: "Characters",
			element: <CharactersController />,
		},
		{
			to: "tags",
			label: "Tags",
			element: <TagsController />,
		},
	],
	Results: [
		{
			to: "results",
			label: "Results",
			element: <ResultsController />,
		},
	],
};

export default navigationLinks;

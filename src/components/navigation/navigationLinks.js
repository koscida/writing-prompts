import Home from "../views/pages/Home";
import Prompts from "../views/pages/Prompts";
import Tags from "../views/pages/Tags";
import CharacterController from "../controllers/CharacterController";

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
			element: <CharacterController />,
		},
		{
			to: "prompts",
			label: "Prompts",
			element: <Prompts />,
		},

		{
			to: "tags",
			label: "Tags",
			element: <Tags />,
		},
	],
};

export default navigationLinks;

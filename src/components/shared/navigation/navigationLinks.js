import Home from "../../home/Home";

const navigationLinks = {
	Home: [
		{
			to: "/",
			label: "Home",
			element: <Home />,
		},
	],
	Collections: [
		{
			to: "shipped",
			label: "Shipped",
			element: <Home />,
		},
	],
};

export default navigationLinks;

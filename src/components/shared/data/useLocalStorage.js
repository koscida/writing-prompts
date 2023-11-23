import React from 'react'

// from: https://www.robinwieruch.de/local-storage-react/#local-storage-in-javascript
const useLocalStorage = (key, initState) => {
	const [value, setValue] = React.useState(
		JSON.parse(localStorage.getItem(key)) ?? initState
	);

	React.useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export default useLocalStorage;
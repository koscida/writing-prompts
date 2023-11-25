import React from "react";
import useLocalStorage from "../data/useLocalStorage";

export default function PromptGenerator({
	characterModel,
	promptModel,
	tagModel,
	view,
}) {
	// ////
	// local data (read-only)

	const [characterList] = useLocalStorage(characterModel.getStorageKey(), {});
	const [promptList] = useLocalStorage(promptModel.getStorageKey(), {});
	const [tagList] = useLocalStorage(tagModel.getStorageKey(), {});

	// ////
	// render

	const View = view;
	return (
		<View
			characterList={characterList}
			promptList={promptList}
			tagList={tagList}
		/>
	);
}

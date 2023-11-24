import React, { useState } from "react";
import useLocalStorage from "../data/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import CharactersHome from "../views/pages/CharactersHome";

const createInitCharacter = () => ({ name: "", id: uuidv4() });

export default function CharacterController() {
	// variables

	const [characters, setCharacters] = useLocalStorage(
		"writingprompts-characters",
		{}
	);
	const [initCharacter, setInitCharacter] = useState(createInitCharacter());

	// handlers

	const handleUpdateCharacter = (newCharacterData) => {
		setCharacters({
			...characters,
			[newCharacterData.id]: newCharacterData,
		});
	};

	const handleDeleteCharacter = (characterData) => {
		// create new list of characters
		//	(transform into array)
		//	filter out the id of the one we are deleting
		//	resort
		// 	reorder
		// 	(transform back into object)
		const newCharacters = Object.values(characters)
			.filter((character) => character.id !== characterData.id)
			.sort((a, b) => a.order > b.order)
			.map((character, i) => ({ ...character, order: i + 1 }))
			.reduce(
				(newCharacters, character) => ({
					...newCharacters,
					[character.id]: character,
				}),
				{}
			);
		setCharacters(newCharacters);
	};

	const handleAddCharacter = (newCharacterData) => {
		newCharacterData["order"] = Object.values(characters).length + 1;
		setCharacters({
			...characters,
			[newCharacterData.id]: newCharacterData,
		});
		setInitCharacter(createInitCharacter());
	};

	const handleClearCharacters = () => {
		setCharacters({});
	};

	// render

	return (
		<CharactersHome
			characters={characters}
			initNewCharacter={initCharacter}
			handleUpdateCharacter={handleUpdateCharacter}
			handleDeleteCharacter={handleDeleteCharacter}
			handleAddCharacter={handleAddCharacter}
			handleClearCharacters={handleClearCharacters}
		/>
	);
}

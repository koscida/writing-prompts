import React, { useState } from "react";
import useLocalStorage from "../data/useLocalStorage";

export default function ListsController({ model, tagModel = null }) {
	// variables

	const [list, setList] = useLocalStorage(model.storageKey, {});
	const [initListItem, setInitListItem] = useState(model.init());

	// handlers

	const handleAddItem = (itemData) => {
		// set the order to be at the last element
		itemData["order"] = Object.values(list).length + 1;
		// console.log("--handleAddItem-- itemData: ", itemData);

		itemData = model.processData(itemData);

		// save
		setList({
			...list,
			[itemData.id]: itemData,
		});
		// reset add new
		setInitListItem(model.init());
	};

	const handleUpdateItem = (newCharacterData) => {
		setList({
			...list,
			[newCharacterData.id]: newCharacterData,
		});
	};

	const handleDeleteItem = (itemData) => {
		// create new list of characters
		//	(transform into array)
		//	filter out the id of the one we are deleting
		//	resort
		// 	reorder
		// 	(transform back into object)
		const newList = Object.values(list)
			.filter((item) => item.id !== itemData.id)
			.sort((a, b) => a.order > b.order)
			.map((item, i) => ({ ...item, order: i + 1 }))
			.reduce(
				(newList, item) => ({
					...newList,
					[item.id]: item,
				}),
				{}
			);
		setList(newList);
	};

	const handleClearList = () => {
		setList({});
	};

	// render
	const ListElement = model.homeElement;

	return (
		<>
			<ListElement
				model={model}
				tagModel={tagModel}
				list={list}
				initListItem={initListItem}
				handleUpdateItem={handleUpdateItem}
				handleDeleteItem={handleDeleteItem}
				handleAddItem={handleAddItem}
				handleClearList={handleClearList}
			/>
		</>
	);
}

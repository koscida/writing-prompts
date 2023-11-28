import React, { useState } from "react";
import useLocalStorage from "../data/useLocalStorage";

export default function ItemFactory({ model, tagModel = null, view }) {
	// ////
	// variables

	const [list, setList] = useLocalStorage(model.getStorageKey(), {});
	const listEntries = Object.entries(list);
	const [tagList, setTagList] = useLocalStorage(
		tagModel ? tagModel.getStorageKey() : "",
		{}
	);

	// ////
	// handlers

	const handleAddItem = (itemData) => {
		// set the order to be at the last element
		itemData["order"] = listEntries.length + 1;
		// console.log("--handleAddItem-- itemData: ", itemData);

		itemData = model.processData(itemData);

		// save
		setList({
			...list,
			[itemData.id]: itemData,
		});
	};

	const handleUpdateItem = (newItemData) => {
		const oldItemData = list[newItemData.id];
		let otherItemUpdates = {};

		// check for order updates
		if (newItemData.order !== oldItemData.order) {
			// check if out of bounds, revert change
			if (
				newItemData.order === 0 ||
				newItemData.order === listEntries.length
			) {
				newItemData.order = oldItemData.order;
			}
			// if moved down one, switch with the other one
			else if (newItemData.order === oldItemData.order + 1) {
				// find the item that will be moving
				let [itemId, updateItem] = listEntries.find(
					([itemId, itemData]) =>
						itemData.order === newItemData.order &&
						itemData.id !== newItemData.id
				);
				// if there are already updates for this item
				updateItem = otherItemUpdates[updateItem.id] ?? updateItem;

				// update the order
				updateItem = { ...updateItem, order: newItemData.order - 1 };
				// add to the list of other item updates
				otherItemUpdates[updateItem.id] = updateItem;
			}
			// if moved up one, switch with the other one
			else if (newItemData.order === oldItemData.order - 1) {
				// find the item that will be moving
				let [itemId, updateItem] = listEntries.find(
					([itemId, itemData]) =>
						itemData.order === newItemData.order &&
						itemData.id !== newItemData.id
				);
				// if there are already updates for this item
				updateItem = otherItemUpdates[updateItem.id] ?? updateItem;

				// update the order
				updateItem = { ...updateItem, order: newItemData.order + 1 };
				// add to the list of other item updates
				otherItemUpdates[updateItem.id] = updateItem;
			}
		}

		// set new data
		setList({
			...list,
			[newItemData.id]: newItemData,
			...otherItemUpdates,
		});
	};

	const handleDeleteItem = (itemData) => {
		// create new list of characters
		//	(transform into array)
		//	filter out the id of the one we are deleting
		//	resort
		// 	reorder
		// 	(transform back into object)
		const newList = listEntries
			.filter(([key, item]) => item.id !== itemData.id)
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

	// ////
	// render

	const ViewElement = view;

	return (
		<>
			<ViewElement
				model={model}
				list={list}
				tagList={tagList}
				handleAddItem={handleAddItem}
				handleUpdateItem={handleUpdateItem}
				handleDeleteItem={handleDeleteItem}
				handleClearList={handleClearList}
			/>
		</>
	);
}

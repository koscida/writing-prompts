import React, { useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";
import ItemClear from "../shared/ItemClear";

export default function CharactersHome({
	model,
	list,
	handleUpdateItem,
	handleDeleteItem,
	handleAddItem,
	handleClearList,
}) {
	return (
		<Box className="page">
			<Paper>
				<h2>Characters</h2>

				<ListView
					model={model}
					list={list}
					handleUpdateItem={handleUpdateItem}
					handleDeleteItem={handleDeleteItem}
				/>
			</Paper>

			<Divider />

			<Paper className="listItem">
				<Box>
					<h3>Add Character</h3>

					<ListItemView
						model={model}
						itemData={model.init()}
						handleUpdateItem={handleAddItem}
					/>
				</Box>
				<Box>
					<h3>Clear Characters</h3>
					<ItemClear
						handleClear={handleClearList}
						label={"characters"}
					/>
				</Box>
			</Paper>
		</Box>
	);
}

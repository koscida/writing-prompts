import React, { useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";
import ItemClear from "../shared/ItemClear";

export default function CharactersHome({
	model,
	list,
	tagList,
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
					tagList={tagList}
					handleUpdateItem={handleUpdateItem}
					handleDeleteItem={handleDeleteItem}
				/>
			</Paper>

			<Divider />

			<Box className="listEditRow">
				<Paper>
					<h3>Add Character</h3>

					<ListItemView
						model={model}
						tagList={tagList}
						itemData={model.initWithTags(tagList)}
						handleUpdateItem={handleAddItem}
					/>
				</Paper>
				<Paper>
					<h3>Clear Characters</h3>
					<ItemClear
						handleClear={handleClearList}
						label={"characters"}
					/>
				</Paper>
			</Box>
		</Box>
	);
}

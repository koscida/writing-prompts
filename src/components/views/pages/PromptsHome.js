import React from "react";
import { Box, Paper, Divider } from "@mui/material";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";
import ItemClear from "../shared/ItemClear";

export default function PromptsHome({
	model,
	list,
	initListItem,
	handleUpdateItem,
	handleDeleteItem,
	handleAddItem,
	handleClearList,
}) {
	return (
		<Box className="page">
			<Paper>
				<h2>Prompts</h2>

				<ListView
					model={model}
					list={list}
					handleUpdateItem={handleUpdateItem}
					handleDeleteItem={handleDeleteItem}
				/>
			</Paper>

			<Divider />

			<Paper className="flexRow">
				<Box>
					<h3>Add Prompt</h3>

					<ListItemView
						model={model}
						itemData={initListItem}
						handleUpdateItem={handleAddItem}
					/>
				</Box>
				<Box>
					<h3>Clear Prompts</h3>
					<ItemClear
						handleClear={handleClearList}
						label={"prompts"}
					/>
				</Box>
			</Paper>
		</Box>
	);
}

import React from "react";
import { Box, Paper, Divider } from "@mui/material";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";
import ItemClear from "../shared/ItemClear";

export default function PromptsHome({
	model,
	list,
	tagList,
	handleUpdateItem,
	handleDeleteItem,
	handleAddItem,
	handleClearList,
}) {
	// console.log("--PromptsHome-- tagList: ", tagList);
	return (
		<Box className="page">
			<Paper>
				<h2>Prompts</h2>

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
					<h3>Add Prompt</h3>

					<ListItemView
						model={model}
						tagList={tagList}
						itemData={model.initWithTags(tagList)}
						handleUpdateItem={handleAddItem}
					/>
				</Paper>
				<Paper>
					<h3>Clear Prompts</h3>
					<ItemClear
						handleClear={handleClearList}
						label={"prompts"}
					/>
				</Paper>
			</Box>
		</Box>
	);
}

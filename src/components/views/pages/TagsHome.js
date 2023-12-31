import React from "react";
import { Box, Divider, Paper } from "@mui/material";
import ItemClear from "../shared/ItemClear";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";

export default function TagsHome({
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
				<h2>Tags</h2>

				<ListView
					model={model}
					list={list}
					handleUpdateItem={handleUpdateItem}
					handleDeleteItem={handleDeleteItem}
				/>
			</Paper>

			<Divider />

			<Box className="listEditRow">
				<Paper>
					<h3>Add Tag</h3>

					<ListItemView
						model={model}
						itemData={model.init()}
						handleUpdateItem={handleAddItem}
					/>
				</Paper>
				<Paper>
					<h3>Clear Tags</h3>
					<ItemClear handleClear={handleClearList} label={"tags"} />
				</Paper>
			</Box>
		</Box>
	);
}

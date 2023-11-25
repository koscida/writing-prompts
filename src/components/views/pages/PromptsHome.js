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
	return (
		<Box className="page flexRow">
			<Box>
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

				<Paper className="listItem">
					<Box>
						<h3>Add Prompt</h3>

						<ListItemView
							model={model}
							tagList={tagList}
							itemData={model.initWithTags(tagList)}
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
			<Box></Box>
		</Box>
	);
}

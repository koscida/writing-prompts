import React, { useState } from "react";
import { Box, Divider, Paper } from "@mui/material";
import ListView from "../shared/ListView";
import ListItemView from "../shared/ListItemView";
import ItemClear from "../shared/ItemClear";
import PromptResults from "../shared/PromptResults";

export default function ResultsHome({
	model,
	list,
	tagList,
	handleDeleteItem,
	handleClearList,
}) {
	const listArr = list ? Object.values(list) : [];

	return (
		<Box className="page">
			<Paper>
				<h2>Generated Results</h2>

				<Box className="list">
					{listArr && listArr.length > 0 ? (
						listArr
							.sort((a, b) => a.order > b.order)
							.map((itemData, i) => (
								<PromptResults
									promptResults={itemData}
									key={i}
								/>
							))
					) : (
						<p>No results saved</p>
					)}
				</Box>
			</Paper>

			<Divider />

			<Box className="listEditRow">
				<Paper>
					<h3>Clear Results</h3>
					<ItemClear
						handleClear={handleClearList}
						label={"results"}
					/>
				</Paper>
			</Box>
		</Box>
	);
}

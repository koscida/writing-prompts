import React, { useState } from "react";
import { Box } from "@mui/material";
import ListItemView from "./ListItemView";

export default function ListView({
	model,
	list,
	tagList = null,
	handleUpdateItem,
	handleDeleteItem,
}) {
	const listArr = list ? Object.values(list) : [];

	// render

	return (
		<Box className="list">
			{listArr && listArr.length > 0 ? (
				listArr
					.sort((a, b) => a.order > b.order)
					.map((itemData, i) => (
						<ListItemView
							key={`${itemData.id}-${i}`}
							model={model}
							itemData={itemData}
							tagList={tagList}
							handleUpdateItem={handleUpdateItem}
							handleDeleteItem={handleDeleteItem}
						/>
					))
			) : (
				<p>No items, add one!</p>
			)}
		</Box>
	);
}

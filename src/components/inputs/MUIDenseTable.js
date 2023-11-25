import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

export default function MUIDenseTable({ columns, rows }) {
	return (
		<Paper sx={{ padding: 0 }}>
			<TableContainer>
				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
						borderSpacing: "0px",
					}}
				>
					<thead>
						<tr>
							{columns.map((column, i) => (
								<th key={i} style={{ textAlign: "left" }}>
									{column.headerName}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<tr
								key={i}
								style={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								{columns.map((column, j) => {
									const value = row[column.field];
									const cellValue = (
										<p>
											{typeof value === "object"
												? (Array.isArray(value)
														? value
														: Object.values(value)
												  ).join(", ")
												: typeof value === "string"
												? value.includes("\n")
													? value
															.split("\n")
															.map((line, i) => (
																<p key={i}>
																	{line}
																</p>
															))
													: value
												: value}
										</p>
									);

									return (
										<td
											key={j}
											style={{
												borderBottom:
													"1px solid rgb(81, 81, 81)",
											}}
										>
											{cellValue}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</TableContainer>
		</Paper>
	);
}

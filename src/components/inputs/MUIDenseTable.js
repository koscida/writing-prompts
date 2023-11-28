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
				<style>{`
        .denseTable {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0px;
			font-family: "Roboto", "Helvetica", "Arial", sans-serif;

			thead {display: table-header-group;}
			tbody {display: table-row-group;}

			tr {
				color: inherit;
				display: table-row;
				vertical-align: middle;
				outline: 0px;

				td, th {
					border-bottom: 1px solid rgb(224, 224, 224);
					font-size: 0.875rem;
					line-height: 1.25rem;
					padding: 4px 8px;
					color: rgba(0, 0, 0, 0.87);
					display: table-cell;
  					vertical-align: inherit;
				}
				th {
					text-align: left;
					font-weight: bold;
					letter-spacing: 0.01071em;
				}
				td {
					font-weight: 400;
				}
			}
			tbody tr:last-child td {
				border-bottom: 0;
			}
			
        }
    `}</style>
				<table className="denseTable">
					<thead>
						<tr>
							{columns.map((column, i) => (
								<th key={i}>{column.headerName}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<tr key={i}>
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
																<span
																	key={i}
																	style={{
																		display:
																			"block",
																	}}
																>
																	{line}
																</span>
															))
													: value
												: value}
										</p>
									);

									return <td key={j}>{cellValue}</td>;
								})}
							</tr>
						))}
					</tbody>
				</table>
			</TableContainer>
		</Paper>
	);
}

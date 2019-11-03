import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    minWidth: 650,
  },
});

export default ({ loading, rows = [] }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Hotel Name</TableCell>
            <TableCell>Guest Name</TableCell>
            <TableCell>Arrival Date</TableCell>
            <TableCell>Departure Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row =>
            <TableRow key={row.id}>
              <TableCell>{row.hotelName}</TableCell>
              <TableCell>{row.guestName}</TableCell>
              <TableCell>{row.arrivalDate}</TableCell>
              <TableCell>{row.departureDate}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

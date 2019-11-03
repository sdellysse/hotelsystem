import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    padding: "1em",
  },
});

export default ({ fieldValues, onSubmit, onFieldChange }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
            <TextField
              required
              label="Hotel Name"
              helperText="Example: Pier 5 Baltimore"
              margin="normal"
              value={fieldValues.hotelName}
              onChange={e => onFieldChange("hotelName", e.target.value)}
            />
        </Grid>
        <Grid item xs={3}>
            <TextField
              required
              label="Guest Name"
              margin="normal"
              helperText="Example: Shawn Dellysse"
              value={fieldValues.guestName}
              onChange={e => onFieldChange("guestName", e.target.value)}
            />
        </Grid>
        <Grid item xs={3}>
            <TextField
              required
              label="Arrival Date"
              helperText="Example: 2019-11-05"
              margin="normal"
              value={fieldValues.arrivalDate}
              onChange={e => onFieldChange("arrivalDate", e.target.value)}
            />
        </Grid>
        <Grid item xs={3}>
            <TextField
              required
              label="Departure Date"
              margin="normal"
              helperText="Example: 2019-11-07"
              value={fieldValues.departureDate}
              onChange={e => onFieldChange("departureDate", e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => onSubmit()}>Add Reservation</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Restaurant = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <form className={classes.form} autoComplete="off" noValidate>
        <TextField
          fullWidth
          required
          autoFocus
          margin="normal"
          id="name"
          label="Restaurant Name"
          variant="outlined"
          defaultValue=""
        />
        <TextField
          fullWidth
          required
          margin="normal"
          id="address"
          label="Address"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="contactperson"
          label="Contact Person"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="contactnumber"
          label="Contact Number"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          label="Email"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          margin="normal"
          id="password"
          label="Password"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="restaurantnumber"
          label="Restaurant Number"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="website"
          label="Restaurant Website"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="currencysymbol"
          label="Currency Symbol"
          defaultValue=""
          helperText=""
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          Sign Up
        </Button>
      </form>
    </Fragment>
  );
};
export default Restaurant;

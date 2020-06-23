import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const Customer = () => {
  const classes = useStyles();

return (
    <Fragment>
      <form className={classes.form} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="cpassword"
          label="Confirm Password"
          type="cpassword"
          id="cpassword"
          autoComplete="current-password"
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

export default Customer;

import React, { Fragment,useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';

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
  const [values, setValues] = useState({});
  const [validator, setValidator] = useState(new SimpleReactValidator());

  const handleSubmit = event => {
    event.preventDefault();
    console.log(validator);
    if (validator.allValid()) {
      alert('You submitted the form and stuff!');
    } else {
      validator.showMessages();
      console.log('not valid form');
    }
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    });

    console.log(values);
  };


return (
    <Fragment>
      <form className={classes.form} onSubmit={handleSubmit} >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('email')}
          error={validator.errorMessages.email}
          helperText={validator.message(
            'email',
            values.email,
            'required|email',
            { element: false }
          )}
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
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('password')}
          error={validator.errorMessages.password}
          helperText={validator.message(
            'password',
            values.password,
            'required|[password]',
            { element: false }
          )}
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
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('cpassword')}
          error={validator.errorMessages.cpassword}
          helperText={validator.message(
            'cpassword',
            values.password,
            'required|[cpassword]',
            { element: false }
          )}
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

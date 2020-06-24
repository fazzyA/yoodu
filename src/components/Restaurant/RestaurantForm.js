import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

const Restaurant = () => {
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
      <form className={classes.form}  onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          autoFocus
          margin="normal"
          id="name"
          label="Restaurant Name"
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('name')}
          error={validator.errorMessages.name}
          helperText={validator.message(
            'name',
            values.name,
            'required|name',
            { element: false }
          )}
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
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('address')}
          error={validator.errorMessages.address}
          helperText={validator.message(
            'address',
            values.address,
            'required|address',
            { element: false }
          )}
      />
        <TextField
          fullWidth
          margin="normal"
          id="contactperson"
          label="Contact Person"
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('contactperson')}
          error={validator.errorMessages.email}
          helperText={validator.message(
            'contactperson',
            values.contactperson,
            'required|contactperson',
            { element: false }
          )}
     />
        <TextField
          fullWidth
          margin="normal"
          id="contactnumber"
          label="Contact Number"
          defaultValue=""
          helperText=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('contactnumber')}
          error={validator.errorMessages.contactnumber}
          helperText={validator.message(
            'contactnumber',
            values.contactnumber,
            'required|phone',
            { element: false }
          )}
      />
        <TextField
          fullWidth
          required
          margin="normal"
          id="email"
          label="Email"
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('email')}
          error={validator.errorMessages.email}
          helperText={validator.message(
            'email',
            values.email,
            'required|email',
            { element: false }
          )}
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
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('password')}
          error={validator.errorMessages.password}
          helperText={validator.message(
            'password',
            values.password,
            'required|min:6',
            { element: false }
          )}
      />
        <TextField
          fullWidth
          margin="normal"
          id="restaurantnumber"
          label="Restaurant Number"
          defaultValue=""
          helperText=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('restaurantnumber')}
          error={validator.errorMessages.restaurantnumber}
          helperText={validator.message(
            'restaurantnumber',
            values.restaurantnumber,
            'required|phone',
            { element: false }
          )}
     />
        <TextField
          fullWidth
          margin="normal"
          id="website"
          label="Restaurant Website"
          defaultValue=""
          helperText=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('website')}
          error={validator.errorMessages.website}
          helperText={validator.message(
            'website',
            values.website,
            'url',
            { element: false }
          )}
      />
        <TextField
          fullWidth
          margin="normal"
          id="currencysymbol"
          label="Currency Symbol"
          defaultValue=""
          helperText=""
          variant="outlined"
          onChange={handleChange}
          onBlur={() => validator.showMessageFor('currencysymbol')}
          error={validator.errorMessages.currencysymbol}
          helperText={validator.message(
            'valid currency symbol',
            values.currencysymbol,
            'required|currencysymbol',
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
export default Restaurant;

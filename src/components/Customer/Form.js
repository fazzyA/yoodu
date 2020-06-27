import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import registerAction from '../../Store/actions/registerAction';
import { clearErrors } from '../../Store/actions/errorActions';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Customer = props => {
  const classes = useStyles();
  const [values, setValues] = useState({
    role: 'customer',
    joinedAt: Date.now()
  });
  const [validator, setValidator] = useState(new SimpleReactValidator({}));

  useEffect(() => {
    console.log(validator);
    validator.purgeFields();
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    validator.showMessages();

    // console.log(validator.fieldValid('email'));
    // console.log(validator);
  });

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(validator);
    if (validator.allValid()) {
      await props
        .registerAction(values)
        .then(user => {
          console.log(user);
        })
        .catch(e => console.log(e));
      // setValues({});
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

  if (
    props.authState.loggedIn &&
    props.authState.currentUser.role === 'customer'
  ) {
    // console.log("#############inside############")
    return <Redirect to="/home" />;
  } else
    return (
      <Fragment>
        <form className={classes.form} onSubmit={handleSubmit}>
          {props.errorState.status === 'error' ? (
            <Alert severity="error">{props.errorState.msg}</Alert>
          ) : (
            ''
          )}

          <TextField
            required
            variant="outlined"
            margin="normal"
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
            required
            variant="outlined"
            margin="normal"
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
              'required|min:6'
            )}
            autoComplete="current-password"
          />
          <TextField
            required
            variant="outlined"
            margin="normal"
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            onChange={handleChange}
            onBlur={() => validator.showMessageFor('cpassword')}
            error={validator.errorMessages.cpassword}
            helperText={validator.message(
              'cpassword',
              values.cpassword,
              `required|in:${values.password}`,
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

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  registerAction: values => dispatch(registerAction(values)),
  clearErrors: () => dispatch(clearErrors())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Customer)
);

import React, { Fragment, useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GlobalContext } from '../../context/GlobalState';
import { Footer } from '../../layout-components';
import Avatar from '@material-ui/core/Avatar';
import projectLogo from '../../assets/images/yoodu-logo.jpeg';
import SimpleReactValidator from 'simple-react-validator';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    // width : "20vh",
    height: '20vh'
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const val = useContext(GlobalContext);

  const [values, setValues] = useState({});
  const [validator, setValidator] = useState(new SimpleReactValidator());

  const handleSubmit = event => {
    event.preventDefault();
    // const newUser = { email, password };
    // console.log('newUser');
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    });
    
    console.log(values);
  };

  // let validator = new SimpleReactValidator();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    validator.showMessages();
    console.log(validator.fieldValid('email') )
    console.log(validator);
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.avatar} alt="Yoodu" src={projectLogo} />

        <Typography component="h1" variant="h5">
          Yoodu
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required="true"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            error={validator.errorMessages.email  }
            helperText={validator.message('email', values.email, 'required|email')}
          />
          
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={validator.errorMessages.password  }
            helperText={validator.message('password', values.password, 'required|min:6')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => {
                  const { history } = props;
                  history.push('forgot');
                }}
                component="button"
                variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => {
                  const { history } = props;
                  history.push('signup');
                }}
                component="button"
                variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}

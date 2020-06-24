import React, { Fragment, useState, useContext } from 'react';
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

export default function ForgotPassword(props) {
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
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      // setValidator({showMessages:true})
    }
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
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link
                onClick={() => {
                  const { history } = props;
                  history.push('login');
                }}
                component="button"
      
                variant="body2">
                {"Login"}
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

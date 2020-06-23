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
import TabsBasic from '../../example-components/Tabs/TabsBasic';
import Restaurant from '../../components/Restaurant/RestaurantForm';
import Customer from '../../components/Customer/Form';

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

export default function SignUp() {
  const classes = useStyles();
  const val = useContext(GlobalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const newUser = { email, password };
    console.log('newUser');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.avatar} alt="Yoodu" src={projectLogo} />

        <Typography component="h1" variant="h5">
          Yoodu
        </Typography>

        <TabsBasic>
          <Customer />
          <Restaurant />
        </TabsBasic>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}

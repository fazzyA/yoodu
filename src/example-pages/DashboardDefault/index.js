import React, { Fragment, useEffect, useState } from 'react';

import { PageTitle } from '../../layout-components';
import {
  Grid,
  Badge,
  Card,
  Button,
  List,
  ListItem,
  Divider,
  Typography,
  TextField
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { getUser, updateRestaurant } from '../../Store/actions/userAction';
import { clearErrors } from '../../Store/actions/errorActions';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from "react-qr-code";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Row = props => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Typography variant="body2" color="textSecondary">
          {props.label}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body2">{props.data}</Typography>
      </Grid>
    </Grid>
  );
};

function DashboardDefault(props) {
  const [mode, setMode] = useState('View');
  const [values, setValues] = useState({});
  const classes = useStyles();
  const handleSPClick = action => {
    setMode(action);
    console.log(action);
  };

  useEffect(() => {
    (async () => props.getUser())();
    console.log(`props.authState.loggedIn : ${props.authState.loggedIn}`);
  }, []);

  useEffect(() => {
    console.log(props.userState.detail);
    if (props.userState.detail) setValues({ ...props.userState.detail });

    console.log(values);
  }, [props.userState]);

  const [validator, setValidator] = useState(new SimpleReactValidator());
  const [saveAlert, setSaveAlert] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    console.log(validator);
    if (validator.allValid()) {
      await props.updateRestaurant(values);
      setSaveAlert(true);
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

  console.log(values);

  if (props.userState.detail === undefined) {
    console.log('#############inside############');
    return (
      <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
        <div className="w-50 mx-auto">
          <LinearProgress />
        </div>
      </div>
    );
  } else {
    const { detail } = props.userState;
    console.log(detail);
    console.log(props.userState.detail.name);
    return (
      <Fragment>
        <PageTitle
          titleHeading="Home"
          titleDescription="The Resturant Detail Page."
          actionClicked={handleSPClick}
          displayBtn={true}
        />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <Card className="p-4 mb-4">
              {mode === 'View' ? (
                <>
                  {/* {Object.keys(detail).map(key => {
console.log(key)
              return <Row label={key} data={detail[key]}/> 
            })} */}

                  <Row label={'Name'} data={detail.name} />
                  <Row label={'Address'} data={detail.address} />
                  <Row label={'Contact Person'} data={detail.contactperson} />
                  <Row label={'Contact Number'} data={detail.contactnumber} />
                  <Row
                    label={'Restaurant Number'}
                    data={detail.restaurantnumber}
                  />
                  <Row label={'Website'} data={detail.website} />
                  <Row label={'Currency Symbol'} data={detail.currencysymbol} />
                </>
              ) : mode === 'Edit' ? (
                <form className={classes.form} onSubmit={handleSubmit}>
                  {props.errorState.status === 'error' ? (
                    <Alert severity="error">{props.errorState.msg}</Alert>
                  ) : (
                    ''
                  )}
                  {saveAlert ? (
                    <Alert severity="success">
                      Changes have been save successfully.
                    </Alert>
                  ) : (
                    ''
                  )}

                  <TextField
                    fullWidth
                    required
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Restaurant Name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('name')}
                    error={validator.errorMessages.name}
                    helperText={validator.message(
                      'name',
                      values.name,
                      'required',
                      { element: false }
                    )}
                  />
                  <TextField
                    fullWidth
                    required
                    margin="normal"
                    id="address"
                    value={values.address}
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
                      'required',
                      { element: false }
                    )}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="contactperson"
                    label="Contact Person"
                    defaultValue=""
                    value={values.contactperson}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('contactperson')}
                    error={validator.errorMessages.email}
                    helperText={validator.message(
                      'contactperson',
                      values.contactperson,
                      'required',
                      { element: false }
                    )}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="contactnumber"
                    label="Contact Number"
                    defaultValue=""
                    value={values.contactnumber}
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
                    margin="normal"
                    id="restaurantnumber"
                    label="Restaurant Number"
                    defaultValue=""
                    helperText=""
                    value={values.restaurantnumber}
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
                    value={values.website}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('website')}
                    error={validator.errorMessages.website}
                    helperText={validator.message(
                      'website',
                      values.website,
                      'url',
                      {
                        element: false
                      }
                    )}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="currencysymbol"
                    label="Currency Symbol"
                    defaultValue=""
                    helperText=""
                    value={values.currencysymbol}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={() => validator.showMessageFor('currencysymbol')}
                    error={validator.errorMessages.currencysymbol}
                    helperText={validator.message(
                      'valid currency symbol',
                      values.currencysymbol,
                      'required',
                      { element: false }
                    )}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Save
                  </Button>
                </form>
              ) : (
                
                <QRCode value={detail.id} />
              )}
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  updateRestaurant: restaurant => dispatch(updateRestaurant(restaurant)),
  clearErrors: () => dispatch(clearErrors())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardDefault)
);

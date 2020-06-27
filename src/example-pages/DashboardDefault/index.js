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
import { getUser } from '../../Store/actions/userAction';
import { clearErrors } from '../../Store/actions/errorActions';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Row = (props)=> {
  return    <Grid container spacing={4}>
  <Grid item xs={12} sm={3}>
  <Typography variant="body2" color="textSecondary">
      {props.label}
    </Typography>
  </Grid>
  <Grid item xs={12} sm={6}>
  <Typography variant="body2" >
      {props.data}
    </Typography>
  </Grid>
</Grid>
}

function DashboardDefault(props) {
  const [mode,setMode] = useState("view");
  const [values, setValues] = useState({
    role: 'restaurant',
    joinedAt: Date.now()
  });
  const handleEditClick =()=>{
    setMode("edit")
    console.log("open edit panel")
  }

  useEffect(() => {
    (async () => props.getUser())();
    console.log(`props.authState.loggedIn : ${props.authState.loggedIn}`);
  }, []);

  if (props.userState.detail === undefined) {
    console.log('#############inside############');
    return (
      <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
        <div className="w-50 mx-auto">
          <LinearProgress />
        </div>
      </div>
    );
  } 
  else
  { 
    const {detail} = props.userState ;
    console.log(detail)
    console.log(props.userState.detail.name)
    return (
      <Fragment>
        <PageTitle
          titleHeading="Home"
          titleDescription="The Resturant Detail Page."
          editClicked={handleEditClick}
        />
        <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
       {mode === 'view'?
        <Card className="p-4 mb-4">
            {/* {Object.keys(detail).map(key => {
console.log(key)
              return <Row label={key} data={detail[key]}/> 
            })} */}
            
            <Row label={"Name"} data={detail.name}/>
            <Row label={"Address"} data={detail.address}/>
            <Row label={"Contact Person"} data={detail.contactperson}/>
            <Row label={"Contact Number"} data={detail.contactnumber}/>
            <Row label={"Restaurant Number"} data={detail.restaurantnumber}/>
            <Row label={"Website"} data={detail.website}/>
            <Row label={"Currency Symbol"} data={detail.currencysymbol}/>
        
          </Card>
:
""
}
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
  clearErrors: () => dispatch(clearErrors())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardDefault)
);

import React, { Fragment, useEffect, useState } from 'react';
import { PageTitle } from '../../layout-components';
import {
  Grid,
  Card,
  Typography} from '@material-ui/core';

  import { connect } from 'react-redux';
  import {
  getCategory,  
  } from '../../Store/actions/restaurantAction';
  

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
const ProductForm = (props) => {
 const [cat,setCat] =useState({});
  useEffect(() => {
    if(props.restaurantState.attributes.id)

    (async () => {
      await props.listCategories();
    })();
  }, [props.restaurantState.attributes]);
  return (
    <Fragment>
      <PageTitle
        displayPrint="none"
        titleHeading="Home"
        titleDescription="The Resturant Detail Page."
//        actionClicked={handleSPClick}
        displayBtn={false}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <Card className="p-4 mb-4" displayPrint="block">
            {/* <Row label={'Name'} data={detail.name} />
            <Row label={'Address'} data={detail.address} />
            <Row label={'Contact Person'} data={detail.contactperson} />
            <Row label={'Contact Number'} data={detail.contactnumber} />
            <Row label={'Restaurant Number'} data={detail.restaurantnumber} />
            <Row label={'Website'} data={detail.website} />
            <Row label={'Currency Symbol'} data={detail.currencysymbol} /> */}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  getCategory: id => dispatch(getCategory(id)),
  // clearErrors: () => dispatch(clearErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);



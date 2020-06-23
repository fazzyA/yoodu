import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Box, Typography, Tabs, Tab } from '@material-ui/core';
import Restaurant from '../../../components/Restaurant/RestaurantForm';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop : theme.spacing(4),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  bar: {
    // justifyContent: 'space-between !important'
  }
}));

export default function LivePreviewExample(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" color="default"> */}
        <Tabs
          value={value}
          className={classes.bar}
          onChange={handleChange}
          aria-label="register">
          <Tab label="Customer" />
          <Tab label="Restaurant" />
        </Tabs>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        {props.children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {props.children[1]}
      </TabPanel>
    </div>
  );
}

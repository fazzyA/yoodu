import React, { Fragment } from 'react';

import clsx from 'clsx';

import { Paper, List, ListItem, ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';

const Footer = props => {
  const { footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed
        })}>
        <div className="app-footer--inner">
          <div className="app-footer--first">
            {/* <List dense className="d-flex align-items-center">
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component="a"
                href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-free"
                target="_blank"
                rel="noopener">
                <ListItemText primary="Download now" />
              </ListItem>
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component="a"
                href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-pro"
                target="_blank"
                rel="noopener">
                <ListItemText primary="View PRO Version" />
              </ListItem>
            </List> */}
          </div>
          <div className="app-footer--second">
            <span>Yoodu Admin Dashboard </span> ©
            2020 
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed
});
export default connect(mapStateToProps)(Footer);

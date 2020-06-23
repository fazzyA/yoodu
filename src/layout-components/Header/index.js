import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip
} from '@material-ui/core';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import projectLogo from '../../assets/images/yoodu-logo.jpeg';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;

  return (
    <Fragment>
      <AppBar
        color="default"
        className={clsx('app-header', {})}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
         
            <Box
              className="app-logo-wrapper"
              title="Yoodu">
              <Link to="/DashboardDefault" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="Yoodu"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">Yoodu</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
              {/* <Button
                href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-free"
                target="_blank"
                size="small"
                variant="contained"
                color="default"
                className="mr-3">
                Download now
              </Button>
              <Button
                href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-pro"
                target="_blank"
                size="small"
                variant="contained"
                color="primary">
                View PRO Version
              </Button> */}
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
          <Button
          onClick={() => {
            const {history} = props;
            history.push('login');
            }
           }
                size="small"
                variant="contained"
                color="default"
                className="mr-3">
                Sign In 
              </Button>

              <Button
                size="small"
                variant="contained"
                color="primary">
                Sign Up
              </Button>
            <HeaderUserbox />
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium">
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

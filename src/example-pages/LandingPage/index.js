import React, { Fragment } from 'react';
import clsx from 'clsx';

import { Grid, Container, Button, Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Sidebar, Header, Footer } from '../../layout-components';

import hero9 from '../../assets/images/hero-bg/hero-5.jpg';

const LandingPage = (props) => {
  const {
    children,
    sidebarToggle,
    sidebarFixed,
    footerFixed,
    contentBackground
  } = props;

  return (
       <Fragment>
      <div className={clsx('app-wrapper', contentBackground)}>
        <Header />
        <div
          className={clsx('app-main', {
            'app-main-sidebar-static': !sidebarFixed
          })}>
          <div
            className={clsx('app-content', {
              'app-content-sidebar-collapsed': sidebarToggle,
              'app-content-sidebar-fixed': sidebarFixed,
              'app-content-footer-fixed': footerFixed
            })}>
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default LandingPage;

import React, { Fragment } from 'react';
import clsx from 'clsx';


import { Header, Footer } from '../../layout-components';


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

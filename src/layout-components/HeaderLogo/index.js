import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

import projectLogo from '../../assets/images/yoodu-logo.jpeg';

const HeaderLogo = props => {
  return (
    <Fragment>
      <div className={clsx('app-header-logo', {})}>
        <Box
          className="header-logo-wrapper"
          title="Yoodu">
          <Link to="/DashboardDefault" className="header-logo-wrapper-link">
            <IconButton
             color="primary"
              size="medium"
              //className="header-logo-wrapper-btn"
              >
              <img
                className="app-header-logo-img"
                alt="Yoodu"
                src={projectLogo}
              />
            </IconButton>
          </Link>
          <Box className="header-logo-text">Yoodu</Box>
        </Box>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;

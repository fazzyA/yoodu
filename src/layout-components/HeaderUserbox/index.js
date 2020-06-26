import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import logoutAction from '../../Store/actions/logoutAction';
import { clearErrors } from '../../Store/actions/errorActions';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Avatar,
  Box,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';

import avatar5 from '../../assets/images/avatars/avatar5.jpg';
import withData from '../../components/WithData';

function HeaderUserbox(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // let { currentUser } = props.authState.currentUser;

  useEffect(() => {
    console.log(props.authState);
    setCurrentUser(props.authState.currentUser)  
    
  });
  // const { currentUser } = props.authState.currentUser;

  if (props.authState.currentUser === undefined) {
    console.log('#############inside############');
    return <></>;
  }
  else
  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <Avatar alt="Remy Sharp" className="bg-malibu-beach">
         
          </Avatar>
        </Box>
        <div className="d-none d-xl-block pl-3">
          <div className="font-weight-bold pt-2 line-height-1">
            {currentUser? currentUser.email : ""}
          </div>
          <span className="text-white-50">{currentUser? currentUser.email : ""}</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            {/* <Box>
            <Avatar alt="Remy Sharp">
              R
              </Avatar>
            </Box> */}
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
              {currentUser? currentUser.email : ""}
              </div>
              <span className="text-black-50 text-center">
              {currentUser? currentUser.role : ""}
              </span>
            </div>
            <Divider className="w-100 mt-2" />
            <ListItem button>My Account</ListItem>
            {/* <ListItem button>Logout</ListItem> */}
            {/* <ListItem button>Active tasks</ListItem> */}
            <Divider className="w-100" />
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              {/* <Tooltip arrow title="Twitter"> */}
              <Button color="default" className="text-twitter" onClick={()=>{
                props.logoutAction();
                
              }
                }>
                <span className="btn-wrapper--icon">Sign Out</span>
              </Button>
              {/* </Tooltip> */}
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logoutAction()),
  clearErrors: () => dispatch(clearErrors())
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderUserbox)
);

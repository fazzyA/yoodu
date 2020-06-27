import React, { Fragment } from 'react';

import { Paper } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ListIcon from '@material-ui/icons/List';

const actions = [
  { icon: <EditIcon />, name: 'Edit' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  // { icon: <ShareIcon />, name: 'Share' },
  // { icon: <FavoriteIcon />, name: 'Like' }
];

function PageTitle(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (action) => {
    console.log(action)
    if(action === "Edit")
       props.editClicked();
    setOpen(false);
  };

  return (
    <Fragment>
      <Paper square elevation={2} className="app-page-title">
        <div>
          <div className="app-page-title--first">
            <div className="app-page-title--heading">
              <h1>{props.titleHeading}</h1>
              <div className="app-page-title--description">
                {props.titleDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="speedial-wrapper">
            <SpeedDial
              ariaLabel="SpeedDial menu"
              icon={<SpeedDialIcon openIcon={<ListIcon />} />}
              onClose={handleClose}
              onOpen={handleOpen}
              direction="left"
              open={open}>
              {actions.map(action => (
                <SpeedDialAction
                  id={action.name}
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleClick(action.name)}
                />
              ))}
            </SpeedDial>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
}

export default PageTitle;

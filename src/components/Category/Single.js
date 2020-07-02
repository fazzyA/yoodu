import React from 'react';
import PageTitle from '../../layout-components/PageTitle';
import {
  Grid,
  Badge,
  Card,
  Switch,
  Button,
  Divider,
  Typography,
  Fab,
  FormGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  setMiddle: {
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  centerit: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Single(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
console.log(props)
  return (
        <React.Fragment>
      <PageTitle titleHeading="Menu" titleDescription="Categories Detail" />
      <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
     
      <div className={classes.centerit}>
        <Fab color="primary" aria-label="add" className="mt-4" onClick={()=>props.history.push(`/category/${props.match.params.catid}/add`)}>
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
}

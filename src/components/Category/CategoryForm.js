import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import PageTitle from '../../layout-components/PageTitle';
import IconButton from '@material-ui/core/IconButton';
import TextBox from '../easyEdit/TextBox';

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
import {
  addCategory,
  listCategories
} from '../../Store/actions/restaurantAction';

// import classes from '*.module.css';

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

const DragHandle = SortableHandle(() => {
  const classes = useStyles();

  return (
    <ListItemIcon className={classes.setMiddle}>
      <DragIndicatorIcon color="default" />
    </ListItemIcon>
  );
});

const SortableItem = SortableElement(({ text }) => {
  const classes = useStyles();

  return (
    <ListItem ContainerComponent="div">
      <Card className={classes.item}>
        <FormGroup className={classes.item} row>
          {/* <ListItemSecondaryAction> */}
          <DragHandle />
          {/* </ListItemSecondaryAction> */}
          {/* <ListItemText primary={text} /> */}
          <TextBox value={text} />

          <FormControlLabel
            control={
              <Switch
                //     checked={state.checkedB}
                //   onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Special"
          />

          <FormControlLabel
            control={
              <Switch
                //     checked={state.checkedB}
                //   onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Hide image / description"
          />

          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </FormGroup>
      </Card>
    </ListItem>
  );
});

const SortableListContainer = SortableContainer(({ categories }) => (
  <List component="div">
    {categories.map(({ sno, name }, index) => (
      <SortableItem key={sno} index={index} text={name} />
    ))}
  </List>
));

const SortableList = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      await props.listCategories();
    })();
  }, []);

  useEffect(() => {
    console.log(props.restaurantState)
    setCategories(props.restaurantState.categories);
  }, [props.restaurantState]);

  const addCategory = () => {
    console.log(categories);
    const lastIndex = categories.length;
    console.log(lastIndex);
    const newcat = [
      {
        sno: lastIndex,
        name: 'category number ' + lastIndex,
        special: true,
        imghide: false
      }
    ];
    // categories.push(newcat)
    setCategories(categories => categories.concat(newcat));
    props.addCategory(newcat[0]);
  };

  const classes = useStyles();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCategories(categories => arrayMove(categories, oldIndex, newIndex));
  };
  console.log('-------------------------');
  console.log(categories);
  return (
    <React.Fragment>
      <PageTitle titleHeading="Menu" titleDescription="Categories Detail" />

      <SortableListContainer
        categories={categories}
        onSortEnd={onSortEnd}
        useDragHandle={true}
        lockAxis="y"
      />
      <div className={classes.centerit}>
        <Fab color="primary" aria-label="add" onClick={addCategory}>
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  addCategory: values => dispatch(addCategory(values)),
  listCategories: () => dispatch(listCategories())

  // clearErrors: () => dispatch(clearErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(SortableList);

// export default ;

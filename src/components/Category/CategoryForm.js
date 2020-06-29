import React, { useState } from 'react';
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

import {
  Grid,
  Badge,
  Card,
  Switch,
  Button,
  Divider,
  Typography,
  TextField,
  FormGroup,
  FormControl,
  FormControlLabel

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
// import classes from '*.module.css';

const useStyles = makeStyles(theme => ({
  item: {
    display : "flex",
    flexGrow: 1,
    padding : theme.spacing(1),
    
  },
  setMiddle: {
    alignItems: "center"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const DragHandle = SortableHandle(() => { 
  const classes = useStyles();

 return(  
  <ListItemIcon className={classes.setMiddle}>
    <DragIndicatorIcon color="default"/>
  </ListItemIcon>
)});

const SortableItem = SortableElement(({ text }) =>{ 
  const classes = useStyles();

 return(
  <ListItem ContainerComponent="div">
    <Card className={classes.item}>
    <FormGroup  className={classes.item} row >
      {/* <ListItemSecondaryAction> */}
      <DragHandle />
      {/* </ListItemSecondaryAction> */}
      <ListItemText  primary={text} />
      
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
)});

const SortableListContainer = SortableContainer(({ items }) => (
  <List component="div">
    {items.map(({ id, text }, index) => (
      <SortableItem key={id} index={index} text={text} />
    ))}
  </List>
));

const SortableList = () => {
  const [items, setItems] = useState([
    { id: '1', text: 'Salads' },
    { id: '2', text: 'Special' },
    { id: '3', text: 'Not a Burgar' },
    { id: '4', text: 'Burgar' }
  ]);

  const classes = useStyles();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(items => arrayMove(items, oldIndex, newIndex));
  };

  console.log(items);
  return (
    <React.Fragment>
      <PageTitle titleHeading="Menu" titleDescription="Categories Detail" />

      <SortableListContainer
        items={items}
        onSortEnd={onSortEnd}
        useDragHandle={true}
        lockAxis="y"
      />
    </React.Fragment>
  );
};

export default SortableList;

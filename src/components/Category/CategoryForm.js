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
  listCategories,
  deleteCategory,
  updateCategory,
  sortCategories
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

const SortableItem = SortableElement(props => {
  const { text, catid, deleteCategory } = props;
  const classes = useStyles();
  const handleDelete = catid => {
    console.log(catid);
    if (catid) deleteCategory(catid);
  };
  const handleChange = e => {
    console.log(e.target.id);
    console.log(e.target.type);
    const info = e.target.id.split('_');
    console.log(info);

    props.updateCategory({ id: info[1], [info[0]]: e.target.checked });
  };

  const saveTextBox = value => {
    console.log(value);
    props.updateCategory({ id: value.id, name: value.name });
  };
  return (
    <ListItem ContainerComponent="div">
      <Card className={classes.item}>
        <FormGroup className={classes.item} row>
          {/* <ListItemSecondaryAction> */}
          <DragHandle />
          {/* </ListItemSecondaryAction> */}
          {/* <ListItemText primary={text} /> */}
          <TextBox value={text} id={catid} saveTextBox={saveTextBox} />

          <FormControlLabel
            control={
              <Switch
                checked={props.special}
                onChange={handleChange}
                name="special"
                color="primary"
                id={'special_' + catid}
              />
            }
            label="Special"
          />

          <FormControlLabel
            control={
              <Switch
                checked={props.imghide}
                onChange={handleChange}
                name="imghide"
                color="primary"
                id={'imghide_' + catid}
              />
            }
            label="Hide image / description"
          />

          <IconButton aria-label="delete" onClick={() => handleDelete(catid)}>
            <DeleteIcon />
          </IconButton>
        </FormGroup>
      </Card>
    </ListItem>
  );
});

// const mapDispatchToProps1 = dispatch => ({
//   deleteCategory: id => dispatch(deleteCategory(id))

//   // clearErrors: () => dispatch(clearErrors())
// });
// connect(null, mapDispatchToProps1)(SortableElement);

const SortableListContainer = SortableContainer(
  ({ categories, deleteCategory, updateCategory }) => {
    console.log(categories);
    return (
      <List component="div">
        {categories.map(({ sno, name, id, special, imghide }, index) => (
          <SortableItem
            key={sno}
            index={index}
            text={name}
            catid={id}
            special={special}
            imghide={imghide}
            deleteCategory={deleteCategory}
            updateCategory={updateCategory}
          />
        ))}
      </List>
    );
  }
);

const SortableList = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      await props.listCategories();
    })();
  }, []);

  useEffect(() => {
    console.log(props.restaurantState);
    setCategories(props.restaurantState.categories);
  }, [props.restaurantState.categories]);

  useEffect(() => {
    console.log(categories);
    props.sortCategories(categories)
    // setCategories(props.restaurantState.categories);
  }, [categories]);

  const addCategory = async () => {
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
    await props.addCategory(newcat[0]);
    setCategories(props.restaurantState.categories);
  };

  const deleteCategory = async id => {
    console.log(id);
    await props.deleteCategory(id);
    setCategories(props.restaurantState.categories);
  };

  const updateCategory = async cat => {
    console.log(cat);
    props.updateCategory(cat);
  };

  const classes = useStyles();

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    setCategories(categories => arrayMove(categories, oldIndex, newIndex));
    console.log(categories)
    //props.sortCategories(categories)
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
        deleteCategory={deleteCategory}
        updateCategory={updateCategory}
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
  listCategories: () => dispatch(listCategories()),
  deleteCategory: id => dispatch(deleteCategory(id)),
  updateCategory: id => dispatch(updateCategory(id)),
  sortCategories: cats => dispatch(sortCategories(cats)),


  // clearErrors: () => dispatch(clearErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(SortableList);

// export default ;

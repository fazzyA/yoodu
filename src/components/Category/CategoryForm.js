import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import PageTitle from '../../layout-components/PageTitle';

const DragHandle = SortableHandle(() => (
  <ListItemIcon>
    <DragHandleIcon />
  </ListItemIcon>
));

const SortableItem = SortableElement(({ text }) => (
  <ListItem ContainerComponent="div">
    {/* <ListItemSecondaryAction> */}
      <DragHandle />
    {/* </ListItemSecondaryAction> */}
    <ListItemText primary={text} />

  </ListItem>
));

const SortableListContainer = SortableContainer(({ items }) => (
  <List component="div">
    {items.map(({ id, text }, index) => (
      <SortableItem key={id} index={index} text={text} />
    ))}
  </List>
));

const SortableList = () => {
  const [items, setItems] = useState([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" }
  ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(items => arrayMove(items, oldIndex, newIndex));
  };

  console.log(items)
  return (
    <React.Fragment>
    <PageTitle
        titleHeading="Menu"
        titleDescription="Categories Detail"
      />
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

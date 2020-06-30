import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';
 
function TextBox(props) {
 
  const save = (value) => {props.saveTextBox(value)}
  const cancel = () => {alert("Cancelled")}
 
  return (
    <EasyEdit
      type="text"
      onSave={save}
      value={props.value}
      
      onCancel={cancel}
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: "awesome-input", id: 1}}
    //  instructions="Star this repo!"
    />
  );
}

export default TextBox

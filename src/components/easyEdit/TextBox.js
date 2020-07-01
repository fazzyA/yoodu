import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';
 
function TextBox(props) {
 
  const save = (value) => {
console.log(props.id)

    props.saveTextBox({id: props.id, name : value})
  }
  const cancel = () => {}
 
  return (
    <EasyEdit
      type="text"
      onSave={save}
      value={props.value}
      
      onCancel={cancel}
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: `name_${props.catid}`, id: `name_${props.catid}`}}
    //  instructions="Star this repo!"
    />
  );
}

export default TextBox

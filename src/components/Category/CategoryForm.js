import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import { TextField,  FormControlLabel, Checkbox  } from '@material-ui/core';

 const Category = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Special', field: 'special' },
      { title: 'Hide image/description', field: 'Hide' },
          ],
    data: [
      { name: 'Specials', special: <Checkbox />, Hide: <Checkbox /> },
      {
        name: 'Salad',
        special:<Checkbox />,
        Hide: <Checkbox />,
      },
    ],
  });

    return (
        <Fragment>
        <form autoComplete="off">
        <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
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

        {/* <div style={{width:'50%'}}>
          <TextField
            fullWidth
            className="m-3"
            id="name"
            label="Category Name"
            variant="outlined"
            defaultValue=""
          />
          <FormControlLabel
                  control={
                    <Checkbox
                      checked
                      value="special"
                    />
                  }
                  label="Special"
                />
                <FormControlLabel
                control={
                  <Checkbox
                    checked
                    value="hideimage"
                  />
                }
                label="Hide Image/Description"
              />
        </div> */}
        
      </form>

            
        </Fragment>
    )
}
export default Category;

import React, { Fragment } from 'react';

import { TextField,  FormControlLabel, Checkbox  } from '@material-ui/core';

 const Category = () => {
    return (
        <Fragment>
        <form autoComplete="off">
        <div style={{width:'50%'}}>
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
        </div>
      </form>

            
        </Fragment>
    )
}
export default Category;

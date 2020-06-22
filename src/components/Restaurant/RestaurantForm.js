import React, { Fragment } from 'react';

import { TextField } from '@material-ui/core';

 const Restaurant = () => {
    return (
        <Fragment>
        <form autoComplete="off">
        <div>
          <TextField
            fullWidth
            className="m-3"
            id="name"
            label="Restaurant Name"
            variant="outlined"
            defaultValue=""
          />
          <TextField
            fullWidth
            className="m-3"
            id="address"
            label="Address"
            defaultValue=""
            helperText=""
            variant="outlined"
            />
        </div>
        <div>
          <TextField
            fullWidth
            className="m-3"
            id="contactperson"
            label="Contact Person"
            defaultValue=""
            variant="outlined"
          />
          <TextField
            fullWidth
            className="m-3"
            id="contactnumber"
            label="Contact Number"
            defaultValue=""
            helperText=""
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            fullWidth
            className="m-3"
            id="email"
            label="Email"
            defaultValue=""
            variant="outlined"
          />
          <TextField
            fullWidth
            className="m-3"
            id="password"
            label="Password"
            defaultValue=""
            helperText=""
            variant="outlined"
          />
          <TextField
            fullWidth
            className="m-3"
            id="restaurantnumber"
            label="Restaurant Number"
            defaultValue=""
            helperText=""
            variant="outlined"
          />
          <TextField
            fullWidth
            className="m-3"
            id="website"
            label="Restaurant Website"
            defaultValue=""
            helperText=""
            variant="outlined"
          />
          <TextField
            fullWidth
            className="m-3"
            id="currencysymbol"
            label="Currency Symbol"
            defaultValue=""
            helperText=""
            variant="outlined"
          />
        </div>
      </form>

            
        </Fragment>
    )
}
export default Restaurant;

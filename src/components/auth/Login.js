import React, { Fragment, useContext} from 'react';

import {
  Grid,
  Card,
  TextField,
  Divider
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';

export default function Login() {

  const { menu , user } = useContext(GlobalContext);
  console.log(user.name);

  const handleChange = event => {
    console.log('loggedin');
  };


  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    currency:0
  });

  const handleChange3 = name => event => {
    // setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;

  const error = [gilad, jason, antoine].filter(v => v).length !== 2;
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
        <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Login</div>
            <Divider className="my-4" />
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <div className="p-3">here
                  {/* {user.name} */}
                  <TextFieldfilled-basic
                    fullWidth
                    className="m-2"
                    id="standard-basic"
                    label="Standard"
                  />
                  <TextField
                    fullWidth
                    className="m-2"
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                  />
                  <TextField
                    fullWidth
                    className="m-2"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                  />
      <Button variant="contained" color="primary" className="m-2">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['far', 'lightbulb']} />
        </span>
        <span className="btn-wrapper--label">Login</span>
      </Button>
                </div>
              </Grid>
            </Grid>
          </Card>

        </Grid>
      </Grid>
    </Fragment>
  );

}

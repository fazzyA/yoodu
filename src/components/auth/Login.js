import React, { Fragment,useState, useContext} from 'react';
import {
  Grid,
  Card,
  TextField,
  Divider
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState';

export default function Login() {

  const val = useContext(GlobalContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = event => {
    event.preventDefault();
    const newUser={email,password}
    console.log('newUser')
  };

  return (
    <Fragment>
  <form onSubmit={handleSubmit}>
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
                    id="email"
                    label="Email"
                    variant="filled"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    className="m-2"
                    id="password"
                    type="passowrd"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                  />
      <Button variant="contained" color="primary" className="m-2">
        <span className="btn-wrapper--label">Continue</span>
      </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      </form>

    </Fragment>
  );

}

import React, {Fragment} from 'react'
import { GlobalProvider } from './context/GlobalState';
import { Button } from '@material-ui/core';

export const Home = () => {
    return (
        <Fragment>
            <div className='home-first'>
            <Button variant="contained" color="primary" className="m-2">
                <span className="btn-wrapper--label">SignUp</span>
             </Button>
             <Button variant="contained" color="primary" className="m-2">
                <span className="btn-wrapper--label">Login</span>
             </Button>
             </div>


        </Fragment>

    )
}

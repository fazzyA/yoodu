import React, {Fragment,useContext} from 'react'
import { GlobalContext } from './context/GlobalState';
import { Button } from '@material-ui/core';

export const Home = () => {
    const val = useContext(GlobalContext);
    console.log(val);
  
    return (
    <Fragment>
            welcom to the list of resturants

        </Fragment>

    )
}

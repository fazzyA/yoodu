import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
const initialState ={
    menu:[],
    user:{id:1,name:'faz'},
    order:[]
};
export const GlobalContext = createContext(2);


export const GlobalProvider = ({children}) => {
   const [state, dispatch] = useReducer(AppReducer, initialState)
    return (
        // <GlobalContext.Provider value={{
        //     menu: state.menu,
        //     user:state.user,
        //     order:state.order
        // }}>  
      <GlobalContext.Provider value={23}>
            {children}
        </GlobalContext.Provider>
    )
}
//setting up data layer to later use the data in our e-commerce app
//this is to track the basket
import React, {createContext, useContext, useReducer} from "react"


export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (

    <StateContext.Provider value = {useReducer(reducer, initialState,)}>
      {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
import React, { useReducer } from "react";
//import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert

  const setAlert = (msg, type, timout = 5000) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timout);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

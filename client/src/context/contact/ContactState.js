import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  //state:allows Access to anything in state
  //dispatch:allows access to object dispatch to reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Actions
  //GET contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      console.log(res.data);

      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      console.log("Catch.....");
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log("tryyyyy");
      const res = await axios.post("/api/contacts", contact, config);
      console.log("Response---" + res.data);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //update conatct
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };

  //Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //Clear current contct
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //Filter contact
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };
  //clear fileter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

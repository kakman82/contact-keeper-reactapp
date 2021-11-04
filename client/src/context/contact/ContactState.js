import React, { useContext, useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACT_ERRORS,
} from '../types';

//* create custom hook
export const useContact = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

//* Get Contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.msg,
    });
  }
};

//* Add Contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact);

    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.data.errors,
    });
  }
};

//* Delete Contact
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`);

    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.data.errors,
    });
  }
};

//* Clear Contacts;
export const clearContacts = (dispatch) => {
  dispatch({
    type: CLEAR_CONTACTS,
  });
};

//* Set Current Contact
export const setCurrent = (dispatch, contact) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact,
  });
};

//* Clear Current Contact
export const clearCurrent = (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

//* Update Contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data.updatedContact,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_ERROR,
      payload: error.response.data.errors,
    });
  }
};

//* Filter Contact
export const filterContacts = (dispatch, text) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text,
  });
};

//* Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

//* Clear Contact Errors
export const clearContactErrors = (dispatch) => {
  dispatch({ type: CLEAR_CONTACT_ERRORS });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;

import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

//* Burada state oluşturmadan önce Register ve Login de kullandığımız useEffect de loopa düşmemek için kendi Hookumuz oluşturuyoruz ve side-effect fonsiyonları (actions) nu state dışında haricen tanımlıyoruz ve dispatch ile varsa datayı parametre olarak gönderiyoruz - kendi hookumuzun adının use ile başlaması önemli.

export const useAuth = () => {
  // context ten aldığımız state ve dispatchi bu hook için yine array olarak dönerek kullanmış oluyoruz
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

//? Action Creators;
//* Load User - check token is the right user
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

//* Register User - set token
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    // user register olduktan sonra user bilgilerini almak için;
    loadUser(dispatch);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//* Login User - log user and get token
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//* Logout - remove token
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//? State tanımı; - AuthState Provider Component

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };
  // burada tekrar dispatch ı oluşturmamız aşağıdaki metodları useEffect içinde kullanabilmemiz için
  const [state, dispatch] = useReducer(authReducer, initialState);

  //* set token on initial app loading - token varsa ya da yoksa da silmeyi localStorage da req headersa set etmeyi utils de tanımlanan setAuthToken func yapıyor
  setAuthToken(localStorage.token);

  //* load user on first run or refresh - loadUser ı side effect içinde tanımlamıştık useEffect içinde tekrar kullanmak için burada çağırıyoruz
  if (state.loading) {
    loadUser(dispatch);
  }

  //* 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  // tüm state ve dispatch ı value olarak gönderiyoruz
  return (
    <AuthContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;

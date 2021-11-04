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

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    // register ve login esasen aynı işi yapıyor ikisi de token ı set ediyor
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // register sonrası önce tokeni set ediyoruz
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // token için her ikisde sonuç verir - anlaşılır olması için token: action.payload.token olarak bıraktım
        // ...action.payload,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    // her iki durumda da state aşağıdaki değeri alacağı için bu şekilde case tanımı aynı type için de verilebilir
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

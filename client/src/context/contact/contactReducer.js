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

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        // eğer state array ve yeni object göndereceksek state immutable old için önce ... ile kopyasını alıp sonra payload gönderiyoruz. state object ya da string, null vs ise direk atama olabilir - array olduğunda durum bu şekilde, update ederken objecti direk önceki ile değiştirdiğimiz için map() ile direk eşitlemek mümkün yeni bir object eklemiyoruz çünkü

        // önce payloadı vermemin sebebi, db den sort decs şeklinde geliyor zaten, ui taraftada bu şekilde olması için yani en son eklenen en üste bunun için önce payloadı verdim
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        // iki türlü de olabiliyor, yukarıdaki add yapısına uygun da yaptım oldu
        contacts: [
          ...state.contacts.filter((contact) => contact._id !== action.payload),
        ],
        // bu şekilde brad gibi de yaptım yine oldu;
        // contacts:
        //     state.contacts.filter((contact) => contact.id !== action.payload)
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CONTACT_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

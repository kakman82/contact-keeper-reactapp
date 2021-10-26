import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

/* eslint import/no-anonymous-default-export: */
export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        // eğer state array ve yeni object göndereceksek state immutable old için önce ... ile kopyasını alıp sonra payload gönderiyoruz. state object ya da string, null vs ise direk atama olabilir - array olduğunda durum bu şekilde, update ederken objecti direk önceki ile değiştirdiğimiz için map() ile direk eşitlemek mümkün yeni bir object eklemiyoruz çünkü
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        // iki türlü de olabiliyor, yukarıdaki add yapısına uygun da yaptım oldu
        contacts: [
          ...state.contacts.filter((contact) => contact.id !== action.payload),
        ],
        // bu şekilde brad gibi de yaptım yine oldu;
        // contacts:
        //     state.contacts.filter((contact) => contact.id !== action.payload),
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
    default:
      return state;
  }
};

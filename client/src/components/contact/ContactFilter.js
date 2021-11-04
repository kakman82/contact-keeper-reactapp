import React from 'react';
import {
  useContact,
  filterContacts,
  clearFilter,
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const contactDispatch = useContact()[1];

  return (
    <form>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Filter Contacts...'
            onChange={(e) =>
              e.target.value
                ? filterContacts(contactDispatch, e.target.value)
                : clearFilter(contactDispatch)
            }
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-search'></i>
          </span>
        </p>
      </div>
    </form>
  );
};

export default ContactFilter;

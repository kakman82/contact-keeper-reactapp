import React, { useContext } from 'react';
import ContextContact from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contextContact = useContext(ContextContact);

  const { filterContacts, clearFilter } = contextContact;

  return (
    <form>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Filter Contacts...'
            onChange={(e) =>
              e.target.value ? filterContacts(e.target.value) : clearFilter()
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

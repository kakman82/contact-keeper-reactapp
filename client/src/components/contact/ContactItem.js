import React from 'react';
import PropTypes from 'prop-types';
import {
  useContact,
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const contactDispatch = useContact()[1];

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

  const onCurrent = () => {
    setCurrent(contactDispatch, contact);
  };

  return (
    <div
      className='card my-3 has-background-light'
      style={{ borderStyle: 'groove' }}>
      <div className='card-content'>
        <p className='is-size-6 has-text-link has-text-weight-bold is-flex is-justify-content-space-between'>
          {name}{' '}
          <span
            className={
              'tag ' + (type === 'professional' ? 'is-success' : 'is-info')
            }>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </p>

        <ul className='menu-list is-size-7 has-text-weight-bold'>
          {email && (
            <li className='my-1 py-1'>
              <i className='far fa-envelope'></i> {email}
            </li>
          )}

          {phone && (
            <li className='my-1 py-1'>
              <i className='fas fa-phone-volume'></i> {phone}
            </li>
          )}
        </ul>
        <p>
          <button
            className='button mr-1 p-3 is-black is-small'
            onClick={onCurrent}>
            Edit
          </button>
          <button
            className='button mr-1 p-1 is-danger is-small'
            onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;

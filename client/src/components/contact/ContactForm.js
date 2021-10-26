import React, { useState, useContext, useEffect } from 'react';
import ContactContex from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContex);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]); // bu useEffect hangi durumların değişikliğinde çalışacak ise onlar arraya eklenir, yoksa boş array olarak bırakılır - yapılmadığında hata alırız

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <p className='is-size-4 mb-3 has-text-centered has-text-info has-text-weight-bold'>
        {current === null ? 'Add Contact' : 'Edit Contact'}
      </p>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-address-card'></i>
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input is-primary'
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-envelope'></i>
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control has-icons-left'>
          <input
            className='input is-primary'
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={onChange}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-phone-volume'></i>
          </span>
        </p>
      </div>
      <p className='is-size-6 mb-2 has-text-info has-text-weight-bold'>Type?</p>
      <div className='control'>
        <label className='radio'>
          <input
            type='radio'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onChange}
          />{' '}
          Personal
        </label>
        <label className='radio'>
          <input
            type='radio'
            name='type'
            value='professional'
            checked={type === 'professional'}
            onChange={onChange}
          />{' '}
          Professional
        </label>
      </div>
      <button className='button mt-3 is-info is-fullwidth'>
        {current === null ? 'Add Contact' : 'Update Contact'}
      </button>
      {current && (
        <button
          className='button mt-3 is-light is-fullwidth'
          onClick={clearAll}>
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;

import React from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';

const Home = () => {
  return (
    <div className='columns'>
      <div className='column'>
        <ContactForm />
      </div>
      <div className='column'>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;

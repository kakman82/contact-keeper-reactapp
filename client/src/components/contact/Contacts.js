import React, { Fragment, useContext, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  // Bunu strictmodu bu comp de iptal etmek, findDOMNode is deprecated in StrictMode. consol hatası almamak için ekledim, ref: https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/
  const nodeRef = useRef(null);

  if (contacts.length === 0) {
    return (
      <article className='message is-info mt-3'>
        <div className='message-body'>No any contact! Please add...</div>
      </article>
    );
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition
                timeout={500}
                classNames='item'
                nodeRef={nodeRef}
                key={contact.id}>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition
                timeout={500}
                classNames='item'
                nodeRef={nodeRef}
                key={contact.id}>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;

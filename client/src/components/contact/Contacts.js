import React, { Fragment, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useContact, getContacts } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const [contactState, contactDispatch] = useContact();

  const { contacts, filtered, loading } = contactState;

  // Bunu strictmodu bu comp de iptal etmek, findDOMNode is deprecated in StrictMode. consol hatası almamak için ekledim, ref: https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/
  const nodeRef = useRef(null);

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if ((contacts === null || contacts.length === 0) && !loading) {
    return (
      <article className='message is-info mt-3'>
        <div className='message-body'>No any contact! Please add...</div>
      </article>
    );
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  timeout={500}
                  classNames='item'
                  nodeRef={nodeRef}
                  key={contact._id}>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  timeout={500}
                  classNames='item'
                  nodeRef={nodeRef}
                  key={contact._id}>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;

import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <article className='message is-info'>
        <div className='message-header'>
          <p>About App</p>
        </div>
        <div className='message-body'>
          <p>The app helps you keep track of your contacts.</p>
          <strong>
            <small>Version: 1.0.0</small>
          </strong>
        </div>
      </article>
    </Fragment>
  );
};

export default About;

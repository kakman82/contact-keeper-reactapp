import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <article key={alert.id} className={`message ${alert.type}`}>
        <div className='message-body'>
          <i className='fas fa-info-circle'></i> {alert.msg}
        </div>
      </article>
    ))
  );
};

export default Alerts;

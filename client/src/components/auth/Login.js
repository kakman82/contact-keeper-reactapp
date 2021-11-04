import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, login } from '../../context/auth/AuthState';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert('Either your email or your password is incorrect', 'is-danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please  fill in all fields', 'is-danger');
    } else {
      login(authDispatch, user);
    }
  };
  return (
    <div className='container is-fluid'>
      <div className='columns is-centered'>
        <div className='column is-half '>
          <p className='mb-5 is-size-2 has-text-centered has-text-info-dark'>
            Account Login
          </p>
          <form onSubmit={onSubmit}>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Email'
                  type='email'
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
                  className='input'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </p>
            </div>

            <div className='field'>
              <p className='control'>
                <button className='button is-info is-fullwidth'>Login</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    // user register olduktan sonra home page yönlendirme;
    if (isAuthenticated) {
      // react de route yönlendirme bu şekilde - props ana func parametre olarak bunun için verdik
      props.history.push('/');
    }
    if (error === 'User already exists!') {
      setAlert('User that has this email is already exist!', 'is-danger');
      clearErrors(authDispatch);
    }
    // burada dependecy olarak clearErrors belirtmek eslint hata da vermedi çünkü authDispatch içinde bu metod side-effect olarak tanımlı
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields...', 'is-danger');
    } else if (password !== passwordConfirm) {
      setAlert('Passwords do not match!', 'is-danger');
    } else {
      register(authDispatch, { name, email, password });
    }
  };
  return (
    <div className='container is-fluid'>
      <div className='columns is-centered'>
        <div className='column is-half '>
          <p className='mb-5 is-size-2 has-text-centered has-text-info-dark'>
            Account Register
          </p>
          <form onSubmit={onSubmit}>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Name'
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-user'></i>
                </span>
              </p>
            </div>
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
                  minLength='6'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control has-icons-left'>
                <input
                  className='input'
                  placeholder='Password Confirm'
                  type='password'
                  name='passwordConfirm'
                  value={passwordConfirm}
                  onChange={onChange}
                  minLength='6'
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock'></i>
                </span>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-info is-fullwidth'>
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

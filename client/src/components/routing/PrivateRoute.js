import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

// PrivateRoute da genel yapı bu şekilde. component: Component in props olarak bu şekilde eklenmesi eğer user authenticate ise App.js de hangi component verildi ise o render edilsin, değilse redirect olsun. ...rest ise de aslında bu componentler render edildiğinde ne lazım ise onu alsın şeklinde genel bir aslında global bir tanım yoksa tek tek belirtmek gerekir bu şekilde tek seferde tanımlanmış oluyor

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authState] = useAuth();
  const { isAuthenticated } = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;

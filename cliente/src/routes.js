import React from 'react';
import { isAuthenticated } from "./services/auth";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from './pages/Login/index';
import CadastroUsuario from './pages/CadastroUsuario/index';
import Principal from './pages/Principal/index';
import Book from './pages/Book/index';
import CadastroBook from './pages/CadastroBook/index';
import NotFound from './pages/NotFound/index';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth/login" component={Login} />

        <Route exact path="/cadastro" component={CadastroUsuario} />

        {/* Manager routes. */}
        <AuthenticatedRoute exact path="/principal" component={Principal} />

        {/* Cadastro Mototaxista routes. */}
        <AuthenticatedRoute exact path="/book" component={Book} />

        {/* Cadastro Supervisor routes. */}
        <AuthenticatedRoute exact path="/cadastro-book" component={CadastroBook} />

        {/* Default route */}
        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
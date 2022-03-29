import React from 'react';
import { isAuthenticated } from "./services/auth";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from './pages/Login/index';
import CadastroUsuario from './pages/CadastroUsuario/index';
import Principal from './pages/Principal/index';
import Book from './pages/Book/index';
import CadastroComentario from './pages/CadastroComentario/index';
import NotFound from './pages/NotFound/index';

function RequireAuth({ children, redirectTo }) {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}

const Rotas = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />

      <Route path="/cadastro" element={<CadastroUsuario />} />

      {/* Manager routes. */}
      <Route path="/principal" element={
        <RequireAuth redirectTo="/auth/login">
          <Principal />
        </RequireAuth>
      } />

      {/* Cadastro Mototaxista routes. */}
      <Route path="/book" element={
        <RequireAuth redirectTo="/auth/login">
          <Book />
        </RequireAuth>
      } />

      {/* Cadastro Supervisor routes. */}
      <Route path="/cadastro-comentario" element={
        <RequireAuth redirectTo="/auth/login">
          <CadastroComentario />
        </RequireAuth>
      } />

      {/* Default route */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default Rotas;
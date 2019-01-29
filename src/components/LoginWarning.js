import React from "react";
import { Link } from "react-router-dom";

export const LoginWarning = () => (
    <div className="login-warning">
      <p>Debes iniciar sesión antes de ver este contenido</p>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
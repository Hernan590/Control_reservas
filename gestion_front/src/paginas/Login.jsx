// Login.js
import React from 'react';
import Swal from 'sweetalert2';
import Boton from '../componentes/Boton';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faSignInAlt  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Login = ({ logeado }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const goTo = useNavigate(); 

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      Swal.fire({
        icon: 'warning',
        title: '¡Campos requeridos!',
        text: 'Por favor ingresa tu usuario y contraseña.',
      });
      return;
    }

    try {
      // Envía una solicitud POST al endpoint de inicio de sesión en el servidor
      const response = await fetch('http://localhost:3005/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, password })
      });
      if (response.ok) {
        const { id, rol } = await response.json();
          logeado(rol);
          if (rol === 1) {
            Swal.fire({
              icon: 'success',
              title: '¡Inicio de sesión exitoso!',
              html: 'Bienvenido <b>' + usuario + '</b>',
            });
            localStorage.setItem('user', id); 
            goTo('/Admin');
          } else if (rol === 2) {
            Swal.fire({
              icon: 'success',
              title: '¡Inicio de sesión exitoso!',
              html: 'Bienvenido <b>' + usuario + '</b>',
            });
            localStorage.setItem('user', id); 
            goTo('/Formulario');
          }
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error contraseña o usuario equivacados.',
        });
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div id='contenedor_principal' className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Iniciar Sesion</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="usuario" className="form-label"><b>Usuario</b></label>
                  <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                    <input id='usuario' type="text" className="form-control" placeholder="Ingresa tu usuario..." value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label"><b>Contraseña</b></label>
                  <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    <input id='password' type="password" className="form-control" placeholder="Ingresa tu contraseña..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                </div>
                <Boton Nombre="Iniciar Sesion " icon={faSignInAlt} onClick={iniciarSesion} clase={"btn btn-primary"}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
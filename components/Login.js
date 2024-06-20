import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUsername] = useState('');
  const [passw, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (user === '' || passw === '') {
        return window.alert('Falta llenar alguno de los campos.');
      }

      // Replace 'YOUR_API_ENDPOINT' with the endpoint provided by API Gateway
      const response = await axios.post('/localhost:3001/login', {
        user,
        passw,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.rol);
      localStorage.setItem('userName', response.data.username);

      if (response && response.data) {
        setMessage(response.data.message);
        return window.location.href = '/';
      } else {
        setMessage('Error: Respuesta inválida del servidor');
      }
    } catch (error) {
      setMessage('Error de Servidor, intente de nuevo mas tarde.');
    }
  };

  const gotoRegister = () => {
    window.location.href = '/register';
  };

  const gotoMain = () => {
    window.location.href = '/';
  };

  return (
    <div className="contenedorLogin">
      <div>
        <h1>Ingrese sus datos.</h1>
        <input
          id='inputUsuario'
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={passw}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="commonButton" onClick={handleLogin}>Iniciar sesión</button>
        <br />
        <span>No tienes cuenta?</span>
        <br />
        <button className="commonButton" onClick={gotoRegister}>Registrarse</button>
        <br />
        <button className='commonButton' onClick={gotoMain}>Cancelar</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;

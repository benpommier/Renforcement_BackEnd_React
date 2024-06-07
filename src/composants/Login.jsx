import React, { useState } from 'react';
import '../css/Login.css';
import Cookies from 'js-cookie';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
});
  const [isLogged, setIsLogged] = useState(false);

  const token = Cookies.get('access_token');

  const logout = () => {
    Cookies.remove('access_token');
    setIsLogged(false);
    console.log('Logout successful');
    window.location.reload();
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending data:', loginData);  // Log des données envoyées

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Response error text:', errorText);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      Cookies.set('access_token', result.access_token);
      setIsLogged(true);
      window.location.reload();
      console.log('Success:', result);
      // Gérer la connexion réussie, par exemple, en redirigeant l'utilisateur ou en enregistrant le token
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<>
  { !token ? (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username :
          <input type="text" name="username" value={loginData.username} onChange={handleChange} />
        </label>
        <label>
          Password :
          <input type="password" name="password" value={loginData.password} onChange={handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div> ) : (
      <div>
        <p>Vous êtes connecté</p>
        <button onClick={logout}>Se deconnecter</button>
      </div>
    )}
</>
  );
}

export default Login;

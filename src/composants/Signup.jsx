import React, { useState } from 'react';
import '../css/Login.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    age: '',
    bornCity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, age: Number(formData.age) };

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      console.log('response:', response); 

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>

        <label>
          Last name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>

        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>

        <label>
        Born City:
          <input type="text" name="bornCity" value={formData.bornCity} onChange={handleChange} />
        </label>

        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default Signup;

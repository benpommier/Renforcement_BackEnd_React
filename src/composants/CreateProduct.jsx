import React, { useState } from 'react';
import '../css/Login.css';
import Cookies from 'js-cookie';

function CreateProduct() {
  const [productData, setProductData] = useState({
    titre: '',
    prix: '',
    description: '',
    image: '',
    couleur: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'prix' ? Number(value) : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...productData,
      prix: Number(productData.prix)
    };

    console.log('Sending data:', dataToSend); 

    try {
      const token = Cookies.get('access_token');
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Create product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titre :
          <input type="text" name="titre" value={productData.titre} onChange={handleChange} />
        </label>

        <label>
          Prix :
          <input type="number" name="prix" value={productData.prix} onChange={handleChange} />
        </label>

        <label>
          Description :
          <textarea name="description" value={productData.description} onChange={handleChange}></textarea>
        </label>

        <label>
          Image :
          <input type="text" name="image" value={productData.image} onChange={handleChange} />
        </label>

        <label>
          Couleur :
          <input type="text" name="couleur" value={productData.couleur} onChange={handleChange} />
        </label>

        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default CreateProduct;

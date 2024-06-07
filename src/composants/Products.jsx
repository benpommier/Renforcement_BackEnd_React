import React, { useEffect, useState } from 'react';
import '../css/Products.css';
import Cookies from 'js-cookie';

function Products() {

    const [products, setProducts] = useState([]);
    const [productToDisplay, setProductToDisplay] = useState(null);
    const [deletedProductId, setDeletedProductId] = useState(null);

    useEffect(() => {
        async function fetchProductsData() {
          try {
            const token = Cookies.get('access_token');
            const response = await fetch('http://localhost:8000/api/products', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
      
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Network response was not ok: ${errorText}`);
            }
      
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.log(error);
          }
        }
      
        fetchProductsData();
      }, [deletedProductId]);

      const handleClickProduct = async (event, id) => {
        try {
          const token = Cookies.get('access_token');
          const response = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
          }
      
          const responseProduct = await response.json();
          setProductToDisplay(responseProduct);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleDeleteProduct = async (event, id) => {
        try {
          const token = Cookies.get('access_token');
          const response = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
          }
      
          const responseProduct = await response.json();
          setDeletedProductId(id);
          setProductToDisplay(responseProduct);
        } catch (error) {
          console.log(error);
        }
      };

        const handleAddProduct = (event, id) => {
        };

    return (
    <div className="products-container">
        {products.map((product) => (
          <article key={product.id} className="product" onClick={(event) => handleClickProduct(event, product.id)}>
            <img src="https://placehold.co/200" alt={product.titre} width={40} />
            <h2>{product.titre} - {product.couleur}</h2>
            <p>{product.prix} euros</p>
            <p>{product.description}</p>
            <button className="add-button" onClick={(event) => handleAddProduct(event, product.id)}>Add to cart</button>
            {productToDisplay && productToDisplay.id === product.id && (
                <button className="delete-button" onClick={(event) => handleDeleteProduct(event, product.id)}>Delete</button>
            )}
          </article>
        ))}
    </div>
    );
}

export default Products;
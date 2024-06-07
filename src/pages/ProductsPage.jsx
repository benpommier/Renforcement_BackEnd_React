import React, { useEffect } from 'react';
import Header from '../composants/Header';
import Products from '../composants/Products';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProductsPage() {

  const navigate = useNavigate();
  useEffect(() => {

    const token = Cookies.get('access_token');
    if (!token) {
        navigate('/login');
    }
  }, []);

  return (
    <>
        <Header />
        <Products />
        <Footer />

    </>
  );
}

export default ProductsPage;
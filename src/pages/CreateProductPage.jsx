import React, { useEffect } from 'react';
import Header from '../composants/Header';
import CreateProduct from '../composants/CreateProduct';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function CreateProductPage() {


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
          <CreateProduct />
          <Footer />
          
      </>
    )
  
  
}

export default CreateProductPage;
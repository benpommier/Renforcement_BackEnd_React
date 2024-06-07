import React, { useEffect } from 'react';
import Header from '../composants/Header';
import Order from '../composants/Order';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function OrderPage() {
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
        <Order />
        <Footer />
    </>
  );
}

export default OrderPage;
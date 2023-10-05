import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Product from './Componet/Product';
import ProductSingle from './Componet/Productsingal';
import Addcard from './Componet/Addcard';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/Productsingal/:id" element={<ProductSingle />} />
        <Route path="/Addcard" element={<Addcard/>} />
      </Routes>
    </>
  );
}

export default App;
import React from "react";
import Productslist from "./components/productslist";
import Header from "./components/header";
import Product from "./components/product";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element= {<Productslist /> } />
          <Route exact path="/users/:login/repos" element= {<Product /> }/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

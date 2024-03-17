import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PizzaList from './components/Pizzalist';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import PizzaDetails from './components/PizzaDetails'
import CreatePizza from './components/CreatePizza';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/SLEIMA_PROJET_PIZZA" element={<Home />} />
        <Route path="/pizzas" element={<PizzaList />} />
        <Route path='/createpizza' element={<CreatePizza/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:pizzaId" element={<PizzaDetails />} />
      </Routes>
    </>
  );
}

export default App;

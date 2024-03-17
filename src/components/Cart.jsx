import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, removeWholeItemFromCart } from './../Redux/Cart/CartSlice';
import { Link } from 'react-router-dom';
import './../index.css'

const Cart = () => {
  const dispatch = useDispatch();

  
 // Use useSelector to access the cart items and total from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  // Function to add an item to the cart
  const add = (pizza) => {
    dispatch(addToCart(pizza));     
  };

  // Function to remove an item from the cart
  const remove = (pizzaId) => {
    dispatch(removeFromCart(pizzaId));
  };

  // Function to remove all instances of an item from the cart
  const removeAll = (pizzaId) => {
    dispatch(removeWholeItemFromCart(pizzaId));
  };

   // Function to generate the image path for an item
  let imagePath = (imageFile) => {
    const baseUrl = import.meta.url; 
    return new URL(`../assets/${imageFile}`, baseUrl).href; 
  };


  return (
    <div className="relative bg-[#A44200] h-screen flex flex-col items-center pt-10">
    
    <div className="absolute top-[1.5rem] left-16">
        <Link to="/pizzas" className="bg-[#69140E] hover:bg-[#D58936] text-white py-4 px-6 rounded-2xl shadow-inner">
        &#8592; &nbsp; Back
        </Link>
    </div>


      <h2 className="text-[5rem] font-bold mb-10 mt-[5rem] underline text-[#3C1518] max-[400px]:text-[2rem]">CART</h2>

      <div className=" scrollbar-thumb-yellow overflow-y-auto w-[50%] max-[400px]:w-[98%] mb-5 p-7 ">
        {Object.values(cartItems).map((item) => (
          <div key={item.data.id} className="flex items-center justify-between p-5 mb-6 bg-[#F2F3AE] rounded-xl shadow-inner max-[400px]:py-8 max-[400px]:flex-col ">
            <div className="flex items-center">
              <img src={imagePath(item.data.image)} alt={item.data.name} className="w-20 h-20 max-[400px]:w-15 max-[400px]:h-15 mr-4" />
              <span className="text-[1.5rem] max-[400px]:text-[0.8rem] font-serif text-[#3C1518] font-bold">{item.data.name}</span>
            </div>    
            <div className="flex items-center">
            
              <button
                onClick={() => removeAll(item.data.id)}
                className="text-[#c64444] hover:text-red-300 mx-2 text-[1.5rem] font-mono"
              > 
                &times;
              </button>

              <button
                onClick={() => remove(item.data.id)}
                className="bg-[#3C1518] hover:bg-[#A44200] shadow-inner text-[#F2F3AE] mx-2 p-1 px-3 max-[400px]:p-2 max-[400px]:px-4 font-mono rounded-full"
              >
                -
              </button>
              <span className="text-lg mx-2 font-mono text-[#3C1518]">{item.quantity}</span>
              <button
                onClick={() => add(item.data)}
                className="bg-[#3C1518] hover:bg-[#A44200] shadow-inner text-[#F2F3AE] mx-2 p-1 px-3 max-[400px]:p-2 max-[400px]:px-4 font-mono rounded-full"
              >
                +
              </button>
              <span className="text-lg text-[#3C1518] p-5">{item.data.price * item.quantity}€</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 mb-10 text-[2rem]">
        <strong>Total:</strong> {total.toFixed(2)}€
      </div>
    </div>
  );
};

export default Cart;

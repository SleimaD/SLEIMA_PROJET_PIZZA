import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from './../assets/json/data.json';
import { addToCart } from './../Redux/Cart/CartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



const PizzaDetails = () => {
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const foundPizza = data.pizzas.find(pizza => pizza.id.toString() === pizzaId);
    setPizza(foundPizza);
  }, [pizzaId]);

  if (!pizza) {
    return <div>Loading...</div>; 
  }

    let add = () => {
        if(pizza) {
        dispatch(addToCart(pizza));
        navigate('/cart'); 
        }
    };

    let imagePath = (imageFile) => {
        const baseUrl = import.meta.url; 
        return new URL(`../assets/${imageFile}`, baseUrl).href; 
    }; 


  
  return ( 
    <div className='relative bg-[#A44200] w-full h-[100vh] flex justify-center items-center '>

      <div className="absolute top-[1.5rem] max-[400px]:top-[2.5rem] left-16">
          <Link to="/pizzas" className="bg-[#69140E] hover:bg-[#D58936] text-white py-4 px-6 rounded-2xl shadow-inner">
          &#8592; &nbsp; Back
          </Link>
      </div>

      
      <div className=' container bg-[#3C1518] mt-10 max-[400px]:mt-[10rem] w-[40%] max-[400px]:w-[85%] max-[400px]:mb-8 h-[550px] max-[400px]:h-[470px]  rounded-2xl shadow-inner p-5 py-8 flex flex-col items-center gap-10 relative'>  

        <img src={imagePath(pizza.image)} className=' absolute w-[40%] top-[-25%] max-[400px]:top-[-15%] max-[400px]:w-[50%]' alt="" />

        <h1 className=' text-[3.8rem] mt-[5.5rem] text-[#F2F3AE]'>{pizza.name}</h1>

        <h3 className=' underline text-[#F2F3AE] text-[2rem]'>Composition:</h3>

        <p className=' text-[#F2F3AE] text-lg'>{pizza.ingredients.join(' - ')}</p> 
        
        <button onClick={add} className=' bg-[#F2F3AE] p-3 px-5 rounded-full shadow-inner font-extrabold hover:bg-[#A44200] hover:text-[#F2F3AE]'>
            Add to Cart
        </button>

      </div> 

    </div>      

  );   
};

export default PizzaDetails;

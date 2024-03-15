import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './../Redux/Cart/CartSlice';
import { Link } from 'react-router-dom';
import ingredientsData from './../assets/json/ingredients.json'; 
import emptypizza from "./../assets/epbasil.png"
import bgBasil from "./../assets/bgbasilic.png"
import './../index.css'

const CreatePizza = () => {
  const [ingredients, setIngredients] = useState({});
  let dispatch = useDispatch();
  
  
  useEffect(() => {
    let initialIngredientsState = ingredientsData.ingredients.reduce((acc, ingredient) => {
      acc[ingredient.name] = { ...ingredient, count: 0 };
      return acc;
    }, {});
    setIngredients(initialIngredientsState);
  }, []);



  let updateIngredientCount = (ingredientName, i) => {
    setIngredients((prevIngredients) => {
      let newCount = Math.max(prevIngredients[ingredientName].count + i, 0);
      return { 
        ...prevIngredients,
        [ingredientName]: {
          ...prevIngredients[ingredientName],
          count: newCount
        }
      };
    });
  }; 
 
  

  let totalPrice = () => {
    return Object.values(ingredients).reduce((total, ingredient) => {         
      return total + ingredient.count * ingredient.price;
    }, 5); // Starting with a base price of 5
  };
                              
  let add = () => {
    let selectedIngredients = Object.values(ingredients).filter(ingredient => ingredient.count > 0);
    let pizzaToAdd = {
      id: Date.now(), // Ensure a unique id for the custom pizza
      name: 'Custom Pizza',
      price: totalPrice(),
      ingredients: selectedIngredients.map(ingredient => `${ingredient.name} x${ingredient.count}`),
      image: '/path/to/default-pizza-image.png' // Replace with your default pizza image path
    }; 
    dispatch(addToCart(pizzaToAdd));
  };


    let imagePath = (imageFile) => {
        const baseUrl = import.meta.url; 
        return new URL(`../assets/${imageFile}`, baseUrl).href; 
    };



  return (
    <div className="create-pizza-container bg-[#A44200] w-full h-auto p-5">
      <h1 className=' text-center text-[3rem] mb-5 mt-[-4rem] font-extrabold max-[400px]:text-[1.7rem] max-[400px]:mt-2 '>Compose your pizza</h1>
      <div className=' w-full flex justify-center'>
        <img src={emptypizza} className=' mb-16 w-[40%] max-[400px]:w-[50%] ' alt="" />
      </div>
      <div className=' flex justify-center items-center gap-10 mb-5 max-[400px]:flex-col '>
        <div className="ingredients-selector bg-[#D58936] scrollbar-thumb-yellow overflow-y-auto w-[40%] h-[330px] rounded-3xl p-8 shadow-inner flex flex-col gap-10 max-[400px]:w-[98%] max-[400px]:h-[350px] ">
            {Object.values(ingredients).map((ingredient) => (
            <div key={ingredient.name} className=' flex items-center justify-between'>
                <div className=' flex gap-2 items-center'>
                    <img src={imagePath(ingredient.image)} alt={ingredient.name} className=' w-[40%]' />
                    <span className=' font-extrabold text-lg max-[400px]:text-sm'>{ingredient.name}</span>
                </div>
                <div className=' flex items-center gap-2 max-[400px]:gap-0'>
                    <button className=' bg-[#3C1518] hover:bg-[#A44200] shadow-inner text-[#F2F3AE] mx-2 p-1 px-3 font-mono rounded-full' onClick={() => updateIngredientCount(ingredient.name, 1)}>+</button>
                    <span className=' font-mono'>{ingredient.count}</span>
                    <button className=' bg-[#3C1518] hover:bg-[#A44200] shadow-inner text-[#F2F3AE] mx-2 p-1 px-3 font-mono rounded-full' onClick={() => updateIngredientCount(ingredient.name, -1)}>-</button>


                <div>
                    <span>{ingredient.price}€</span>
                </div>
                </div>   
            </div>
            ))}
            </div>
            <div className="selected-ingredients bg-[#D58936] scrollbar-thumb-yellow overflow-y-auto w-[22%] h-[310px] rounded-2xl p-8 shadow-inner max-[400px]:w-[85%]">
                <h2 className=' text-center font-extrabold text-2xl underline'>Your composition</h2>
                {Object.values(ingredients).filter(ing => ing.count > 0).map((ingredient) => (
                    <div className=' flex flex-col items-center p-2'>
                        <p className=' bg-[#A44200] hover:bg-[#F2F3AE] p-3 px-10 w-[90%] mt-2 font-extrabold flex justify-between' key={ingredient.name}>  {ingredient.name} <span className=' font-mono'> x{ingredient.count}</span></p>
                    </div>
                ))}
            </div>

        </div>
        <div className=' w-full flex flex-col justify-center items-center p-4'>

            <p className=' mb-2 font-extrabold text-lg'>Total: {totalPrice().toFixed(2)}€</p>

            <div className=' p-3 flex gap-5'>
                <button className=' bg-[#69140E] shadow-inner p-3 px-4 font-extrabold text-[#F2F3AE] rounded-full' onClick={add}>Add to cart</button>
                <Link to="/pizzas" className=' bg-[#69140E] shadow-inner p-3 px-4 font-extrabold text-[#F2F3AE] rounded-full'>Back to menu</Link>
            </div>
        
        </div>

    </div>
  );
};

export default CreatePizza;

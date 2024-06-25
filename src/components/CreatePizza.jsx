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
  
  // Effect to initialize the ingredients state when the component mounts
  useEffect(() => {
    // Initialize the ingredients state with the ingredients data
    let initialIngredientsState = ingredientsData.ingredients.reduce((acc, ingredient) => {
      // For each ingredient, add it to the accumulator object with a count of 0
      acc[ingredient.name] = { ...ingredient, count: 0 };
      // Return the updated accumulator object for the next iteration
      return acc;
    }, {}); // Start with an empty object as the initial value for the accumulator

    // Set the initial state of the ingredients using the generated initialIngredientsState
    setIngredients(initialIngredientsState);
  }, []);



  // Function to update the count of an ingredient
  let updateIngredientCount = (ingredient, i) => {

    // Use the setIngredients function to update the state based on the previous state
    setIngredients((prevIngredients) => {
      // Calculate the new count for the ingredient by adding the increment/decrement value (i) to the current count
    // Ensure the new count is not negative by using Math.max
      let newCount = Math.max(prevIngredients[ingredient].count + i, 0);
       // Return a new object that spreads the previous ingredients state and updates the count of the specified ingredient
      return { 
        ...prevIngredients,
        [ingredient]: {
          ...prevIngredients[ingredient],
          count: newCount
        }
      };
    });
    
  }; 
 
  
   // Function to calculate the total price of the pizza
  let totalPrice = () => {
     // Use Object.values to get an array of ingredient objects from the ingredients state
    return Object.values(ingredients).reduce((total, ingredient) => {   
      // For each ingredient, multiply its count by its price and add it to the total
      // This calculates the total cost of all selected ingredients      
      return total + ingredient.count * ingredient.price;
    }, 5); // Starting with a base price of 5
  };
  


  // Function to add the custom pizza to the cart
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
    return new URL(`../assets/${imageFile}`, import.meta.url).href;
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

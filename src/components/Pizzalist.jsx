import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPizzas, sortPizzasByPrice , sortPizzasByIngredient} from './../Redux/Pizza//PizzaSlice';
import { addToCart} from './../Redux/Cart/CartSlice'
import data from './../assets/json/data.json'
import { useNavigate } from 'react-router-dom';


const PizzaList = () => {
    const dispatch = useDispatch();
    const pizzas = useSelector((state) => state.pizza.sortedPizzas);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setPizzas(data.pizzas));
    }, [dispatch]);

                               
    // sort with dropdown choice 
    const sortChange = (e) => {
        const value = e.target.value;
        if (value.startsWith("price_")) {
            // Tri par prix
            const [, order] = value.split("_");
            dispatch(sortPizzasByPrice(order));
        } else if (value.startsWith("ingredient_")) {
            // Filtrage par ingrédient
            const [, ingredient] = value.split("_");
            dispatch(sortPizzasByIngredient(ingredient));
        } else {
            // Réinitialiser l'affichage si l'option par défaut est sélectionnée
            dispatch(setPizzas(data.pizzas));
        }
    };

    const add = (pizza) => {
        dispatch(addToCart(pizza));
    };
        

    let imagePath = (imageFile) => {
        const baseUrl = import.meta.url; 
        return new URL(`../assets/${imageFile}`, baseUrl).href; 
    };
      
      const pizzaClick = (pizzaId) => {
        navigate(`/pizza/${pizzaId}`);
    };
                      
    

  return (
    <div className="containerlist  bg-[#A44200] w-full ">   
      <div className="flex justify-end max-[400px]:justify-center max-[400px]:items-center py-3 p-4 mx-12">
        <select onChange={sortChange} className="bg-[#69140E] cursor-pointer text-white font-bold py-2 px-4 rounded max-[400px]:mt-8">

          <option value="">Select Sort Option</option>
          <option value="price_asc">Price - Low to High</option>
          <option value="price_desc">Price - High to Low</option>
          <option disabled>--- Ingredients ---</option>
          
          <option value="ingredient_Mozzarella">Mozzarella</option>
          <option value="ingredient_Pepperoni">Pepperoni</option> 
            
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-1 gap-y-[9rem] max-[400px]:gap-y-[6rem] justify-items-center mt-20 max-[400px]:mt-5 relative p-10">
        {pizzas.map((pizza) => (
          <div key={pizza.id}  className="w-[34rem] h-[24rem] max-[400px]:w-[20rem] max-[400px]:h-[28rem] rounded-2xl overflow-hidden shadow-inner bg-[#3C1518] hover:bg-[#69140E] hover:opacity-90 cursor-pointer flex flex-col gap-5 max-[400px]:gap-8 p-3">
                <img className=" absolute w-[13%] ms-[23rem] mt-[-4.5rem] max-[400px]:ms-[13.3rem] max-[400px]:mt-[-2.2rem] max-[400px]:w-[30%] " src={imagePath(pizza.image)} alt={pizza.name} />
            <div className="px-6 py-4 flex flex-col gap-3">
              <div className="font-bold text-[2.8rem] mb-2 text-white">{pizza.name}</div>
              <p className=" text-center text-gray-300 mt-5 text-[1.3rem] w-[70%] mx-12">
                {pizza.ingredients.join(', ')}
              </p>
            </div> 
            <div className=" w-full flex justify-center items-center gap-5  px-6 pb-2">                                                          
              <button 
                onClick={() => add(pizza)}
                className="bg-[#F2F3AE] text-[#3c1717] font-bold py-2 px-8 cursor-pointer hover:bg-[#3c1717] hover:text-white shadow-inner rounded-2xl"      
              >
                Add to Cart
              </button>
              <span className="inline-block text-[#F2F3AE] rounded-full px-3 py-1 text-[2.5rem] font-semibold">
                {pizza.price}€
              </span>
            </div>
            <div className=' p-5 w-full flex justify-end max-[400px]:p-2 max-[400px]:justify-center'>
                <button onClick={() => pizzaClick(pizza.id)} className='bg-[#F2F3AE] px-3 p-1 opacity-70 hover:opacity-100 rounded-md shadow-inner'>
                    Check 
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;





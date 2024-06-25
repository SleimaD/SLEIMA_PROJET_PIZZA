import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './../assets/Logo.png'


const Navbar = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const lastTwoItems = Object.values(items).slice(-2);

  return (
    <nav className="bg-[#A44200] text-white p-5 px-16 max-[400px]:w-full ">
      <div className="container  flex justify-between items-center max-[400px]:justify-start max-[400px]:w-full ">
        <Link to="/" className="text-2xl font-bold">
          <div><img src={Logo} className=' w-[70%] max-[400px]:w-[98%]' alt="" /> </div>
        </Link>              
        <div className="relative max-[400px]:w-full ">
        <Link to="/cart" className="group">             
          <button className="px-10 py-3 text-[#371111] font-bold rounded-xl bg-[#F2F3AE] hover:bg-[#D58936] text-[1.2rem] transition duration-300 shadow-inner max-[400px]:px-14 max-[400px]:text-[1rem] max-[400px]:py-1">
            Cart ({Object.keys(items).length})
          </button>
          <div className="absolute right-0 w-64 mt-2 p-3 bg-[#F2F3AE] text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <div className="font-bold text-sm mb-2">Last 2 pizzas added</div>
            {lastTwoItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2 bg-[#A44200] p-2 ">
                <span className="text-sm text-[#F2F3AE] font-extrabold">{item.data.name}</span>
                <span className="text-sm text-[#F2F3AE]">x{item.quantity}</span>
              </div>
            ))}
            <div className="text-right text-sm font-bold">
              Total: €{total.toFixed(2)}
            </div>
          </div>
        </Link>

          {/* <Link to="/cart">
            <button  className="px-10 py-3 text-[#371111] font-bold rounded-xl bg-[#F2F3AE] hover:bg-[#D58936] text-[1.2rem] transition duration-300 shadow-inner max-[400px]:px-14 max-[400px]:text-[1rem] max-[400px]:py-1">Cart ({Object.keys(items).length})</button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



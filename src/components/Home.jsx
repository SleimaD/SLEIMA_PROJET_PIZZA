import React from 'react';
import { Link } from 'react-router-dom';
import Bg from './../assets/bg1.png'

const Home = () => {
  return (
    <div className=" relative flex flex-col   h-[100vh] bg-[#A44200] overflow-y-hidden overflow-x-hidden">
      <img src={Bg} className=' absolute  w-[40%] top-[-30%] max-[400px]:top-[50%] max-[400px]:w-[60%] max-[400px]:right-[6rem] right-[8.5rem]' alt="" />
      <div className=' w-full flex justify-center'>
      <h1 className="text-[4rem] max-[400px]:text-[1.8rem] max-[400px]:mt-10 font-bold mb-[5rem] font-italiana">SLEY'S PIZZAS</h1>
      </div>
      <div className=" flex flex-col gap-5 max-[400px]:items-center">
        <Link to="/pizzas" className="bg-[#69140E] max-[400px]:px-2 max-[400px]:py-2 max-[400px]:w-[50%] max-[400px]:mx-0 text-white text-lg font-bold px-6 py-8 rounded-xl  hover:bg-[#D58936] transition duration-300 mx-[15rem] text-center w-[20%] shadow-inner">
          Our Pizzas
        </Link>
        <Link to="/createpizza" className="bg-[#69140E] max-[400px]:px-2 max-[400px]:py-4 max-[400px]:w-[50%] max-[400px]:mx-0 text-white text-lg font-bold px-6 py-8 rounded-xl  hover:bg-[#D58936] transition duration-300 mx-[15rem] text-center w-[20%] shadow-inner">
          Make Your Own Pizza
        </Link>
      </div>
    </div>
  );
};
  
export default Home;

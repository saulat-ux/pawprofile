// a simple home page
import React from 'react'


const Home = () => {
  return (
    <div>
    
    <div className="min-h-screen flex flex-col justify-center items-baseline  bg-black text-yellow-400">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        <img src='https://www.akc.org/wp-content/uploads/2017/11/Affenpinscher-running-outdoors.jpg' alt="Dog Breeds" className=" border-4 border-yellow-400" />
        <img src='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12153923/American-Eskimo-Dog-running-outdoors1.jpg' alt="Dog Breeds" className=" border-4 border-yellow-400" />
        <img src='https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2021/01/18151213/Alaskan-Klee-Kai-head-portrait-outdoors-11.jpg' alt="Dog Breeds"  className=" border-4 border-yellow-400" />

      </div>
      <h1 className="text-4xl font-bold  mb-6 ml-6">Welcome to PawProfile Pro!</h1>

    

      <p className="text-xl mb-8  w-1/2">Your go-to place for information on different dog breeds. Here you get to access the latest information about about dog breed. you will know whether the dog is worth as a pet  by knowing its traits also life expectancy.</p>
     

      <a href="/breeds" className="bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300">
        Explore Breeds
      </a>
    </div>
  
    </div>
  )
}

export default Home
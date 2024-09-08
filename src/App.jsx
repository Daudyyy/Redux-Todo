
import React from "react";
import backgroungImg from './assets/images/gradiant.jpeg';
import Card from "./components/Card";

function App() {
  return (
    <div 
    className="relative w-screen h-screen">
      <img
      src={backgroungImg}
      alt="Image description"
      className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative flex items-center justify-center w-full h-full">
        <Card />
      </div>
    </div>
  );
}

export default App;
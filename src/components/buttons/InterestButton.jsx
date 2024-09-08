import React, { useState } from 'react';

const Button = ({ text, icon, initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected); // Use state for dynamic selection

  const toggleSelected = () => {
    setSelected(!selected); // Toggle selected state on click
  };

  return (
    <div
      onClick={toggleSelected} // Add click functionality to toggle selection
      className={`cursor-pointer relative flex items-center border justify-center px-4 py-2 m-2 rounded-full text-purple-800 font-medium
        ${selected ? 'bg-purple-200' : 'bg-white'} 
        ${!selected && 'hover:bg-purple-100'} transition-colors duration-300 ease-in-out`}
    >
      <span className="text-xl mr-2">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default Button;

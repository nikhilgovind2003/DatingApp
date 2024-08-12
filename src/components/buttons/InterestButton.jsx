import React from 'react';

const Button = ({ text, icon, selected }) => {
  return (
    <div className={`relative flex items-center justify-center px-4 py-2 m-2 rounded-full text-purple-800 font-medium
      ${selected ? 'bg-purple-200' : 'bg-white'} 
      ${!selected && 'hover:bg-purple-100'} transition-colors duration-300 ease-in-out`}>
      <span className="text-xl mr-2">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Button text="Football" icon="⚽" selected={false} />
      <Button text="Nature" icon="🍃" selected={false} />
      <Button text="Language" icon="🧠" selected={false} />
      <Button text="Photography" icon="📸" selected={false} />
      <Button text="Music" icon="🎵" selected={false} />
      <Button text="Writing" icon="✍" selected={false} />
    </div>
  );
};

export default App;

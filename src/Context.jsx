import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext();

export default props => {
  const [color, setColor] = useState('yellow');

  useEffect(() => {
    document.title = 'Color Swaps';
    setColor('green');
  }, []);

  useEffect(() => {
    console.log(`Color is now ${color}`)
  }, [color])

  return (
    <AppContext.Provider
      value={{
        color,
        setColor
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};


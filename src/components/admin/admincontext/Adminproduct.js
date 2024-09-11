import React, { createContext } from 'react';

// Create the context
export const Admincontext = createContext();

function Adminproduct({ children }) {
  // Context value to be shared
  const contextValue = "fgfuj";

  return (
    <Admincontext.Provider value={contextValue}>
      {children}
    </Admincontext.Provider>
  );
}

export default Adminproduct;

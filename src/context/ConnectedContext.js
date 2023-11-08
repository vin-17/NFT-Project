import React, { createContext, useState } from 'react';

export const ConnectedContext = createContext();

export const ConnectedProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  const toggleConnect = (isConnected) => {
    setConnected(!isConnected)
  };

  return (
    <ConnectedContext.Provider value={{ connected, toggleConnect }}>
      {children}
    </ConnectedContext.Provider>
  );
};
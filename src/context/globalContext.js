import { useContext, createContext, useState, useRef, useEffect } from "react";
import * as THREE from "three";

const initialState = {
  selectedNavItem: "",
  setSelectedNavItem: () => {},
};

export const GlobalContext = createContext(initialState);

GlobalContext.displayName = "GlobalContext";

export const GlobalContextProvider = ({ children }) => {
  const [selectedNavItem, setSelectedNavItem] = useState(
    initialState.selectedNavItem
  );

  return (
    <GlobalContext.Provider
      value={{
        selectedNavItem,
        setSelectedNavItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(`useGlobalContext must be used within a Provider`);
  }

  return context;
};

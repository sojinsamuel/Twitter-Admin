"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext(undefined) as any;

export function AppProvider({ children }: { children: React.ReactNode }) {
  let [name, setName] = useState("");
  return (
    <AppContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

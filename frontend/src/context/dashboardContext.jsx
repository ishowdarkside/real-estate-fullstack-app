/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const dashboardContext = createContext();

export default function DashboardContext({ children }) {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <dashboardContext.Provider value={{ activeBuilding, setActiveBuilding }}>
      {children}
    </dashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(dashboardContext);
  if (!context) throw new Error("YOU CANT USE DASHBOARD CONTEXT HERE");

  return context;
}

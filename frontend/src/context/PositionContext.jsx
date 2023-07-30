/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function PositionContext({ children }) {
  const [position, setPosition] = useState([]);
  return (
    <context.Provider value={{ position, setPosition }}>
      {children}
    </context.Provider>
  );
}

export function usePositionContext() {
  const positionContext = useContext(context);
  if (positionContext === undefined)
    throw new Error("Context used in FORBIDDEN PLACE");
  return positionContext;
}

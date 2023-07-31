/* eslint-disable react/prop-types */

//KONTEKST koji se koristi kod odredjivanja pozicije markera kod kreiranja objave
//koriscen je na 3 razlicita mjesta
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

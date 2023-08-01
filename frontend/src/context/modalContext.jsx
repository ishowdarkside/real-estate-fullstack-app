/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function ModalContext({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <context.Provider
      value={{ isOpenModal, setIsOpenModal, setSelectedPost, selectedPost }}
    >
      {children}
    </context.Provider>
  );
}

export function useModalContext() {
  const modalContext = useContext(context);
  if (!modalContext) throw new Error("Context not provided HERE!");
  return modalContext;
}

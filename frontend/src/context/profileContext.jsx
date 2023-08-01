import { createContext, useContext, useState } from "react";

const profileContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ProfileContext({ children }) {
  const [activeProfile, setActiveProfile] = useState(null);
  return (
    <profileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </profileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(profileContext);
  if (!context) throw new Error("You can't use context HERE!");
  return context;
}

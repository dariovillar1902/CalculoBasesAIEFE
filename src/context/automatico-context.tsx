// context/automatico-context.tsx
import { createContext, useContext, useState } from "react";

const AutomaticoContext = createContext(null);

export const AutomaticoProvider = ({ children }) => {
  const [automatico, setAutomatico] = useState(true);
  const [invertirResultados, setInvertirResultados] = useState(false);
  const [mostrarFormulas, setMostrarFormulas] = useState(true);

  return (
    <AutomaticoContext.Provider
      value={{
        automatico,
        setAutomatico,
        invertirResultados,
        setInvertirResultados,
        mostrarFormulas,
        setMostrarFormulas,
      }}
    >
      {children}
    </AutomaticoContext.Provider>
  );
};

export const useAutomatico = () => useContext(AutomaticoContext);

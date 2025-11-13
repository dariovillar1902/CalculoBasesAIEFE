import React, { createContext, useContext, useState } from "react";

interface AutomaticoContextType {
  automatico: boolean;
  setAutomatico: (value: boolean) => void;
  invertirResultados: boolean;
  setInvertirResultados: (value: boolean) => void;
  mostrarFormulas: boolean;
  setMostrarFormulas: (value: boolean) => void;
}

const AutomaticoContext = createContext<AutomaticoContextType | undefined>(
  undefined
);

export const AutomaticoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

export const useAutomatico = () => {
  const context = useContext(AutomaticoContext);
  if (context === undefined) {
    throw new Error(
      "useAutomatico debe usarse dentro de un AutomaticoProvider"
    );
  }
  return context;
};

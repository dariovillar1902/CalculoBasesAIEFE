import { createContext, useContext, useState, useEffect } from "react";

interface AutomaticoContextType {
  automatico: boolean;
  setAutomatico: (value: boolean) => void;
}

const AutomaticoContext = createContext<AutomaticoContextType | undefined>(
  undefined
);

export const AutomaticoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [automatico, setAutomatico] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("automatico") || "true"); // Default to true
  });

  useEffect(() => {
    localStorage.setItem("automatico", JSON.stringify(automatico)); // Persist state
  }, [automatico]);

  return (
    <AutomaticoContext.Provider value={{ automatico, setAutomatico }}>
      {children}
    </AutomaticoContext.Provider>
  );
};

export const useAutomatico = () => {
  const context = useContext(AutomaticoContext);
  if (!context) {
    throw new Error("useAutomatico must be used within an AutomaticoProvider");
  }
  return context;
};

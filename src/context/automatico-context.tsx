import React, { createContext, useContext, useState } from "react";

// Esta interfaz define la forma de los datos que van a estar disponibles
// en el contexto. Sirve como contrato para que todo el código que lo use
// sepa exactamente qué propiedades existen.
interface AutomaticoContextType {
  automatico: boolean; // Indica si el cálculo automático está activado
  setAutomatico: (value: boolean) => void; // Permite cambiar el estado de "automatico"

  invertirResultados: boolean; // Indica si se deben invertir los resultados mostrados
  setInvertirResultados: (value: boolean) => void; // Setter que se usa desde la UI

  mostrarFormulas: boolean; // Controla si las fórmulas matemáticas se muestran o no
  setMostrarFormulas: (value: boolean) => void; // Setter correspondiente
}

// Se crea el contexto. Arranca en undefined porque su valor real se inyecta
// recién cuando se envuelve la aplicación con el provider.
const AutomaticoContext = createContext<AutomaticoContextType | undefined>(
  undefined
);

// Provider que envuelve la parte de la app que necesita acceder a estos valores.
// Es el encargado de almacenar y distribuir los estados globales.
export const AutomaticoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado que habilita o deshabilita el modo automático.
  const [automatico, setAutomatico] = useState(true);

  // Estado que permite mostrar resultados “invertidos” según necesidad del usuario.
  const [invertirResultados, setInvertirResultados] = useState(false);

  // Estado que decide si las fórmulas de cálculo se ven o se ocultan.
  const [mostrarFormulas, setMostrarFormulas] = useState(true);

  return (
    // Se expone el conjunto de estados y setters a cualquier componente hijo.
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
      {/* Renderiza los hijos del provider */}
      {children}
    </AutomaticoContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto.
// Simplifica la importación y agrega protección ante errores.
export const useAutomatico = () => {
  const context = useContext(AutomaticoContext);

  // Si se usa el hook fuera del provider, se lanza un error explícito.
  // Esto ayuda a detectar errores de configuración rápidamente.
  if (context === undefined) {
    throw new Error(
      "useAutomatico debe usarse dentro de un AutomaticoProvider"
    );
  }

  // Si todo está bien, se devuelve el contexto.
  return context;
};

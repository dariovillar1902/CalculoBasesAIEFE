import { configureStore } from "@reduxjs/toolkit";
import baseHormigonReducer from "./slices/baseHormigonSlice";
import baseHormigonResultsReducer from "./slices/baseHormigonResultsSlice";

// Configuración principal del store de Redux.
// Acá registramos todos los slices que conforman el estado global de la aplicación.
// Cada propiedad del objeto "reducer" representa una sección del estado.
export const store = configureStore({
  reducer: {
    // Lista de bases de hormigón cargadas desde la API
    baseHormigon: baseHormigonReducer,

    // Resultados de cálculos, verificaciones y computo de una base seleccionada
    baseHormigonResults: baseHormigonResultsReducer,
  },
});

// Tipo que representa la forma completa del estado global.
// Se utiliza para tipar correctamente el useSelector.
export type RootState = ReturnType<typeof store.getState>;

// Tipo que representa la función dispatch tipada según los thunks y acciones disponibles.
// Se utiliza para tipar el useDispatch personalizado.
export type AppDispatch = typeof store.dispatch;

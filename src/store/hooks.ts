import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Hook personalizado que envuelve al useDispatch original.
// Esto permite que el dispatch esté tipado correctamente según nuestra app.
// En pocas palabras: cada vez que hagas "useAppDispatch()", Redux sabrá qué tipos de acciones existen.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook personalizado para seleccionar datos del estado global.
// Evita tener que repetir el tipo RootState en cada useSelector del proyecto.
// Con esto, cuando hagas "useAppSelector()", el autocompletado te va a mostrar todas
// las partes del estado disponibles.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

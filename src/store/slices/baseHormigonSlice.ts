import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";

// Estado que maneja la lista de bases de hormigón obtenidas desde el backend
interface BaseHormigonFormState {
  data: BaseHormigon[]; // Array con todas las bases cargadas
  loading: boolean; // Indica si la carga está en proceso (sirve para loaders/spinners)
  error: string | null; // Guarda un mensaje de error si la carga falla
}

// Estado inicial antes de cargar cualquier dato
const initialState: BaseHormigonFormState = {
  data: [],
  loading: false,
  error: null,
};

// Acción asíncrona para obtener todas las bases de hormigón desde la API
// createAsyncThunk maneja automáticamente los estados: pending, fulfilled y rejected
export const fetchBasesHormigon = createAsyncThunk<BaseHormigon[]>(
  "baseHormigon/fetch",
  async () => {
    // Llamada al endpoint que devuelve todas las bases guardadas en el backend
    const response = await api.get<BaseHormigon[]>("baseshormigon");
    return response.data; // Devolvemos los datos para que Redux los almacene
  }
);

// Slice que centraliza el manejo del estado de bases de hormigón
const baseHormigonSlice = createSlice({
  name: "baseHormigon",
  initialState,
  reducers: {}, // No hay acciones síncronas por ahora

  // Manejo de las respuestas de la acción asíncrona definida arriba
  extraReducers: (builder) => {
    builder
      // Cuando la carga comienza, activamos el "loading"
      .addCase(fetchBasesHormigon.pending, (state) => {
        state.loading = true;
      })

      // Si la carga fue exitosa:
      // - apagamos el "loading"
      // - almacenamos los datos recibidos del backend
      .addCase(
        fetchBasesHormigon.fulfilled,
        (state, action: PayloadAction<BaseHormigon[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      // Si ocurrió un error en la carga:
      // - apagamos el "loading"
      // - guardamos el mensaje de error para mostrarlo en la UI
      .addCase(fetchBasesHormigon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

// Exportamos el reducer para integrarlo en el store de Redux
export default baseHormigonSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Estado que maneja el proceso de exportación en distintos formatos.
// Se usa para mostrar feedback al usuario (cargando, éxito, error).
interface BaseHormigonExcelState {
  exporting: boolean; // Indica si una exportación está en progreso
  success: boolean; // Indica si la exportación finalizó correctamente
  error: string | null; // Guarda un mensaje de error si algo falla
}

// Estado inicial del slice
const initialState: BaseHormigonExcelState = {
  exporting: false,
  success: false,
  error: null,
};

// Thunk asincrónico para exportar la base a Excel.
// createAsyncThunk simplifica mucho el manejo de acciones async.
export const exportBaseHormigonExcel = createAsyncThunk<Blob, number>(
  "baseHormigonExcel/export",
  async (baseId, { rejectWithValue }) => {
    try {
      // Se hace una llamada POST esperando recibir un archivo (Blob)
      const response = await api.post<Blob>(
        `baseshormigonio/exportExcel/${baseId}`,
        {}, // Envío vacío porque solo se necesita el ID
        { responseType: "blob" } // Indica que esperamos un archivo binario
      );
      return response.data; // El archivo exportado
    } catch (error: any) {
      // Se captura el error y se retorna un mensaje entendible
      return rejectWithValue(error.response?.data || "Error al exportar Excel");
    }
  }
);

// Thunk para exportar CSV (mismo mecanismo que el anterior)
export const exportBaseHormigonCsv = createAsyncThunk<Blob, number>(
  "baseHormigonExcel/exportCsv",
  async (baseId, { rejectWithValue }) => {
    try {
      const response = await api.post<Blob>(
        `baseshormigonio/exportCsv/${baseId}`,
        {},
        { responseType: "blob" }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error al exportar CSV");
    }
  }
);

// Thunk para exportar PDF
export const exportBaseHormigonPdf = createAsyncThunk<Blob, number>(
  "baseHormigonExcel/exportPdf",
  async (baseId, { rejectWithValue }) => {
    try {
      const response = await api.post<Blob>(
        `baseshormigonio/exportPdf/${baseId}`,
        {},
        { responseType: "blob" }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error al exportar PDF");
    }
  }
);

// Slice que administra el estado de exportación
const baseHormigonExcelSlice = createSlice({
  name: "baseHormigonExcel",
  initialState,
  reducers: {
    // Permite resetear el estado a su condición inicial.
    // Útil cuando cerrás un modal, cambiás de pantalla, etc.
    resetExportState(state) {
      state.exporting = false;
      state.success = false;
      state.error = null;
    },
  },

  // Manejo de los 3 estados del thunk:
  // pending → comienza la exportación
  // fulfilled → terminó bien
  // rejected → ocurrió un error
  extraReducers: (builder) => {
    builder
      // -------- EXCEL --------
      .addCase(exportBaseHormigonExcel.pending, (state) => {
        state.exporting = true; // Se activa el indicador de proceso en curso
        state.success = false;
        state.error = null;
      })
      .addCase(exportBaseHormigonExcel.fulfilled, (state) => {
        state.exporting = false;
        state.success = true; // Señal de éxito
      })
      .addCase(exportBaseHormigonExcel.rejected, (state, action) => {
        state.exporting = false;
        state.error = action.payload as string; // Guarda el mensaje del error
      })

      // -------- CSV --------
      .addCase(exportBaseHormigonCsv.pending, (state) => {
        state.exporting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(exportBaseHormigonCsv.fulfilled, (state) => {
        state.exporting = false;
        state.success = true;
      })
      .addCase(exportBaseHormigonCsv.rejected, (state, action) => {
        state.exporting = false;
        state.error = action.payload as string;
      })

      // -------- PDF --------
      .addCase(exportBaseHormigonPdf.pending, (state) => {
        state.exporting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(exportBaseHormigonPdf.fulfilled, (state) => {
        state.exporting = false;
        state.success = true;
      })
      .addCase(exportBaseHormigonPdf.rejected, (state, action) => {
        state.exporting = false;
        state.error = action.payload as string;
      });
  },
});

// Exporta la acción para resetear el estado
export const { resetExportState } = baseHormigonExcelSlice.actions;

// Exporta el reducer para combinarlo en el store
export default baseHormigonExcelSlice.reducer;

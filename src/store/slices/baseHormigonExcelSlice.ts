import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface BaseHormigonExcelState {
  exporting: boolean;
  success: boolean;
  error: string | null;
}

const initialState: BaseHormigonExcelState = {
  exporting: false,
  success: false,
  error: null,
};

// Async thunk to trigger Excel export
export const exportBaseHormigonExcel = createAsyncThunk<Blob, number>(
  "baseHormigonExcel/export",
  async (baseId, { rejectWithValue }) => {
    try {
      const response = await api.post<Blob>(
        `baseshormigonio/exportExcel/${baseId}`,
        {}, // empty body
        { responseType: "blob" }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error al exportar Excel");
    }
  }
);

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

const baseHormigonExcelSlice = createSlice({
  name: "baseHormigonExcel",
  initialState,
  reducers: {
    resetExportState(state) {
      state.exporting = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exportBaseHormigonExcel.pending, (state) => {
        state.exporting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(exportBaseHormigonExcel.fulfilled, (state) => {
        state.exporting = false;
        state.success = true;
      })
      .addCase(exportBaseHormigonExcel.rejected, (state, action) => {
        state.exporting = false;
        state.error = action.payload as string;
      })
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

export const { resetExportState } = baseHormigonExcelSlice.actions;
export default baseHormigonExcelSlice.reducer;

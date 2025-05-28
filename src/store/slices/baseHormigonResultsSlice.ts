import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";

interface BaseHormigonState {
  base: BaseHormigon | null;
  dimensionesBase: any | null;
  verificaTensionAdmisible: any | null;
  calculoCuantia: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: BaseHormigonState = {
  base: null,
  dimensionesBase: null,
  verificaTensionAdmisible: null,
  calculoCuantia: null,
  loading: false,
  error: null,
};

// Fetch individual base data
export const fetchBaseHormigon = createAsyncThunk<BaseHormigon, number>(
  "baseHormigon/fetchBase",
  async (id) => {
    const response = await api.get<BaseHormigon>(`baseshormigon/${id}`);
    return response.data;
  }
);

// Fetch dimensionesBase
export const fetchDimensionesBase = createAsyncThunk<any, number>(
  "baseHormigon/fetchDimensionesBase",
  async (id) => {
    const response = await api.get<any>(`baseshormigon/${id}/dimensionesBase`);
    return response.data;
  }
);

// Fetch verificaTensionAdmisible
export const fetchVerificaTensionAdmisible = createAsyncThunk<any, number>(
  "baseHormigon/fetchVerificaTensionAdmisible",
  async (id) => {
    const response = await api.get<any>(
      `baseshormigon/${id}/verificaTensionAdmisible`
    );
    return response.data;
  }
);

// Fetch calculoCuantia
export const fetchCalculoCuantia = createAsyncThunk<any, number>(
  "baseHormigon/fetchCalculoCuantia",
  async (id) => {
    const response = await api.get<any>(`baseshormigon/${id}/calculoCuantia`);
    return response.data;
  }
);

// Slice definition
const baseHormigonResultsSlice = createSlice({
  name: "baseHormigon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaseHormigon.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBaseHormigon.fulfilled,
        (state, action: PayloadAction<BaseHormigon>) => {
          state.loading = false;
          state.base = action.payload;
        }
      )
      .addCase(fetchBaseHormigon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(
        fetchDimensionesBase.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.dimensionesBase = action.payload;
        }
      )
      .addCase(
        fetchVerificaTensionAdmisible.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.verificaTensionAdmisible = action.payload;
        }
      )
      .addCase(
        fetchCalculoCuantia.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.calculoCuantia = action.payload;
        }
      );
  },
});

export default baseHormigonResultsSlice.reducer;

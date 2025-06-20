import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";
import type { BaseHormigonVerificacionPunzonado } from "../../types/BaseHormigonVerificacionPunzonado";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte";

interface BaseHormigonResultsState {
  base: BaseHormigon | null;
  dimensionesBase: BaseHormigonDimensiones | null;
  verificaTensionAdmisible: boolean | null;
  verificaPunzonado: BaseHormigonVerificacionPunzonado | null;
  verificaCorte: BaseHormigonVerificacionCorte | null;
  calculoCuantia: BaseHormigonCuantia | null;
  calculoArmadura: BaseHormigonArmadura | null;
  loading: boolean;
  error: string | null;
}

const initialState: BaseHormigonResultsState = {
  base: null,
  dimensionesBase: null,
  verificaTensionAdmisible: null,
  verificaPunzonado: null,
  verificaCorte: null,
  calculoCuantia: null,
  calculoArmadura: null,
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
export const fetchDimensionesBase = createAsyncThunk<
  BaseHormigonDimensiones,
  number
>("baseHormigon/fetchDimensionesBase", async (id) => {
  const response = await api.get<BaseHormigonDimensiones>(
    `baseshormigon/${id}/dimensionesBase`
  );
  return response.data;
});

// Fetch verificaTensionAdmisible
export const fetchVerificaTensionAdmisible = createAsyncThunk<boolean, number>(
  "baseHormigonResults/fetchVerificaTensionAdmisible",
  async (id) => {
    const response = await api.get<boolean>(
      `baseshormigon/${id}/verificaTensionAdmisible`
    );
    return response.data;
  }
);

export const fetchCalculoCuantia = createAsyncThunk<
  BaseHormigonCuantia,
  number
>("baseHormigonResults/fetchCalculoCuantia", async (id) => {
  const response = await api.get<BaseHormigonCuantia>(
    `baseshormigon/${id}/calculoCuantia`
  );
  return response.data;
});

export const fetchCalculoArmadura = createAsyncThunk<
  BaseHormigonArmadura,
  number
>("baseHormigonResults/fetchCalculoArmadura", async (id) => {
  const response = await api.get<BaseHormigonArmadura>(
    `baseshormigon/${id}/calculoArmadura`
  );
  return response.data;
});

export const fetchVerificaPunzonado = createAsyncThunk<
  BaseHormigonVerificacionPunzonado,
  number
>("baseHormigonResults/fetchVerificaPunzonado", async (id) => {
  const response = await api.get<BaseHormigonVerificacionPunzonado>(
    `baseshormigon/${id}/verificaPunzonado`
  );
  return response.data;
});

export const fetchVerificaCorte = createAsyncThunk<
  BaseHormigonVerificacionCorte,
  number
>("baseHormigonResults/fetchVerificaCorte", async (id) => {
  const response = await api.get<BaseHormigonVerificacionCorte>(
    `baseshormigon/${id}/verificaCorte`
  );
  return response.data;
});

export const fetchCalculoArmaduraConDiametros = createAsyncThunk<
  BaseHormigonArmadura,
  { id: number; diametroX: number; diametroY: number }
>(
  "baseHormigon/fetchCalculoArmaduraConDiametros",
  async ({ id, diametroX, diametroY }) => {
    const response = await api.post<BaseHormigonArmadura>(
      `baseshormigon/calculoArmadura/${id}`,
      {
        DiametroX: diametroX,
        DiametroY: diametroY,
      }
    );
    return response.data;
  }
);

const baseHormigonResultsSlice = createSlice({
  name: "baseHormigonResults",
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
        (state, action: PayloadAction<BaseHormigonDimensiones>) => {
          state.dimensionesBase = action.payload;
        }
      )
      .addCase(fetchVerificaTensionAdmisible.fulfilled, (state, action) => {
        state.verificaTensionAdmisible = action.payload;
      })
      .addCase(
        fetchVerificaPunzonado.fulfilled,
        (state, action: PayloadAction<BaseHormigonVerificacionPunzonado>) => {
          state.verificaPunzonado = action.payload;
        }
      )
      .addCase(
        fetchVerificaCorte.fulfilled,
        (state, action: PayloadAction<BaseHormigonVerificacionCorte>) => {
          state.verificaCorte = action.payload;
        }
      )
      .addCase(
        fetchCalculoCuantia.fulfilled,
        (state, action: PayloadAction<BaseHormigonCuantia>) => {
          state.calculoCuantia = action.payload;
        }
      )
      .addCase(
        fetchCalculoArmadura.fulfilled,
        (state, action: PayloadAction<BaseHormigonArmadura>) => {
          state.calculoArmadura = action.payload;
        }
      )
      .addCase(
        fetchCalculoArmaduraConDiametros.fulfilled,
        (state, action: PayloadAction<BaseHormigonArmadura>) => {
          state.calculoArmadura = action.payload;
        }
      )
      .addCase(fetchCalculoArmaduraConDiametros.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCalculoArmaduraConDiametros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default baseHormigonResultsSlice.reducer;

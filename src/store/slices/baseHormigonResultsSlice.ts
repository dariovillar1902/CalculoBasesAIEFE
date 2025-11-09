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
import type { BaseHormigonVerificaciones } from "../../types/BaseHormigonVerificaciones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";
import type { BaseHormigonComputo } from "../../types/BaseHormigonComputo";

interface BaseHormigonResultsState {
  base: BaseHormigon | null;
  dimensionesBase: BaseHormigonDimensiones | null;
  esfuerzosBase: BaseHormigonEsfuerzos | null;
  verificacionesBase: BaseHormigonVerificaciones | null;
  verificaPunzonado: BaseHormigonVerificacionPunzonado | null;
  verificaCorte: BaseHormigonVerificacionCorte | null;
  calculoCuantia: BaseHormigonCuantia | null;
  calculoArmadura: BaseHormigonArmadura | null;
  computo: BaseHormigonComputo | null;
  loading: {
    base: boolean;
    dimensiones: boolean;
    esfuerzos: boolean;
    verificaciones: boolean;
    punzonado: boolean;
    corte: boolean;
    cuantia: boolean;
    armadura: boolean;
    computo: boolean;
  };
  error: string | null;
}

const initialState: BaseHormigonResultsState = {
  base: null,
  dimensionesBase: null,
  esfuerzosBase: null,
  verificacionesBase: null,
  verificaPunzonado: null,
  verificaCorte: null,
  calculoCuantia: null,
  calculoArmadura: null,
  computo: null,
  loading: {
    base: false,
    dimensiones: false,
    esfuerzos: false,
    verificaciones: false,
    punzonado: false,
    corte: false,
    cuantia: false,
    armadura: false,
    computo: false,
  },
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

export const fetchEsfuerzosBase = createAsyncThunk<
  BaseHormigonEsfuerzos,
  number
>("baseHormigonResults/fetchEsfuerzosBase", async (id) => {
  const response = await api.get<BaseHormigonEsfuerzos>(
    `baseshormigon/${id}/esfuerzosBase`
  );
  return response.data;
});

export const fetchVerificacionesBase = createAsyncThunk<
  BaseHormigonVerificaciones,
  number
>("baseHormigonResults/fetchVerificacionesBase", async (id) => {
  const response = await api.get<BaseHormigonVerificaciones>(
    `baseshormigon/${id}/verificacionesBase`
  );
  return response.data;
});

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

export const fetchComputo = createAsyncThunk<BaseHormigonComputo, number>(
  "baseHormigonResults/fetchComputo",
  async (id) => {
    const response = await api.get<BaseHormigonComputo>(
      `baseshormigon/${id}/computo`
    );
    return response.data;
  }
);

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
      // BASE
      .addCase(fetchBaseHormigon.pending, (state) => {
        state.loading.base = true;
      })
      .addCase(fetchBaseHormigon.fulfilled, (state, action) => {
        state.loading.base = false;
        state.base = action.payload;
      })
      .addCase(fetchBaseHormigon.rejected, (state, action) => {
        state.loading.base = false;
        state.error = action.error.message ?? null;
      })

      // DIMENSIONES
      .addCase(fetchDimensionesBase.pending, (state) => {
        state.loading.dimensiones = true;
      })
      .addCase(fetchDimensionesBase.fulfilled, (state, action) => {
        state.loading.dimensiones = false;
        state.dimensionesBase = action.payload;
      })
      .addCase(fetchDimensionesBase.rejected, (state, action) => {
        state.loading.dimensiones = false;
        state.error = action.error.message ?? null;
      })

      // ESFUERZOS
      .addCase(fetchEsfuerzosBase.pending, (state) => {
        state.loading.esfuerzos = true;
      })
      .addCase(fetchEsfuerzosBase.fulfilled, (state, action) => {
        state.loading.esfuerzos = false;
        state.esfuerzosBase = action.payload;
      })
      .addCase(fetchEsfuerzosBase.rejected, (state, action) => {
        state.loading.esfuerzos = false;
        state.error = action.error.message ?? null;
      })

      // VERIFICACIONES
      .addCase(fetchVerificacionesBase.pending, (state) => {
        state.loading.verificaciones = true;
      })
      .addCase(fetchVerificacionesBase.fulfilled, (state, action) => {
        state.loading.verificaciones = false;
        state.verificacionesBase = action.payload;
      })
      .addCase(fetchVerificacionesBase.rejected, (state, action) => {
        state.loading.verificaciones = false;
        state.error = action.error.message ?? null;
      })

      // PUNZONADO
      .addCase(fetchVerificaPunzonado.pending, (state) => {
        state.loading.punzonado = true;
      })
      .addCase(fetchVerificaPunzonado.fulfilled, (state, action) => {
        state.loading.punzonado = false;
        state.verificaPunzonado = action.payload;
      })
      .addCase(fetchVerificaPunzonado.rejected, (state, action) => {
        state.loading.punzonado = false;
        state.error = action.error.message ?? null;
      })

      // CORTE
      .addCase(fetchVerificaCorte.pending, (state) => {
        state.loading.corte = true;
      })
      .addCase(fetchVerificaCorte.fulfilled, (state, action) => {
        state.loading.corte = false;
        state.verificaCorte = action.payload;
      })
      .addCase(fetchVerificaCorte.rejected, (state, action) => {
        state.loading.corte = false;
        state.error = action.error.message ?? null;
      })

      // CUANTIA
      .addCase(fetchCalculoCuantia.pending, (state) => {
        state.loading.cuantia = true;
      })
      .addCase(fetchCalculoCuantia.fulfilled, (state, action) => {
        state.loading.cuantia = false;
        state.calculoCuantia = action.payload;
      })
      .addCase(fetchCalculoCuantia.rejected, (state, action) => {
        state.loading.cuantia = false;
        state.error = action.error.message ?? null;
      })

      // ARMADURA
      .addCase(fetchCalculoArmadura.pending, (state) => {
        state.loading.armadura = true;
      })
      .addCase(fetchCalculoArmadura.fulfilled, (state, action) => {
        state.loading.armadura = false;
        state.calculoArmadura = action.payload;
      })
      .addCase(fetchCalculoArmadura.rejected, (state, action) => {
        state.loading.armadura = false;
        state.error = action.error.message ?? null;
      })

      // COMPUTO
      .addCase(fetchComputo.pending, (state) => {
        state.loading.computo = true;
      })
      .addCase(fetchComputo.fulfilled, (state, action) => {
        state.loading.computo = false;
        state.computo = action.payload;
      })
      .addCase(fetchComputo.rejected, (state, action) => {
        state.loading.computo = false;
        state.error = action.error.message ?? null;
      })

      .addCase(fetchCalculoArmaduraConDiametros.fulfilled, (state, action) => {
        state.calculoArmadura = action.payload;
      });
  },
});

export default baseHormigonResultsSlice.reducer;

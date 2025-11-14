// Importamos herramientas de Redux Toolkit para crear slices y manejar acciones asíncronas
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Cliente HTTP centralizado para realizar llamadas a la API del backend
import api from "../../utils/api";

// Importamos los tipos de datos que devuelve cada endpoint del backend
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";
import type { BaseHormigonVerificacionPunzonado } from "../../types/BaseHormigonVerificacionPunzonado";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte";
import type { BaseHormigonVerificaciones } from "../../types/BaseHormigonVerificaciones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";
import type { BaseHormigonComputo } from "../../types/BaseHormigonComputo";

// Estado general donde guardamos todos los resultados de cálculos de la base de hormigón
interface BaseHormigonResultsState {
  base: BaseHormigon | null; // Datos generales de la base
  dimensionesBase: BaseHormigonDimensiones | null; // Dimensiones geométricas
  esfuerzosBase: BaseHormigonEsfuerzos | null; // Esfuerzos calculados
  verificacionesBase: BaseHormigonVerificaciones | null; // Verificaciones generales
  verificaPunzonado: BaseHormigonVerificacionPunzonado | null; // Cálculo de punzonado
  verificaCorte: BaseHormigonVerificacionCorte | null; // Cálculo por corte
  calculoCuantia: BaseHormigonCuantia | null; // Cálculo de cuantía mínima / requerida
  calculoArmadura: BaseHormigonArmadura | null; // Cálculo de armaduras según resultados
  computo: BaseHormigonComputo | null; // Cómputo de materiales

  // Flags que indican si un cálculo está en curso (útil para mostrar loaders en UI)
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

  // Si ocurre un error en alguna llamada a la API, se guarda acá
  error: string | null;
}

// Estado inicial cuando todavía no hay datos cargados
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

// Acción asíncrona para obtener los datos generales de la base
export const fetchBaseHormigon = createAsyncThunk<BaseHormigon, number>(
  "baseHormigon/fetchBase",
  async (id) => {
    const response = await api.get<BaseHormigon>(`baseshormigon/${id}`);
    return response.data;
  }
);

// Acción asíncrona para obtener las dimensiones de la base
export const fetchDimensionesBase = createAsyncThunk<
  BaseHormigonDimensiones,
  number
>("baseHormigon/fetchDimensionesBase", async (id) => {
  const response = await api.get<BaseHormigonDimensiones>(
    `baseshormigon/${id}/dimensionesBase`
  );
  return response.data;
});

// Acción para traer esfuerzos de cálculo desde el backend
export const fetchEsfuerzosBase = createAsyncThunk<
  BaseHormigonEsfuerzos,
  number
>("baseHormigonResults/fetchEsfuerzosBase", async (id) => {
  const response = await api.get<BaseHormigonEsfuerzos>(
    `baseshormigon/${id}/esfuerzosBase`
  );
  return response.data;
});

// Acción para traer verificaciones generales
export const fetchVerificacionesBase = createAsyncThunk<
  BaseHormigonVerificaciones,
  number
>("baseHormigonResults/fetchVerificacionesBase", async (id) => {
  const response = await api.get<BaseHormigonVerificaciones>(
    `baseshormigon/${id}/verificacionesBase`
  );
  return response.data;
});

// Acción para calcular la cuantía de acero
export const fetchCalculoCuantia = createAsyncThunk<
  BaseHormigonCuantia,
  number
>("baseHormigonResults/fetchCalculoCuantia", async (id) => {
  const response = await api.get<BaseHormigonCuantia>(
    `baseshormigon/${id}/calculoCuantia`
  );
  return response.data;
});

// Acción para calcular la armadura según los parámetros de la base
export const fetchCalculoArmadura = createAsyncThunk<
  BaseHormigonArmadura,
  number
>("baseHormigonResults/fetchCalculoArmadura", async (id) => {
  const response = await api.get<BaseHormigonArmadura>(
    `baseshormigon/${id}/calculoArmadura`
  );
  return response.data;
});

// Acción para obtener el cómputo de materiales
export const fetchComputo = createAsyncThunk<BaseHormigonComputo, number>(
  "baseHormigonResults/fetchComputo",
  async (id) => {
    const response = await api.get<BaseHormigonComputo>(
      `baseshormigon/${id}/computo`
    );
    return response.data;
  }
);

// Acción para verificar punzonado
export const fetchVerificaPunzonado = createAsyncThunk<
  BaseHormigonVerificacionPunzonado,
  number
>("baseHormigonResults/fetchVerificaPunzonado", async (id) => {
  const response = await api.get<BaseHormigonVerificacionPunzonado>(
    `baseshormigon/${id}/verificaPunzonado`
  );
  return response.data;
});

// Acción para verificar resistencia al corte
export const fetchVerificaCorte = createAsyncThunk<
  BaseHormigonVerificacionCorte,
  number
>("baseHormigonResults/fetchVerificaCorte", async (id) => {
  const response = await api.get<BaseHormigonVerificacionCorte>(
    `baseshormigon/${id}/verificaCorte`
  );
  return response.data;
});

// Acción especial donde se pueden enviar diámetros personalizados para recalcular armadura
export const fetchCalculoArmaduraConDiametros = createAsyncThunk<
  BaseHormigonArmadura,
  { id: number; diametroX: number; diametroY: number }
>(
  "baseHormigon/fetchCalculoArmaduraConDiametros",
  async ({ id, diametroX, diametroY }) => {
    const response = await api.post<BaseHormigonArmadura>(
      `baseshormigon/calculoArmadura/${id}`,
      {
        // Enviamos los diámetros elegidos por el usuario
        DiametroX: diametroX,
        DiametroY: diametroY,
      }
    );
    return response.data;
  }
);

// Slice que reúne el estado, los reducers y cómo manejar cada acción
const baseHormigonResultsSlice = createSlice({
  name: "baseHormigonResults",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // A partir de acá, cada bloque maneja el ciclo de vida de cada llamada a la API:
      // pending → comenzó la carga
      // fulfilled → terminó con éxito
      // rejected → salió mal

      // BASE
      .addCase(fetchBaseHormigon.pending, (state) => {
        state.loading.base = true; // Indicamos que se está cargando
      })
      .addCase(fetchBaseHormigon.fulfilled, (state, action) => {
        state.loading.base = false; // Terminó la carga
        state.base = action.payload; // Guardamos el resultado
      })
      .addCase(fetchBaseHormigon.rejected, (state, action) => {
        state.loading.base = false;
        state.error = action.error.message ?? null; // Guardamos el error
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

      // ARMADURA CON DIÁMETROS PERSONALIZADOS
      .addCase(fetchCalculoArmaduraConDiametros.fulfilled, (state, action) => {
        state.calculoArmadura = action.payload; // Reemplaza el cálculo anterior
      });
  },
});

// Exportamos todos los thunks juntos por comodidad
export const baseHormigonThunks = {
  fetchBaseHormigon,
  fetchDimensionesBase,
  fetchEsfuerzosBase,
  fetchVerificacionesBase,
  fetchCalculoCuantia,
  fetchVerificaPunzonado,
  fetchVerificaCorte,
  fetchCalculoArmadura,
  fetchComputo,
  fetchCalculoArmaduraConDiametros,
};

// Exportamos el reducer final para el store de Redux
export default baseHormigonResultsSlice.reducer;

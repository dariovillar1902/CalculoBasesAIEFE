import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";

interface BaseHormigonFormState {
  data: BaseHormigon[];
  loading: boolean;
  error: string | null;
}

const initialState: BaseHormigonFormState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBasesHormigon = createAsyncThunk<BaseHormigon[]>(
  "baseHormigon/fetch",
  async () => {
    const response = await api.get<BaseHormigon[]>("baseshormigon");
    return response.data;
  }
);

const baseHormigonSlice = createSlice({
  name: "baseHormigon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasesHormigon.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBasesHormigon.fulfilled,
        (state, action: PayloadAction<BaseHormigon[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchBasesHormigon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default baseHormigonSlice.reducer;

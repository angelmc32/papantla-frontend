import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateInterface {
  email: string | null;
  publicKey: string | null;
  type: string | null;
  userId: string | null;
}

const initialState: AuthStateInterface = {
  email: null,
  publicKey: null,
  type: null,
  userId: null,
};

export const polybaseAuthSlice = createSlice({
  name: "polybaseAuthSlice",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.email = null;
      state.publicKey = null;
      state.type = null;
      state.userId = null;
    },
    setUser: (state, action: PayloadAction<AuthStateInterface>) => {
      state.email = action.payload.email || null;
      state.publicKey = action.payload.publicKey || null;
      state.type = action.payload.type;
      state.userId = action.payload.userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearUser, setUser } = polybaseAuthSlice.actions;

export default polybaseAuthSlice.reducer;

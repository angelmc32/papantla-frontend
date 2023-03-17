import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LensState {
  profile: any | null;
}

const initialState: LensState = {
  profile: null,
};

export const lensStateSlice = createSlice({
  name: "lensSlice",
  initialState,
  reducers: {
    setDefaultProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDefaultProfile } = lensStateSlice.actions;

export default lensStateSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  user: any
}

const initialState: AuthState = {
  token: "",
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        token: action.payload?.token,
        user: action.payload?.user,
      };
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
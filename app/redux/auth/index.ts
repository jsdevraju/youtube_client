import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../utils";

export interface AuthState {
  token: string;
  user: IUser | undefined
}

const initialState: AuthState = {
  token: "",
  user: undefined
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
    subscription: (state, action) => {
      if(!state.user) return
      else if (state.user.subscribedUsers.includes(action.payload)) {
        state.user.subscribedUsers.splice(
          state.user.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.user.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { setAuth, subscription } = authSlice.actions;
export default authSlice.reducer;
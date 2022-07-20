import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleVideoProps } from "../../../utils";

export interface AuthState {
  video: SingleVideoProps | undefined;
}

const initialState: AuthState = {
  video: undefined,
};

export const videoSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        video: action.payload.video,
      };
    },
    like: (state, action) => {
      if (!state.video) return;
      if (!state.video.likes.includes(action.payload)) {
        state.video.likes.push(action.payload);
        state.video.dislikes.splice(
          state.video.dislikes.findIndex((userId) => userId === action.payload),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.video) return;
      if (!state.video.dislikes.includes(action.payload)) {
        state.video.dislikes.push(action.payload);
        state.video.likes.splice(
          state.video.likes.findIndex((userId) => userId === action.payload),
          1
        );
      }
    },
  },
});

export const { setVideo, like, dislike } = videoSlice.actions;
export default videoSlice.reducer;

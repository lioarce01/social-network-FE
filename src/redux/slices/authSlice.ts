import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isRegistered: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isRegistered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isRegistered = true;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isRegistered = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

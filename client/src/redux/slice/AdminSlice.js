// slice/AdminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminUser: (state, action) => {
      state.user = action.payload;
    },
    setAdminErr: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearAdminState: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const { setAdminUser, setAdminErr, setLoading, clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;

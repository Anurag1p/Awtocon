import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching company data
export const getAdminCompData = createAsyncThunk(
  "admin/companies",
  async (compData, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios.put("/api/get_company", compData);
      dispatch(setadminCompany(response.data.result))
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice for managing single company data
const AdminCompanyData = createSlice({
  name: "adminCompany",
  initialState: {
    singleComp: null,
    error: null,
    loading: "Please wait while proceeding..."
  },
  reducers: {
    setadminCompany: (state, action) => {
      state.singleComp = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCompData.pending, (state) => {
        state.loading = "Loading...";
      })
      .addCase(getAdminCompData.fulfilled, (state, action) => {
        state.loading = "Success";
        state.singleComp = action.payload;
        state.error = null; // Clear any previous errors
      })
      .addCase(getAdminCompData.rejected, (state, action) => {
        state.loading = "Failed";
        state.error = action.payload;
      });
  }
});

export default AdminCompanyData.reducer;
export const { setadminCompany } = AdminCompanyData.actions;

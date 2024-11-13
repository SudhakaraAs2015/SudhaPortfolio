import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData:false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetportfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData : (state, action) => {
      state.reloadData = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetportfolioData, ReloadData } =
  rootSlice.actions;

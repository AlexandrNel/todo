import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SortType = "all" | "complete" | "incomplete";

interface State {
  search: string;
  sortBy: SortType;
}

const initialState: State = {
  search: "",
  sortBy: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearch, setSortBy } = filterSlice.actions;
export const selectSortBy = (state: RootState) => state.filter.sortBy;
export const selectSearch = (state: RootState) => state.filter.search;
export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortColumn, SortDirection, TokenCategory } from "@/lib/types";

export type UISliceState = {
  activeCategory: TokenCategory;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  modalTokenId: string | null;
};

const initialState: UISliceState = {
  activeCategory: "new",
  sortColumn: "volume24h",
  sortDirection: "desc",
  modalTokenId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<TokenCategory>) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: PayloadAction<SortColumn>) {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = "desc";
      }
    },
    setModalToken(state, action: PayloadAction<string | null>) {
      state.modalTokenId = action.payload;
    },
  },
});

export const { setCategory, setSort, setModalToken } = uiSlice.actions;
export default uiSlice.reducer;

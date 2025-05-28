import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;
export default categoriesSlice.reducer;

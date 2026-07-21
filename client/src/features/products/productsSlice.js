import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api.js";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/products", { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load products");
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchOne",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${slug}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Product not found");
    }
  }
);

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const { data } = await api.get("/products/categories");
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    page: 1,
    pages: 1,
    total: 0,
    categories: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.current = null;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;
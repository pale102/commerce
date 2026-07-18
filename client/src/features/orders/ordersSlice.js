import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api.js";

export const placeOrder = createAsyncThunk(
  "orders/place",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders", orderData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Order failed");
    }
  }
);

export const fetchMyOrders = createAsyncThunk("orders/mine", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/orders/mine");
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to load orders");
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    myOrders: [],
    lastOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      });
  },
});

export default ordersSlice.reducer;
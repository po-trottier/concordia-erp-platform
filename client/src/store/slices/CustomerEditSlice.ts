import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerEntry } from "../../interfaces/CustomerEntry";

const initialState : { selectedCustomer : CustomerEntry | undefined } =
  {
    selectedCustomer: undefined
  };

export const customerEditSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setCustomer: (state, { payload } : PayloadAction<CustomerEntry>) => {
      state.selectedCustomer = {
        name: payload.name,
        email: payload.email,
        _id: payload._id
      };
    },
    setName: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedCustomer) {
        state.selectedCustomer.name = payload.trim().toLowerCase();
      }
    },
    setEmail: (state, { payload } : PayloadAction<string>) => {
      if (state.selectedCustomer) {
        state.selectedCustomer.email = payload.trim().toLowerCase();
      }
    },
  }
});

export const {
  setCustomer: initializeSelectedCustomer,
  setName,
  setEmail,
} = customerEditSlice.actions;
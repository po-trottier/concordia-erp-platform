import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerEntry } from '../../interfaces/CustomerEntry';

const initialState : { list : CustomerEntry[], updated : boolean } =
  {
    list: [],
    updated: false,
  };

export const customerListSlice = createSlice({
  name: 'customerList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<CustomerEntry[]>) => {
      state.list = payload;
      state.updated = false;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newCustomer : CustomerEntry }>) => {
      const i = state.list.findIndex(f => f._id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newCustomer;
      }
      state.updated = true;
    },
    addEntry: (state, { payload } : PayloadAction<CustomerEntry>) => {
      state.list.push(payload);
      state.updated = true;
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f._id === payload);
      if (i >= 0) {
        state.list.splice(i, 1);
      }
      state.updated = true;
    },
  }
});

export const {
  setList: setCustomerList,
  updateEntry: updateCustomerEntry,
  addEntry: addCustomerEntry,
  removeEntry: removeCustomerEntry,
} = customerListSlice.actions;

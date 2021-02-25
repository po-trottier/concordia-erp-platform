import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductEntry } from '../../interfaces/ProductEntry';

const initialState : { list : ProductEntry[], updated : boolean } =
  {
    list: [],
    updated: false,
  };

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<ProductEntry[]>) => {
      state.list = payload;
      state.updated = false;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newProduct : ProductEntry }>) => {
      const i = state.list.findIndex(f => f.id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newProduct;
      }
      state.updated = true;
    },
    addEntry: (state, { payload } : PayloadAction<ProductEntry>) => {
      state.list.push(payload);
      state.updated = true;
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f.id === payload);
      if (i >= 0) {
        state.list.splice(i, 1);
      }
      state.updated = true;
    },
  }
});

export const {
  setList: setProductList,
  updateEntry: updateProductEntry,
  addEntry: addProductEntry,
  removeEntry: removeProductEntry,
} = productListSlice.actions;
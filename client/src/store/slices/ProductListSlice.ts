import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductEntry } from '../../interfaces/ProductEntry';

const initialState : { list : ProductEntry[] } =
  {
    list: []
  };

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<ProductEntry[]>) => {
      state.list = payload;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id: string, newProduct: ProductEntry }>) => {
      const i = state.list.findIndex(f => f.id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newProduct;
      }
    },
    addEntry: (state, { payload } : PayloadAction<ProductEntry>) => {
      state.list.push(payload);
    },
    removeEntry: (state, { payload } : PayloadAction<string>) => {
      const i = state.list.findIndex(f => f.id === payload);
      if (i >= 0) {
        state.list.splice(i, 1)
      }
    },
  }
});

export const {
  setList: setProductList,
  updateEntry: updateProductEntry,
  addEntry: addProductEntry,
  removeEntry: removeProductEntry,
} = productListSlice.actions;
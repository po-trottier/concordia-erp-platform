import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialEntry } from '../../interfaces/MaterialEntry';

const initialState : { list : MaterialEntry[], updated : boolean } =
  {
    list: [],
    updated: false,
  };

export const materialListSlice = createSlice({
  name: 'materialList',
  initialState,
  reducers: {
    setList: (state, { payload } : PayloadAction<MaterialEntry[]>) => {
      state.list = payload;
      state.updated = false;
    },
    updateEntry: (state, { payload } : PayloadAction<{ id : string, newMaterial : MaterialEntry }>) => {
      const i = state.list.findIndex(f => f._id === payload.id);
      if (i >= 0) {
        state.list[i] = payload.newMaterial;
      }
      state.updated = true;
    },
    addEntry: (state, { payload } : PayloadAction<MaterialEntry>) => {
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
  setList: setMaterialList,
  updateEntry: updateMaterialEntry,
  addEntry: addMaterialEntry,
  removeEntry: removeMaterialEntry,
} = materialListSlice.actions;
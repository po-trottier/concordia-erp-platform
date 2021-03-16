import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialQuantity } from '../../interfaces/MaterialQuantity';

const initialState : { quantities : MaterialQuantity[] } =
  {
    quantities: []
  };

export const materialQuantitiesSlice = createSlice({
  name: 'materialQuantities',
  initialState,
  reducers: {
    setQuantities: (state, { payload } : PayloadAction<MaterialQuantity[]>) => {
      state.quantities = payload;
    },
    addQuantity: (state, { payload } : PayloadAction<MaterialQuantity>) => {
      state.quantities.push({
        materialId: payload.materialId,
        quantity: payload.quantity
      });
		},
    updateQuantities: (state, { payload } : PayloadAction<{ materialId : string, quantity : number }>) => {
      const i = state.quantities.findIndex(quantity => quantity.materialId === payload.materialId);
      state.quantities[i] = {
        materialId: payload.materialId,
        quantity: payload.quantity
      };
		},
    removeQuantity: (state, { payload } : PayloadAction<string>) => {
      const i = state.quantities.findIndex(quantity => quantity.materialId === payload);
      if (i >= 0) {
        state.quantities.splice(i, 1);
      }
    }
  }
});

export const {
  setQuantities: setMaterialQuantities,
  addQuantity: addMaterialQuantity,
  updateQuantities: updateMaterialQuantities,
  removeQuantity: removeMaterialQuantity,
} = materialQuantitiesSlice.actions;
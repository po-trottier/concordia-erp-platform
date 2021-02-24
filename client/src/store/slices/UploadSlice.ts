import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd/lib/upload/interface';

const initialState : { selectedFile : UploadFile|undefined } =
  {
    selectedFile: undefined
  };

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    selected: (state, { payload } : PayloadAction<UploadFile|undefined>) => {
      state.selectedFile = payload;
    }
  }
});

export const {
  selected: setSelected,
} = uploadSlice.actions;
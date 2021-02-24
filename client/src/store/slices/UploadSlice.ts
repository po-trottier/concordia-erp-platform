import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadRequest } from '../../interfaces/UploadRequest';

const initialState : { selectedFile : UploadFile|undefined } =
  {
    selectedFile: undefined
  };

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    selected: (state, { payload } : PayloadAction<UploadRequest>) => {
      state.selectedFile = payload.selectedFile;
    }
  }
});

export const {
  selected: setSelected,
} = uploadSlice.actions;
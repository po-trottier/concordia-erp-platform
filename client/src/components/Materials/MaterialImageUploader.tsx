import React from 'react';
import { Button, message, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { UploadChangeParam } from 'antd/lib/upload/interface';

import { RootState } from '../../store/Store';
import { setSelected } from '../../store/slices/UploadSlice';

export const MaterialImageUploader = () => {
  const dispatch = useDispatch();

  const selectedFile = useSelector((state : RootState) => state.upload.selectedFile);

  const extension = selectedFile && selectedFile.name.length > 20 ? '...' : '';

  const props = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info : UploadChangeParam) {
      if (!info.file.type.includes('image/')) {
        message.error('The selected file is not a valid image.');
        return;
      }
      if (info.file.size / 1024 / 1024 > 2) {
        message.error('The file is must be under 2MB.');
        return;
      }
      if (info.file) {
        // Clear the file upload error
        const fileError = document.getElementById('display-file-error');
        if (fileError) {
          fileError.style.display = 'none';
        }
      }
      dispatch(setSelected({ selectedFile: info.file }));
    }
  };

  return (
    <Row align='middle'>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>
          Upload an Image
        </Button>
      </Upload>
      <p style={{ margin: 0, marginLeft: 16, fontWeight: selectedFile ? 'bold' : 'normal' }}>
        {selectedFile ? selectedFile.name.substr(0, 20) + extension : 'Select a file...'}
      </p>
    </Row>
  );
};
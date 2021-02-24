import React, { useState } from 'react';
import { Button, message, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

export const MaterialImageUploader = () => {
  const file : UploadFile = {
    uid: 'gold',
    size: 1,
    name: 'gold.png',
    lastModified: 1,
    lastModifiedDate: new Date('5/10/2018'),
    url: '../../assets/gold.png',
    type: 'image/png'
  };
  const [selectedFile, updateSelectedFile] = useState(file);

  const extension = selectedFile.name.length > 20 ? '...' : '';

  const props = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: (file : UploadFile) => {
      if (!file.type.includes('image/')) {
        message.error(`${file.name} is not a valid file.`);
        return false;
      }
      // TODO UPLOAD THE FILE WHEN THE "OK" BUTTON IS CLICKED
      return false;
    },
    onChange(info : UploadChangeParam) {
      updateSelectedFile(info.file);
    }
  };

  return (
    <Row align='middle'>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>
          Upload an Image
        </Button>
      </Upload>
      <p style={{ margin: 0, marginLeft: 16, fontWeight: 'bold' }}>
        {selectedFile.name.substr(0, 20) + extension}
      </p>
    </Row>
  );
};
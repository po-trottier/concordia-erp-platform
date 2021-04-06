import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setSelected } from '../../store/slices/UploadSlice';
import { Button, Modal, Form, Col, message, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography, Row, Upload  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';

export const UploadAuditButton = (props : any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const selectedFile = useSelector((state : RootState) => state.upload.selectedFile);
  const extension = selectedFile && selectedFile.name.length > 20 ? '...' : '';

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info : UploadChangeParam) {
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
      dispatch(setSelected(info.file));
    }
  };

  const handleSubmit = (values : any) => {
    if (!selectedFile) {
      return;
    }
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
    };

    reader.onerror = () => {
      setLoading(false);
      message.error('Something went wrong while reading the uploaded the file');
    };
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(setSelected());
  };

  return(
    <div>
      <Button
      type="primary"
      style={{ marginTop: 16 }}
      loading={false}
      onClick={() => {setIsModalVisible(true)}}
      >
        Upload Audit
      </Button>
      <Modal
        title='Upload an Audit'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Row align='middle' style={{ marginBottom: 16 }}>
            {/*Image Selector*/}
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>
                Upload an Audit
              </Button>
              </Upload>
              <p style={{ marginTop: 16, fontWeight: selectedFile ? 'bold' : 'normal' }}>
                {selectedFile ? selectedFile.name.substr(0, 20) + extension : 'Select a file...'}
              </p>
            </Col>
          </Row>
          {/*Custom error message*/}
          <span id='display-file-error' style={{ color: 'red', display: 'none' }}>
            Please select an audit to upload.
          </span>
        </Form>
      </Modal>
    </div>
  );
}
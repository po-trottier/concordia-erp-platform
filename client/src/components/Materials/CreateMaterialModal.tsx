import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, message, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialImageUploader } from './MaterialImageUploader';
import { RootState } from '../../store/Store';
import { setSelected } from '../../store/slices/UploadSlice';
import { addMaterialEntry } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

export const CreateMaterialModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const selectedFile = useSelector((state : RootState) => state.upload.selectedFile);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayFileError = () => {
    setLoading(false);
    const fileError = document.getElementById('display-file-error');
    if (fileError) {
      fileError.style.display = 'block';
    }
  };

  const handleSubmit = (values : any) => {
    if (!selectedFile) {
      displayFileError();
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
      const newMaterial = {
        density: values.density,
        name: values.name,
        price: values.price,
        vendorName: values.vendor,
        image: reader.result
      };

      if (!newMaterial.density) {
        newMaterial.density = 1;
      }
      if (!newMaterial.price) {
        newMaterial.price = 1;
      }

      axios.post('/materials', newMaterial)
        .then(({ data }) => {
          const newMaterial = data;
          newMaterial.id = newMaterial['_id'];
          dispatch(addMaterialEntry(newMaterial));
          setIsModalVisible(false);
          message.success('The material was successfully added.');
          dispatch(setSelected(undefined));
          form.resetFields();
        })
        .catch((err) => {
          message.error('Something went wrong while adding the material.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    };

    reader.onerror = () => {
      setLoading(false);
      message.error('Something went wrong while reading the uploaded image');
    };
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const initialValues = {
    'density': 1,
    'price': 1
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginTop: 16 }}>
        Add a New Material
      </Button>

      <Modal
        title='Add a New Material'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
          {/*Material Name Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Material Name:</span>
            </Col>
            <Col sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='name'
                rules={[{ required: true, message: 'Please enter a material name.' }]}>
                <Input placeholder='Material Name' />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Vendor Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Vendor:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='vendor'
                rules={[{ required: true, message: 'Please enter a material vendor.' }]}>
                <Input placeholder='Material Vendor' />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Density Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Density:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='density'
                rules={[{ required: true, message: 'Please enter a material density.' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  step={0.5} />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Price Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Price:</span>
            </Col>
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='price'
                rules={[{ required: true, message: 'Please enter a material price.' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  step={0.5} />
              </Form.Item>
            </Col>
          </Row>
          {/*Material Picture Field*/}
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col sm={6} span={9}>
              <span>Thumbnail:</span>
            </Col>
            {/*Image Selector*/}
            <Col className='margin-bottom-mobile' sm={18} span={15}>
              <MaterialImageUploader />
            </Col>
          </Row>
          {/*Custom error message*/}
          <span id='display-file-error' style={{ color: 'red', display: 'none' }}>
            Please select at least one image.
          </span>
        </Form>
      </Modal>
    </div>
  );
};
